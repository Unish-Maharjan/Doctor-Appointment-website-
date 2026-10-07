const express = require("express");
const router = express.Router();

const {
  createLabTest,
  getAllLabTests,
  getLabTestById,
  updateLabTest,
  deleteLabTest,
  createLabOrder,
  getAllLabOrders,
  getMyLabOrders,
  getLabOrdersByPatient,
  getLabOrderById,
  updateLabOrderResult,
} = require("../controllers/labController");

const authenticate = require("../middleware/authenticate");
const authorizeRoles = require("../middleware/authorizeRoles");

// Catalog tests
router.get("/tests", getAllLabTests);
router.get("/tests/:id", getLabTestById);
router.post(
  "/tests",
  authenticate,
  authorizeRoles("admin", "lab_technician"),
  createLabTest
);
router.put(
  "/tests/:id",
  authenticate,
  authorizeRoles("admin", "lab_technician"),
  updateLabTest
);
router.delete(
  "/tests/:id",
  authenticate,
  authorizeRoles("admin", "lab_technician"),
  deleteLabTest
);

// Lab Orders
router.get("/orders/my", authenticate, getMyLabOrders);
router.get(
  "/orders/patient/:patientId",
  authenticate,
  authorizeRoles("admin", "doctor", "lab_technician", "nurse"),
  getLabOrdersByPatient
);
router.get(
  "/orders",
  authenticate,
  authorizeRoles("admin", "doctor", "lab_technician", "nurse", "receptionist"),
  getAllLabOrders
);
router.get("/orders/:id", authenticate, getLabOrderById);
router.post(
  "/orders",
  authenticate,
  authorizeRoles("admin", "doctor", "lab_technician", "nurse"),
  createLabOrder
);
router.put(
  "/orders/:id/result",
  authenticate,
  authorizeRoles("admin", "lab_technician", "doctor"),
  updateLabOrderResult
);

module.exports = router;
