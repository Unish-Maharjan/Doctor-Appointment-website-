const express = require("express");
const router = express.Router();

const {
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
} = require("../controllers/admissionController");

const authenticate = require("../middleware/authenticate");
const authorizeRoles = require("../middleware/authorizeRoles");

// Wards
router.get("/wards", getAllWards);
router.get("/wards/:id", getWardById);
router.post("/wards", authenticate, authorizeRoles("admin"), createWard);
router.put("/wards/:id", authenticate, authorizeRoles("admin"), updateWard);
router.delete("/wards/:id", authenticate, authorizeRoles("admin"), deleteWard);

// Beds
router.get(
  "/beds",
  authenticate,
  authorizeRoles("admin", "doctor", "nurse", "receptionist"),
  getAllBeds
);
router.get(
  "/beds/:id",
  authenticate,
  authorizeRoles("admin", "doctor", "nurse", "receptionist"),
  getBedById
);
router.post("/beds", authenticate, authorizeRoles("admin"), createBed);
router.put("/beds/:id", authenticate, authorizeRoles("admin"), updateBed);
router.delete("/beds/:id", authenticate, authorizeRoles("admin"), deleteBed);

// Admissions
router.get("/my", authenticate, getMyAdmissions);
router.get(
  "/",
  authenticate,
  authorizeRoles("admin", "doctor", "nurse", "receptionist"),
  getAllAdmissions
);
router.get("/:id", authenticate, getAdmissionById);
router.post(
  "/",
  authenticate,
  authorizeRoles("admin", "doctor", "nurse", "receptionist"),
  admitPatient
);
router.put(
  "/:id/discharge",
  authenticate,
  authorizeRoles("admin", "doctor", "nurse"),
  dischargePatient
);

module.exports = router;
