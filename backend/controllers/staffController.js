const Staff = require("../models/staffModel");
const User = require("../models/userModel");
const Department = require("../models/departmentModel");

const VALID_ROLES = ["nurse", "receptionist", "pharmacist", "lab_technician"];

async function getStaffRoles(req, res) {
  res.status(200).json({
    roles: [
      { id: "nurse", label: "Nurse", departmentRequired: false },
      { id: "receptionist", label: "Receptionist", departmentRequired: false },
      { id: "pharmacist", label: "Pharmacist", departmentRequired: false },
      { id: "lab_technician", label: "Lab Technician", departmentRequired: false },
    ],
  });
}

async function createStaff(req, res) {
  try {
    const {
      name,
      email,
      password,
      phone,
      role,
      department,
      qualification,
      shift,
      salary,
    } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({
        message: "Name, email, password, and staff role are required",
      });
    }

    if (!VALID_ROLES.includes(role)) {
      return res.status(400).json({
        message: `Invalid role. Must be one of: ${VALID_ROLES.join(", ")}`,
      });
    }

    const existingUser = await User.findOne({ email: email.trim().toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "An account with this email already exists" });
    }

    if (department) {
      const deptExists = await Department.findById(department);
      if (!deptExists) {
        return res.status(404).json({ message: "Specified department not found" });
      }
    }

    // Step 1: Create user authentication account with matching role
    const newUser = new User({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      phone: phone || "",
      role,
    });
    const savedUser = await newUser.save();

    // Step 2: Create staff profile linked to User
    const newStaff = new Staff({
      user: savedUser._id,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone || "",
      role,
      department: department || undefined,
      qualification: qualification || "",
      shift: shift || "Morning",
      salary: salary !== undefined ? Number(salary) : 0,
    });

    const savedStaff = await newStaff.save();
    const populated = await Staff.findById(savedStaff._id)
      .populate("department", "name location")
      .populate("user", "name email role");

    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: "Failed to create staff member", error: error.message });
  }
}

async function getAllStaff(req, res) {
  try {
    const filter = {};
    if (req.query.role) {
      filter.role = req.query.role;
    }
    if (req.query.department) {
      filter.department = req.query.department;
    }
    if (req.query.status) {
      filter.status = req.query.status;
    }
    if (req.query.search) {
      filter.$or = [
        { name: new RegExp(req.query.search, "i") },
        { email: new RegExp(req.query.search, "i") },
      ];
    }

    const staffList = await Staff.find(filter)
      .populate("department", "name location")
      .sort({ createdAt: -1 });

    res.status(200).json(staffList);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch staff members", error: error.message });
  }
}

async function getStaffById(req, res) {
  try {
    const staff = await Staff.findById(req.params.id)
      .populate("department", "name location")
      .populate("user", "name email role");

    if (!staff) {
      return res.status(404).json({ message: "Staff member not found" });
    }

    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch staff member", error: error.message });
  }
}

async function updateStaff(req, res) {
  try {
    const { name, phone, role, department, qualification, shift, status, salary } = req.body;

    const staff = await Staff.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({ message: "Staff member not found" });
    }

    if (role && !VALID_ROLES.includes(role)) {
      return res.status(400).json({
        message: `Invalid role. Must be one of: ${VALID_ROLES.join(", ")}`,
      });
    }

    if (department) {
      const dept = await Department.findById(department);
      if (!dept) {
        return res.status(404).json({ message: "Department not found" });
      }
      staff.department = department;
    } else if (department === null) {
      staff.department = undefined;
    }

    if (name) staff.name = name;
    if (phone !== undefined) staff.phone = phone;
    if (role) staff.role = role;
    if (qualification !== undefined) staff.qualification = qualification;
    if (shift) staff.shift = shift;
    if (status) staff.status = status;
    if (salary !== undefined) staff.salary = Number(salary);

    const savedStaff = await staff.save();

    // Synchronize role and name with linked user account
    if (staff.user) {
      const userUpdates = {};
      if (name) userUpdates.name = name;
      if (phone !== undefined) userUpdates.phone = phone;
      if (role) userUpdates.role = role;
      await User.findByIdAndUpdate(staff.user, userUpdates);
    }

    const populated = await Staff.findById(savedStaff._id)
      .populate("department", "name location")
      .populate("user", "name email role");

    res.status(200).json(populated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update staff member", error: error.message });
  }
}

async function deleteStaff(req, res) {
  try {
    const staff = await Staff.findById(req.params.id);
    if (!staff) {
      return res.status(404).json({ message: "Staff member not found" });
    }

    // Optionally remove linked user account
    if (staff.user) {
      await User.findByIdAndDelete(staff.user);
    }

    await Staff.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Staff member and user account deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete staff member", error: error.message });
  }
}

module.exports = {
  getStaffRoles,
  createStaff,
  getAllStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
};
