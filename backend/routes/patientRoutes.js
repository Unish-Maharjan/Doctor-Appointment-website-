const express = require("express");
const router = express.Router();

const {
  getAllPatients,
  getMyPatientProfile,
  updateMyPatientProfile,
  getPatientById,
  updatePatientById,
  getPatientFullRecord,
} = require("../controllers/patientController");

const authenticate = require("../middleware/authenticate");
const authorizeRoles = require("../middleware/authorizeRoles");

router.get("/me", authenticate, getMyPatientProfile);
router.put("/me", authenticate, updateMyPatientProfile);
router.get("/me/full-record", authenticate, (req, res, next) => {
  req.params.id = req.user._id.toString();
  return getPatientFullRecord(req, res, next);
});

router.get(
  "/",
  authenticate,
  authorizeRoles("admin", "doctor", "nurse", "receptionist"),
  getAllPatients
);
router.get("/:id", authenticate, getPatientById);
router.put(
  "/:id",
  authenticate,
  authorizeRoles("admin", "doctor", "nurse"),
  updatePatientById
);
router.get("/:id/full-record", authenticate, getPatientFullRecord);

module.exports = router;
