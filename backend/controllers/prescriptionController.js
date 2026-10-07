const Prescription = require("../models/prescriptionModel");
const Medicine = require("../models/medicineModel");
const Doctor = require("../models/doctorModel");
const { generatePrescriptionNumber } = require("../utils/sequenceGenerator");

async function createPrescription(req, res) {
  try {
    const { patient, doctor, appointment, diagnosis, medicines, notes } = req.body;

    if (!patient || !doctor || !medicines || !Array.isArray(medicines) || medicines.length === 0) {
      return res.status(400).json({
        message: "Patient, doctor, and a list of medicines are required",
      });
    }

    // Verify and format each medicine
    const validatedMedicines = [];
    for (const item of medicines) {
      if (!item.medicine || !item.quantity || Number(item.quantity) <= 0) {
        return res.status(400).json({
          message: "Each medicine item must specify medicine ID and positive quantity",
        });
      }

      const medDoc = await Medicine.findById(item.medicine);
      if (!medDoc) {
        return res.status(404).json({ message: `Medicine not found for ID: ${item.medicine}` });
      }

      validatedMedicines.push({
        medicine: medDoc._id,
        medicineName: medDoc.name,
        dosage: item.dosage || "1 tablet",
        frequency: item.frequency || "Once daily",
        duration: item.duration || "5 days",
        quantity: Number(item.quantity),
      });
    }

    const prescriptionNumber = await generatePrescriptionNumber();

    const prescription = new Prescription({
      prescriptionNumber,
      patient,
      doctor,
      appointment: appointment || undefined,
      diagnosis: diagnosis || "",
      medicines: validatedMedicines,
      notes: notes || "",
      status: "Prescribed",
    });

    const saved = await prescription.save();
    const populated = await Prescription.findById(saved._id)
      .populate("patient", "name email phone")
      .populate("doctor", "name specialization")
      .populate("medicines.medicine");

    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: "Failed to create prescription", error: error.message });
  }
}

async function getAllPrescriptions(req, res) {
  try {
    const filter = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }
    if (req.query.patient) {
      filter.patient = req.query.patient;
    }
    if (req.query.doctor) {
      filter.doctor = req.query.doctor;
    }

    const prescriptions = await Prescription.find(filter)
      .populate("patient", "name email phone")
      .populate("doctor", "name specialization")
      .populate("medicines.medicine")
      .sort({ createdAt: -1 });

    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch prescriptions", error: error.message });
  }
}

async function getMyPrescriptions(req, res) {
  try {
    const prescriptions = await Prescription.find({ patient: req.user._id })
      .populate("doctor", "name specialization")
      .populate("medicines.medicine")
      .sort({ createdAt: -1 });

    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch your prescriptions", error: error.message });
  }
}

async function getPrescriptionsByPatient(req, res) {
  try {
    const prescriptions = await Prescription.find({ patient: req.params.patientId })
      .populate("doctor", "name specialization")
      .populate("medicines.medicine")
      .sort({ createdAt: -1 });

    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch patient prescriptions", error: error.message });
  }
}

async function getPrescriptionById(req, res) {
  try {
    const prescription = await Prescription.findById(req.params.id)
      .populate("patient", "name email phone")
      .populate("doctor", "name specialization")
      .populate("medicines.medicine");

    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    // Role check: patients can only access their own prescription
    if (
      req.user.role === "patient" &&
      prescription.patient._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not authorized to access this prescription" });
    }

    res.status(200).json(prescription);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch prescription", error: error.message });
  }
}

// Dispense prescription and reduce stock
async function dispensePrescription(req, res) {
  try {
    const prescription = await Prescription.findById(req.params.id);

    if (!prescription) {
      return res.status(404).json({ message: "Prescription not found" });
    }

    if (prescription.status === "Dispensed") {
      return res.status(400).json({ message: "Prescription has already been dispensed" });
    }

    if (prescription.status === "Cancelled") {
      return res.status(400).json({ message: "Cancelled prescription cannot be dispensed" });
    }

    // Step 1: Pre-check stock for all medicines
    for (const item of prescription.medicines) {
      const med = await Medicine.findById(item.medicine);
      if (!med) {
        return res.status(404).json({
          message: `Medicine not found: ${item.medicineName} (${item.medicine})`,
        });
      }
      if (med.quantity < item.quantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${med.name}. Available: ${med.quantity}, Requested: ${item.quantity}`,
        });
      }
    }

    // Step 2: Reduce stock for each medicine
    for (const item of prescription.medicines) {
      await Medicine.findByIdAndUpdate(item.medicine, {
        $inc: { quantity: -item.quantity },
      });
    }

    // Step 3: Mark prescription as Dispensed
    prescription.status = "Dispensed";
    prescription.dispensedAt = new Date();
    prescription.dispensedBy = req.user._id;

    const updated = await prescription.save();
    const populated = await Prescription.findById(updated._id)
      .populate("patient", "name email phone")
      .populate("doctor", "name specialization")
      .populate("medicines.medicine");

    res.status(200).json({
      message: "Prescription successfully dispensed and medicine stock reduced",
      prescription: populated,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to dispense prescription", error: error.message });
  }
}

module.exports = {
  createPrescription,
  getAllPrescriptions,
  getMyPrescriptions,
  getPrescriptionsByPatient,
  getPrescriptionById,
  dispensePrescription,
};
