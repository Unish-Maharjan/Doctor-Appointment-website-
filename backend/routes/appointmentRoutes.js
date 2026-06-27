const express = require("express");
const router = express.Router();

const {
  createAppointment,
  getMyAppointments,
  getAllAppointments,
  updateAppointmentStatus,
  cancelAppointment,
} = require("../controllers/appointmentController");

const authenticate = require("../middleware/authenticate");
const adminOnly = require("../middleware/adminOnly");

router.post("/", authenticate, createAppointment);
router.get("/my", authenticate, getMyAppointments);
router.get("/", authenticate, adminOnly, getAllAppointments);
router.put("/:id", authenticate, adminOnly, updateAppointmentStatus);
router.delete("/:id", authenticate, cancelAppointment);

module.exports = router;
