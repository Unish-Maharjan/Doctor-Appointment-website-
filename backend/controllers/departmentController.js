const Department = require("../models/departmentModel");
const Doctor = require("../models/doctorModel");

async function createDepartment(req, res) {
  try {
    const { name, description, headOfDepartment, location, contactNumber, status } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Department name is required" });
    }

    const existing = await Department.findOne({ name: name.trim() });
    if (existing) {
      return res.status(400).json({ message: "Department with this name already exists" });
    }

    const department = new Department({
      name: name.trim(),
      description: description || "",
      headOfDepartment: headOfDepartment || undefined,
      location: location || "",
      contactNumber: contactNumber || "",
      status: status || "Active",
    });

    const saved = await department.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Failed to create department", error: error.message });
  }
}

async function getAllDepartments(req, res) {
  try {
    const departments = await Department.find()
      .populate("headOfDepartment", "name specialization")
      .sort({ name: 1 });

    // Attach doctor counts for each department
    const deptsWithCounts = await Promise.all(
      departments.map(async (dept) => {
        const doctorCount = await Doctor.countDocuments({ department: dept._id });
        return {
          ...dept.toObject(),
          doctorCount,
        };
      })
    );

    res.status(200).json(deptsWithCounts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch departments", error: error.message });
  }
}

async function getDepartmentById(req, res) {
  try {
    const department = await Department.findById(req.params.id).populate(
      "headOfDepartment",
      "name specialization photo"
    );

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    const doctors = await Doctor.find({ department: department._id });

    res.status(200).json({
      ...department.toObject(),
      doctors,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch department", error: error.message });
  }
}

async function updateDepartment(req, res) {
  try {
    const updated = await Department.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Department not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update department", error: error.message });
  }
}

async function deleteDepartment(req, res) {
  try {
    const department = await Department.findByIdAndDelete(req.params.id);

    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    // Unassign doctors from this department
    await Doctor.updateMany({ department: req.params.id }, { $unset: { department: "" } });

    res.status(200).json({ message: "Department deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete department", error: error.message });
  }
}

async function assignDoctorToDepartment(req, res) {
  try {
    const { doctorId } = req.body;
    const departmentId = req.params.id;

    if (!doctorId) {
      return res.status(400).json({ message: "doctorId is required" });
    }

    const department = await Department.findById(departmentId);
    if (!department) {
      return res.status(404).json({ message: "Department not found" });
    }

    const doctor = await Doctor.findByIdAndUpdate(
      doctorId,
      { department: departmentId },
      { new: true }
    ).populate("department", "name");

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    res.status(200).json({
      message: `Doctor ${doctor.name} assigned to ${department.name}`,
      doctor,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to assign doctor", error: error.message });
  }
}

async function getDoctorsByDepartment(req, res) {
  try {
    const departmentId = req.params.id;
    const doctors = await Doctor.find({ department: departmentId });
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch doctors for department", error: error.message });
  }
}

module.exports = {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
  assignDoctorToDepartment,
  getDoctorsByDepartment,
};
