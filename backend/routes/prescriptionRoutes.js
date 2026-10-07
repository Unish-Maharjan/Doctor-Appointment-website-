const express = require("express");
const router = express.Router();

const {
  createPrescription,
  getAllPrescriptions,
  getMyPrescriptions,
  getPrescriptionsByPatient,
  getPrescriptionById,
  dispensePrescription,
} = require("../controllers/prescriptionController");

const authenticate = require("../middleware/authenticate");
const authorizeRoles = require("../middleware/authorizeRoles");

router.get("/my", authenticate, getMyPrescriptions);
router.get(
  "/patient/:patientId",
  authenticate,
  authorizeRoles("admin", "doctor", "pharmacist", "nurse"),
  getPrescriptionsByPatient
);
router.get(
  "/",
  authenticate,
  authorizeRoles("admin", "doctor", "pharmacist", "nurse"),
  getAllPrescriptions
);
router.get("/:id", authenticate, getPrescriptionById);

router.post(
  "/",
  authenticate,
  authorizeRoles("admin", "doctor"),
  createPrescription
);
router.post(
  "/:id/dispense",
  authenticate,
  authorizeRoles("admin", "pharmacist"),
  dispensePrescription
);

module.exports = router;
