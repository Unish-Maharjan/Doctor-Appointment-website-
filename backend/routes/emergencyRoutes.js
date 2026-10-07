const express = require("express");
const router = express.Router();

const {
  registerEmergencyCase,
  getAllEmergencyCases,
  getEmergencyCaseById,
  updateEmergencyCase,
  admitEmergencyPatient,
  dischargeEmergencyPatient,
} = require("../controllers/emergencyController");

const authenticate = require("../middleware/authenticate");
const authorizeRoles = require("../middleware/authorizeRoles");

router.get(
  "/",
  authenticate,
  authorizeRoles("admin", "doctor", "nurse", "receptionist"),
  getAllEmergencyCases
);
router.get(
  "/:id",
  authenticate,
  authorizeRoles("admin", "doctor", "nurse", "receptionist"),
  getEmergencyCaseById
);
router.post(
  "/",
  authenticate,
  authorizeRoles("admin", "doctor", "nurse", "receptionist"),
  registerEmergencyCase
);
router.put(
  "/:id",
  authenticate,
  authorizeRoles("admin", "doctor", "nurse"),
  updateEmergencyCase
);
router.post(
  "/:id/admit",
  authenticate,
  authorizeRoles("admin", "doctor", "nurse"),
  admitEmergencyPatient
);
router.put(
  "/:id/discharge",
  authenticate,
  authorizeRoles("admin", "doctor", "nurse"),
  dischargeEmergencyPatient
);

module.exports = router;
