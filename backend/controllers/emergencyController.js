const EmergencyCase = require("../models/emergencyModel");
const Admission = require("../models/admissionModel");
const Bed = require("../models/bedModel");
const User = require("../models/userModel");
const { generateEmergencyCaseNumber, generateAdmissionNumber } = require("../utils/sequenceGenerator");

async function registerEmergencyCase(req, res) {
  try {
    const {
      patient,
      patientName,
      age,
      gender,
      contactNumber,
      priority,
      assignedDoctor,
      triageNotes,
      vitals,
    } = req.body;

    if (!patientName) {
      return res.status(400).json({ message: "Patient name is required" });
    }

    const caseNumber = await generateEmergencyCaseNumber();

    const emergencyCase = new EmergencyCase({
      caseNumber,
      patient: patient || undefined,
      patientName: patientName.trim(),
      age: age !== undefined ? Number(age) : undefined,
      gender: gender || "",
      contactNumber: contactNumber || "",
      priority: priority || "High",
      assignedDoctor: assignedDoctor || undefined,
      triageNotes: triageNotes || "",
      vitals: vitals || {},
      treatmentStatus: "Triaged",
      registeredAt: new Date(),
    });

    const saved = await emergencyCase.save();
    const populated = await EmergencyCase.findById(saved._id)
      .populate("patient", "name email phone")
      .populate("assignedDoctor", "name specialization");

    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: "Failed to register emergency case", error: error.message });
  }
}

async function getAllEmergencyCases(req, res) {
  try {
    const filter = {};
    if (req.query.priority) {
      filter.priority = req.query.priority;
    }
    if (req.query.treatmentStatus) {
      filter.treatmentStatus = req.query.treatmentStatus;
    }

    const cases = await EmergencyCase.find(filter)
      .populate("patient", "name email phone")
      .populate("assignedDoctor", "name specialization")
      .populate({
        path: "admission",
        populate: [{ path: "ward", select: "name" }, { path: "bed", select: "bedNumber" }],
      })
      .sort({ registeredAt: -1 });

    res.status(200).json(cases);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch emergency cases", error: error.message });
  }
}

async function getEmergencyCaseById(req, res) {
  try {
    const emgCase = await EmergencyCase.findById(req.params.id)
      .populate("patient", "name email phone")
      .populate("assignedDoctor", "name specialization")
      .populate({
        path: "admission",
        populate: [{ path: "ward" }, { path: "bed" }],
      });

    if (!emgCase) {
      return res.status(404).json({ message: "Emergency case not found" });
    }

    res.status(200).json(emgCase);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch emergency case", error: error.message });
  }
}

async function updateEmergencyCase(req, res) {
  try {
    const { priority, assignedDoctor, triageNotes, vitals, treatmentStatus } = req.body;

    const emgCase = await EmergencyCase.findById(req.params.id);
    if (!emgCase) {
      return res.status(404).json({ message: "Emergency case not found" });
    }

    if (priority) emgCase.priority = priority;
    if (assignedDoctor !== undefined) emgCase.assignedDoctor = assignedDoctor || undefined;
    if (triageNotes !== undefined) emgCase.triageNotes = triageNotes;
    if (vitals) emgCase.vitals = { ...emgCase.vitals, ...vitals };
    if (treatmentStatus) emgCase.treatmentStatus = treatmentStatus;

    const saved = await emgCase.save();
    const populated = await EmergencyCase.findById(saved._id)
      .populate("patient", "name email phone")
      .populate("assignedDoctor", "name specialization");

    res.status(200).json(populated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update emergency case", error: error.message });
  }
}

async function admitEmergencyPatient(req, res) {
  try {
    const { wardId, bedId, doctorId, reason, notes } = req.body;

    const emgCase = await EmergencyCase.findById(req.params.id);
    if (!emgCase) {
      return res.status(404).json({ message: "Emergency case not found" });
    }

    if (emgCase.treatmentStatus === "Admitted") {
      return res.status(400).json({ message: "Patient is already admitted from emergency" });
    }

    if (!wardId || !bedId) {
      return res.status(400).json({ message: "wardId and bedId are required for admission" });
    }

    const bed = await Bed.findById(bedId);
    if (!bed || bed.status !== "Available") {
      return res.status(400).json({ message: "Selected bed is not available" });
    }

    // If emergency patient doesn't have a User document, create a guest patient account or find one
    let patientId = emgCase.patient;
    if (!patientId) {
      const email = `emergency_${Date.now()}@hospital.internal`;
      const tempUser = new User({
        name: emgCase.patientName,
        email,
        password: "tempPassword123",
        phone: emgCase.contactNumber || "",
        role: "patient",
        gender: emgCase.gender || "",
        age: emgCase.age,
      });
      const savedUser = await tempUser.save();
      patientId = savedUser._id;
      emgCase.patient = patientId;
    }

    const effectiveDoctor = doctorId || emgCase.assignedDoctor;
    if (!effectiveDoctor) {
      return res.status(400).json({ message: "An admitting doctor must be assigned" });
    }

    const admissionNumber = await generateAdmissionNumber();

    const admission = new Admission({
      admissionNumber,
      patient: patientId,
      doctor: effectiveDoctor,
      ward: wardId,
      bed: bedId,
      admissionDate: new Date(),
      reason: reason || `Emergency Admission (${emgCase.priority} Priority): ${emgCase.triageNotes}`,
      notes: notes || "",
      status: "Admitted",
    });

    const savedAdmission = await admission.save();

    // Mark bed occupied
    bed.status = "Occupied";
    bed.currentAdmission = savedAdmission._id;
    await bed.save();

    // Link admission to emergency case
    emgCase.treatmentStatus = "Admitted";
    emgCase.admission = savedAdmission._id;
    await emgCase.save();

    const populated = await EmergencyCase.findById(emgCase._id)
      .populate("patient", "name email phone")
      .populate("assignedDoctor", "name specialization")
      .populate({
        path: "admission",
        populate: [{ path: "ward" }, { path: "bed" }],
      });

    res.status(200).json({
      message: "Emergency patient successfully admitted to ward & bed",
      emergencyCase: populated,
      admission: savedAdmission,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to admit emergency patient", error: error.message });
  }
}

async function dischargeEmergencyPatient(req, res) {
  try {
    const emgCase = await EmergencyCase.findById(req.params.id);
    if (!emgCase) {
      return res.status(404).json({ message: "Emergency case not found" });
    }

    emgCase.treatmentStatus = "Discharged";
    emgCase.dischargedAt = new Date();
    await emgCase.save();

    res.status(200).json({
      message: "Emergency patient discharged",
      emergencyCase: emgCase,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to discharge emergency patient", error: error.message });
  }
}

module.exports = {
  registerEmergencyCase,
  getAllEmergencyCases,
  getEmergencyCaseById,
  updateEmergencyCase,
  admitEmergencyPatient,
  dischargeEmergencyPatient,
};
