const express = require("express");
const router = express.Router();

const {
  createInvoice,
  getAllInvoices,
  getMyInvoices,
  getInvoiceById,
  getInvoicesByPatient,
  getInvoiceByAppointment,
  generateFromAppointment,
  updateInvoice,
  cancelInvoice,
  getBillingStats,
  getAuditLogs,
} = require("../controllers/billingController");

const authenticate = require("../middleware/authenticate");
const adminOnly = require("../middleware/adminOnly");

// Specific routes first to prevent collision with /:id
router.get("/my", authenticate, getMyInvoices);
router.get("/stats/dashboard", authenticate, adminOnly, getBillingStats);
router.get("/audit-logs", authenticate, adminOnly, getAuditLogs);
router.post("/generate-from-appointment/:appointmentId", authenticate, generateFromAppointment);
router.get("/appointment/:appointmentId", authenticate, getInvoiceByAppointment);
router.get("/patient/:patientId", authenticate, getInvoicesByPatient);

// Standard CRUD
router.post("/", authenticate, adminOnly, createInvoice);
router.get("/", authenticate, adminOnly, getAllInvoices);
router.get("/:id", authenticate, getInvoiceById);
router.put("/:id", authenticate, adminOnly, updateInvoice);
router.delete("/:id", authenticate, adminOnly, cancelInvoice);

module.exports = router;
