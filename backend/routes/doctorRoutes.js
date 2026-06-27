const express = require("express");
const router = express.Router();

const {
  getAllDoctors,
  getDoctorById,
  addDoctor,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/doctorController");

const authenticate = require("../middleware/authenticate");
const adminOnly = require("../middleware/adminOnly");

router.get("/", getAllDoctors);
router.get("/:id", getDoctorById);

router.post("/", authenticate, adminOnly, addDoctor);
router.put("/:id", authenticate, adminOnly, updateDoctor);
router.delete("/:id", authenticate, adminOnly, deleteDoctor);

module.exports = router;
