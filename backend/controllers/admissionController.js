const Ward = require("../models/wardModel");
const Bed = require("../models/bedModel");
const Admission = require("../models/admissionModel");
const { generateAdmissionNumber } = require("../utils/sequenceGenerator");

// --- Wards ---
async function createWard(req, res) {
  try {
    const { name, wardType, floor, capacity, dailyRate, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Ward name is required" });
    }

    const existing = await Ward.findOne({ name: name.trim() });
    if (existing) {
      return res.status(400).json({ message: "Ward with this name already exists" });
    }

    const ward = new Ward({
      name: name.trim(),
      wardType: wardType || "General",
      floor: floor || "1st Floor",
      capacity: capacity !== undefined ? Number(capacity) : 10,
      dailyRate: dailyRate !== undefined ? Number(dailyRate) : 500,
      description: description || "",
    });

    const saved = await ward.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Failed to create ward", error: error.message });
  }
}

async function getAllWards(req, res) {
  try {
    const wards = await Ward.find().sort({ name: 1 });

    const wardsWithBedStats = await Promise.all(
      wards.map(async (w) => {
        const totalBeds = await Bed.countDocuments({ ward: w._id });
        const availableBeds = await Bed.countDocuments({ ward: w._id, status: "Available" });
        const occupiedBeds = await Bed.countDocuments({ ward: w._id, status: "Occupied" });
        return {
          ...w.toObject(),
          totalBeds,
          availableBeds,
          occupiedBeds,
        };
      })
    );

    res.status(200).json(wardsWithBedStats);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch wards", error: error.message });
  }
}

async function getWardById(req, res) {
  try {
    const ward = await Ward.findById(req.params.id);
    if (!ward) {
      return res.status(404).json({ message: "Ward not found" });
    }

    const beds = await Bed.find({ ward: ward._id })
      .populate("currentAdmission")
      .sort({ bedNumber: 1 });

    res.status(200).json({
      ...ward.toObject(),
      beds,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch ward", error: error.message });
  }
}

async function updateWard(req, res) {
  try {
    const updated = await Ward.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Ward not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update ward", error: error.message });
  }
}

async function deleteWard(req, res) {
  try {
    const occupiedBeds = await Bed.countDocuments({ ward: req.params.id, status: "Occupied" });
    if (occupiedBeds > 0) {
      return res.status(400).json({
        message: `Cannot delete ward. There are ${occupiedBeds} occupied beds in this ward.`,
      });
    }

    await Bed.deleteMany({ ward: req.params.id });
    const deleted = await Ward.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Ward not found" });
    }

    res.status(200).json({ message: "Ward and its beds deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete ward", error: error.message });
  }
}

// --- Beds ---
async function createBed(req, res) {
  try {
    const { bedNumber, wardId, dailyRate } = req.body;

    if (!bedNumber || !wardId) {
      return res.status(400).json({ message: "Bed number and wardId are required" });
    }

    const ward = await Ward.findById(wardId);
    if (!ward) {
      return res.status(404).json({ message: "Ward not found" });
    }

    const existing = await Bed.findOne({ bedNumber: bedNumber.trim(), ward: wardId });
    if (existing) {
      return res.status(400).json({ message: "Bed number already exists in this ward" });
    }

    const bed = new Bed({
      bedNumber: bedNumber.trim(),
      ward: ward._id,
      dailyRate: dailyRate !== undefined ? Number(dailyRate) : ward.dailyRate,
      status: "Available",
    });

    const saved = await bed.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Failed to create bed", error: error.message });
  }
}

async function getAllBeds(req, res) {
  try {
    const filter = {};
    if (req.query.ward) {
      filter.ward = req.query.ward;
    }
    if (req.query.status) {
      filter.status = req.query.status;
    }

    const beds = await Bed.find(filter)
      .populate("ward", "name wardType floor dailyRate")
      .populate({
        path: "currentAdmission",
        populate: [
          { path: "patient", select: "name email phone" },
          { path: "doctor", select: "name specialization" },
        ],
      })
      .sort({ bedNumber: 1 });

    res.status(200).json(beds);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch beds", error: error.message });
  }
}

async function getBedById(req, res) {
  try {
    const bed = await Bed.findById(req.params.id)
      .populate("ward")
      .populate({
        path: "currentAdmission",
        populate: [
          { path: "patient", select: "name email phone" },
          { path: "doctor", select: "name specialization" },
        ],
      });

    if (!bed) {
      return res.status(404).json({ message: "Bed not found" });
    }

    res.status(200).json(bed);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bed", error: error.message });
  }
}

async function updateBed(req, res) {
  try {
    const updated = await Bed.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Bed not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update bed", error: error.message });
  }
}

async function deleteBed(req, res) {
  try {
    const bed = await Bed.findById(req.params.id);
    if (!bed) {
      return res.status(404).json({ message: "Bed not found" });
    }
    if (bed.status === "Occupied") {
      return res.status(400).json({ message: "Cannot delete an occupied bed" });
    }

    await Bed.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Bed deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete bed", error: error.message });
  }
}

// --- Admissions ---
async function admitPatient(req, res) {
  try {
    const { patient, doctor, wardId, bedId, reason, notes } = req.body;

    if (!patient || !doctor || !wardId || !bedId) {
      return res.status(400).json({
        message: "Patient, doctor, wardId, and bedId are required",
      });
    }

    const bed = await Bed.findById(bedId);
    if (!bed) {
      return res.status(404).json({ message: "Bed not found" });
    }

    if (bed.status !== "Available") {
      return res.status(400).json({ message: `Bed is currently ${bed.status}` });
    }

    const admissionNumber = await generateAdmissionNumber();

    const admission = new Admission({
      admissionNumber,
      patient,
      doctor,
      ward: wardId,
      bed: bedId,
      reason: reason || "",
      notes: notes || "",
      status: "Admitted",
      admissionDate: new Date(),
    });

    const savedAdmission = await admission.save();

    // Mark bed as Occupied
    bed.status = "Occupied";
    bed.currentAdmission = savedAdmission._id;
    await bed.save();

    const populated = await Admission.findById(savedAdmission._id)
      .populate("patient", "name email phone")
      .populate("doctor", "name specialization")
      .populate("ward", "name wardType floor dailyRate")
      .populate("bed", "bedNumber status");

    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: "Failed to admit patient", error: error.message });
  }
}

