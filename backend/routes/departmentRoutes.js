const express = require("express");
const router = express.Router();

const {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
  assignDoctorToDepartment,
  getDoctorsByDepartment,
} = require("../controllers/departmentController");

const authenticate = require("../middleware/authenticate");
const adminOnly = require("../middleware/adminOnly");

router.get("/", getAllDepartments);
router.get("/:id", getDepartmentById);
router.get("/:id/doctors", getDoctorsByDepartment);

router.post("/", authenticate, adminOnly, createDepartment);
router.put("/:id", authenticate, adminOnly, updateDepartment);
router.delete("/:id", authenticate, adminOnly, deleteDepartment);
router.post("/:id/assign-doctor", authenticate, adminOnly, assignDoctorToDepartment);

module.exports = router;
