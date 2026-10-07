const express = require("express");
const router = express.Router();

const {
  processPayment,
  getAllPayments,
  getMyPayments,
  getPaymentById,
  getPaymentsByInvoice,
  refundPayment,
} = require("../controllers/paymentController");

const authenticate = require("../middleware/authenticate");
const adminOnly = require("../middleware/adminOnly");

router.post("/pay", authenticate, processPayment);
router.get("/my", authenticate, getMyPayments);
router.get("/invoice/:invoiceId", authenticate, getPaymentsByInvoice);
router.get("/", authenticate, adminOnly, getAllPayments);
router.get("/:id", authenticate, getPaymentById);
router.post("/:id/refund", authenticate, adminOnly, refundPayment);

module.exports = router;