async function getAllAdmissions(req, res) {
  try {
    const filter = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }
    if (req.query.patient) {
      filter.patient = req.query.patient;
    }
    if (req.query.ward) {
      filter.ward = req.query.ward;
    }

    const admissions = await Admission.find(filter)
      .populate("patient", "name email phone")
      .populate("doctor", "name specialization")
      .populate("ward", "name wardType floor dailyRate")
      .populate("bed", "bedNumber status")
      .sort({ admissionDate: -1 });

    res.status(200).json(admissions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch admissions", error: error.message });
  }
}

async function getMyAdmissions(req, res) {
  try {
    const admissions = await Admission.find({ patient: req.user._id })
      .populate("doctor", "name specialization")
      .populate("ward", "name wardType floor dailyRate")
      .populate("bed", "bedNumber status")
      .sort({ admissionDate: -1 });

    res.status(200).json(admissions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch your admissions", error: error.message });
  }
}

async function getAdmissionById(req, res) {
  try {
    const admission = await Admission.findById(req.params.id)
      .populate("patient", "name email phone")
      .populate("doctor", "name specialization")
      .populate("ward", "name wardType floor dailyRate")
      .populate("bed", "bedNumber status");

    if (!admission) {
      return res.status(404).json({ message: "Admission record not found" });
    }

    if (
      req.user.role === "patient" &&
      admission.patient._id.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not authorized to view this admission" });
    }

    res.status(200).json(admission);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch admission", error: error.message });
  }
}

async function dischargePatient(req, res) {
  try {
    const { dischargeSummary, notes } = req.body;

    const admission = await Admission.findById(req.params.id);
    if (!admission) {
      return res.status(404).json({ message: "Admission not found" });
    }

    if (admission.status === "Discharged") {
      return res.status(400).json({ message: "Patient is already discharged" });
    }

    admission.status = "Discharged";
    admission.dischargeDate = new Date();
    if (dischargeSummary) admission.dischargeSummary = dischargeSummary;
    if (notes) admission.notes = notes;

    await admission.save();

    // Release bed to Available
    if (admission.bed) {
      await Bed.findByIdAndUpdate(admission.bed, {
        status: "Available",
        currentAdmission: null,
      });
    }

    const updated = await Admission.findById(admission._id)
      .populate("patient", "name email phone")
      .populate("doctor", "name specialization")
      .populate("ward", "name wardType floor dailyRate")
      .populate("bed", "bedNumber status");

    res.status(200).json({
      message: "Patient successfully discharged and bed marked Available",
      admission: updated,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to discharge patient", error: error.message });
  }
}

module.exports = {
  createWard,
  getAllWards,
  getWardById,
  updateWard,
  deleteWard,
  createBed,
  getAllBeds,
  getBedById,
  updateBed,
  deleteBed,
  admitPatient,
  getAllAdmissions,
  getMyAdmissions,
  getAdmissionById,
  dischargePatient,
};
