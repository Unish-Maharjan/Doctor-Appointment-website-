const Appointment = require("../models/appointmentModel");
const Doctor = require("../models/doctorModel");
const Invoice = require("../models/invoiceModel");
const { generateInvoiceNumber } = require("../utils/sequenceGenerator");
const { recordAuditLog } = require("../utils/auditLogger");

async function createAppointment(req, res) {
  try {
    const { doctor, date, time, reason } = req.body;

    if (!doctor || !date || !time) {
      return res.status(400).json({ message: "Doctor, date and time are required" });
    }

    const newAppointment = new Appointment({
      patient: req.user._id,
      doctor,
      date,
      time,
      reason,
    });

    const savedAppointment = await newAppointment.save();

    // Automatically generate invoice for the appointment
    let generatedInvoice = null;
    try {
      const doctorDoc = await Doctor.findById(doctor);
      const fee = doctorDoc && doctorDoc.consultationFee !== undefined ? doctorDoc.consultationFee : 1000;
      const docName = doctorDoc ? doctorDoc.name : "Specialist";
      const docSpec = doctorDoc ? doctorDoc.specialization : "General Medicine";

      const invoiceNumber = await generateInvoiceNumber();
      const invoice = new Invoice({
        invoiceNumber,
        patient: req.user._id,
        appointment: savedAppointment._id,
        doctor: doctorDoc ? doctorDoc._id : undefined,
        items: [
          {
            serviceName: "Doctor Consultation",
            serviceType: "consultation",
            description: `Consultation with Dr. ${docName} (${docSpec}) on ${date} at ${time}`,
            quantity: 1,
            unitPrice: fee,
            total: fee,
          },
        ],
        subtotal: fee,
        discount: 0,
        tax: 0,
        totalAmount: fee,
        amountPaid: 0,
        balanceDue: fee,
        status: "ISSUED",
        paymentStatus: "UNPAID",
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        notes: `Auto-generated invoice for appointment on ${date} at ${time}`,
        createdBy: req.user._id,
      });

      generatedInvoice = await invoice.save();

      await recordAuditLog({
        req,
        action: "INVOICE_CREATED",
        resource: "Invoice",
        resourceId: generatedInvoice._id,
        details: {
          invoiceNumber: generatedInvoice.invoiceNumber,
          appointment: savedAppointment._id,
          totalAmount: fee,
        },
      });
    } catch (invoiceErr) {
      console.error("Auto-invoice generation error:", invoiceErr.message);
    }

    res.status(201).json({
      ...savedAppointment.toObject(),
      invoice: generatedInvoice,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to create appointment", error: error.message });
  }
}

async function getMyAppointments(req, res) {
  try {
    const appointments = await Appointment.find({ patient: req.user._id }).populate(
      "doctor",
      "name specialization photo"
    );
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch appointments", error: error.message });
  }
}

async function getAllAppointments(req, res) {
  try {
    const appointments = await Appointment.find()
      .populate("patient", "name email phone")
      .populate("doctor", "name specialization");
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch appointments", error: error.message });
  }
}

async function updateAppointmentStatus(req, res) {
  try {
    const { status } = req.body;

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedAppointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    res.status(200).json(updatedAppointment);
  } catch (error) {
    res.status(500).json({ message: "Failed to update appointment", error: error.message });
  }
}

async function cancelAppointment(req, res) {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const isOwner = appointment.patient.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Not authorized to cancel this appointment" });
    }

    appointment.status = "cancelled";
    await appointment.save();

    res.status(200).json({ message: "Appointment cancelled successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to cancel appointment", error: error.message });
  }
}

module.exports = {
  createAppointment,
  getMyAppointments,
  getAllAppointments,
  updateAppointmentStatus,
  cancelAppointment,
};
