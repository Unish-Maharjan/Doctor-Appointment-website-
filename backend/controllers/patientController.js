const User = require("../models/userModel");
const Appointment = require("../models/appointmentModel");
const Prescription = require("../models/prescriptionModel");
const LabOrder = require("../models/labOrderModel");
const Invoice = require("../models/invoiceModel");
const Payment = require("../models/paymentModel");

async function getAllPatients(req, res) {
  try {
    const filter = { role: "patient" };
    if (req.query.search) {
      filter.$or = [
        { name: new RegExp(req.query.search, "i") },
        { email: new RegExp(req.query.search, "i") },
        { phone: new RegExp(req.query.search, "i") },
      ];
    }
    if (req.query.bloodGroup) {
      filter.bloodGroup = req.query.bloodGroup;
    }

    const patients = await User.find(filter)
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json(patients);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch patients", error: error.message });
  }
}

async function getMyPatientProfile(req, res) {
  try {
    const patient = await User.findById(req.user._id).select("-password");
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch profile", error: error.message });
  }
}

async function updateMyPatientProfile(req, res) {
  try {
    const allowedFields = [
      "name",
      "phone",
      "gender",
      "dateOfBirth",
      "age",
      "bloodGroup",
      "address",
      "emergencyContact",
      "allergies",
    ];

    const updates = {};
    for (const field of allowedFields) {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    }

    const updated = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile", error: error.message });
  }
}

async function getPatientById(req, res) {
  try {
    const isOwner = req.user._id.toString() === req.params.id;
    const isStaffOrAdmin = req.user.role !== "patient";

    if (!isOwner && !isStaffOrAdmin) {
      return res.status(403).json({ message: "Not authorized to view this patient profile" });
    }

    const patient = await User.findById(req.params.id).select("-password");
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch patient", error: error.message });
  }
}

async function updatePatientById(req, res) {
  try {
    const {
      name,
      phone,
      gender,
      dateOfBirth,
      age,
      bloodGroup,
      address,
      emergencyContact,
      medicalHistory,
      allergies,
    } = req.body;

    const patient = await User.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    if (name !== undefined) patient.name = name;
    if (phone !== undefined) patient.phone = phone;
    if (gender !== undefined) patient.gender = gender;
    if (dateOfBirth !== undefined) patient.dateOfBirth = dateOfBirth;
    if (age !== undefined) patient.age = age;
    if (bloodGroup !== undefined) patient.bloodGroup = bloodGroup;
    if (address !== undefined) patient.address = address;
    if (emergencyContact !== undefined) patient.emergencyContact = emergencyContact;
    if (medicalHistory !== undefined) patient.medicalHistory = medicalHistory;
    if (allergies !== undefined) patient.allergies = allergies;

    const updated = await patient.save();
    const result = updated.toObject();
    delete result.password;

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Failed to update patient", error: error.message });
  }
}

// Complete Electronic Health Record (EHR) summary
async function getPatientFullRecord(req, res) {
  try {
    const patientId = req.params.id;
    const isOwner = req.user._id.toString() === patientId;
    const isStaffOrAdmin = req.user.role !== "patient";

    if (!isOwner && !isStaffOrAdmin) {
      return res.status(403).json({ message: "Not authorized to access full medical record" });
    }

    const patient = await User.findById(patientId).select("-password");
    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    const [appointments, prescriptions, labOrders, invoices, payments] = await Promise.all([
      Appointment.find({ patient: patientId })
        .populate("doctor", "name specialization")
        .sort({ createdAt: -1 }),
      Prescription.find({ patient: patientId })
        .populate("doctor", "name specialization")
        .populate("medicines.medicine", "name price")
        .sort({ createdAt: -1 }),
      LabOrder.find({ patient: patientId })
        .populate("doctor", "name specialization")
        .populate("labTest")
        .sort({ createdAt: -1 }),
      Invoice.find({ patient: patientId }).sort({ createdAt: -1 }),
      Payment.find({ patient: patientId }).sort({ createdAt: -1 }),
    ]);

    res.status(200).json({
      patient,
      summary: {
        totalAppointments: appointments.length,
        totalPrescriptions: prescriptions.length,
        totalLabOrders: labOrders.length,
        totalInvoices: invoices.length,
        totalPayments: payments.length,
      },
      appointments,
      prescriptions,
      labOrders,
      invoices,
      payments,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch patient full record", error: error.message });
  }
}

module.exports = {
  getAllPatients,
  getMyPatientProfile,
  updateMyPatientProfile,
  getPatientById,
  updatePatientById,
  getPatientFullRecord,
};
