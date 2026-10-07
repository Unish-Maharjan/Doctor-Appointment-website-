const Doctor = require("../models/doctorModel");

async function getAllDoctors(req, res) {
  try {
    const filter = {};
    if (req.query.department) {
      filter.department = req.query.department;
    }
    if (req.query.specialization) {
      filter.specialization = new RegExp(req.query.specialization, "i");
    }

    const doctors = await Doctor.find(filter).populate("department", "name description location");
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch doctors", error: error.message });
  }
}

async function getDoctorById(req, res) {
  try {
    const doctor = await Doctor.findById(req.params.id).populate("department", "name description location");

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch doctor", error: error.message });
  }
}

async function addDoctor(req, res) {
  try {
    const {
      name,
      specialization,
      photo,
      bio,
      availableDays,
      availableTime,
      consultationFee,
      department,
    } = req.body;

    if (!name || !specialization) {
      return res.status(400).json({ message: "Name and specialization are required" });
    }

    const newDoctor = new Doctor({
      name,
      specialization,
      photo,
      bio,
      availableDays,
      availableTime,
      consultationFee: consultationFee !== undefined ? Number(consultationFee) : 1000,
      department: department || undefined,
    });

    const savedDoctor = await newDoctor.save();
    res.status(201).json(savedDoctor);
  } catch (error) {
    res.status(500).json({ message: "Failed to add doctor", error: error.message });
  }
}

async function updateDoctor(req, res) {
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json(updatedDoctor);
  } catch (error) {
    res.status(500).json({ message: "Failed to update doctor", error: error.message });
  }
}

async function deleteDoctor(req, res) {
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);

    if (!deletedDoctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete doctor", error: error.message });
  }
}

module.exports = {
  getAllDoctors,
  getDoctorById,
  addDoctor,
  updateDoctor,
  deleteDoctor,
};
