const Payment = require("../models/paymentModel");
const Invoice = require("../models/invoiceModel");
const { generateTransactionId } = require("../utils/sequenceGenerator");
const { recordAuditLog } = require("../utils/auditLogger");

// 1. Process Demo Payment
async function processPayment(req, res) {
  try {
    const { invoiceId, amount, paymentMethod = "ONLINE", notes = "" } = req.body;

    if (!invoiceId) {
      return res.status(400).json({ success: false, message: "Invoice ID is required" });
    }

    const invoice = await Invoice.findById(invoiceId);

    if (!invoice) {
      return res.status(404).json({ success: false, message: "Invoice not found" });
    }

    // Ownership check: Patient can only pay their own invoice (admin can also pay/record)
    const isOwner = invoice.patient.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to make a payment for this invoice",
      });
    }

    if (invoice.status === "CANCELLED") {
      return res.status(400).json({
        success: false,
        message: "Cannot process payment for a cancelled invoice",
      });
    }

    // Check if invoice is already fully paid
    if (invoice.paymentStatus === "PAID" || invoice.balanceDue <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invoice is already fully paid.",
      });
    }

    // Validate payment amount (never trust blindly)
    const parsedAmount = Number(amount);
    if (!parsedAmount || isNaN(parsedAmount) || parsedAmount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment amount. Amount must be greater than zero.",
      });
    }

    const roundAmount = Math.round(parsedAmount * 100) / 100;

    // Check for overpayment against calculated outstanding balance
    if (roundAmount > invoice.balanceDue) {
      return res.status(400).json({
        success: false,
        message: `Payment amount (Rs. ${roundAmount}) exceeds outstanding balance (Rs. ${invoice.balanceDue}).`,
      });
    }

    // Validate payment method
    const validMethods = ["CASH", "CARD", "ONLINE", "ESEWA", "KHALTI", "BANK_TRANSFER"];
    const sanitizedMethod = validMethods.includes(paymentMethod.toUpperCase())
      ? paymentMethod.toUpperCase()
      : "ONLINE";

    // Generate unique transaction ID
    const transactionId = await generateTransactionId();

    const payment = new Payment({
      transactionId,
      invoice: invoice._id,
      patient: invoice.patient,
      amount: roundAmount,
      paymentMethod: sanitizedMethod,
      paymentGateway: "DEMO",
      gatewayTransactionId: `DEMO-GATEWAY-${Date.now()}`,
      status: "SUCCESS",
      currency: "NPR",
      paidAt: new Date(),
      notes: notes || "Demo payment simulation",
      metadata: {
        demoEnvironment: true,
        simulation: "Software Engineering Demo Gateway",
        initiatedBy: req.user._id,
      },
    });

    const savedPayment = await payment.save();

    // Update invoice atomically and consistently
    invoice.amountPaid = Math.round((Number(invoice.amountPaid || 0) + roundAmount) * 100) / 100;
    invoice.recalculatePaymentStatus();
    const updatedInvoice = await invoice.save();

    await recordAuditLog({
      req,
      action: "PAYMENT_PROCESSED",
      resource: "Payment",
      resourceId: savedPayment._id,
      details: {
        transactionId: savedPayment.transactionId,
        invoiceNumber: invoice.invoiceNumber,
        amount: roundAmount,
        paymentMethod: sanitizedMethod,
      },
    });

    const populatedInvoice = await Invoice.findById(updatedInvoice._id)
      .populate("patient", "name email phone")
      .populate("doctor", "name specialization")
      .populate("appointment", "date time status");

    res.status(200).json({
      success: true,
      message: "Payment processed successfully (Demo)",
      data: {
        transaction: savedPayment,
        invoice: populatedInvoice,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to process payment",
      error: error.message,
    });
  }
}

// 2. Get All Payments (Admin)
async function getAllPayments(req, res) {
  try {
    const { status, paymentMethod, startDate, endDate } = req.query;

    const query = {};
    if (status) query.status = status;
    if (paymentMethod) query.paymentMethod = paymentMethod.toUpperCase();

    if (startDate || endDate) {
      query.paidAt = {};
      if (startDate) query.paidAt.$gte = new Date(startDate);
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        query.paidAt.$lte = end;
      }
    }

    const payments = await Payment.find(query)
      .populate("patient", "name email phone")
      .populate("invoice", "invoiceNumber totalAmount amountPaid balanceDue paymentStatus")
      .populate("refundedBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch payments", error: error.message });
  }
}

// 3. Get My Payment History (Patient)
async function getMyPayments(req, res) {
  try {
    const payments = await Payment.find({ patient: req.user._id })
      .populate("invoice", "invoiceNumber totalAmount paymentStatus")
      .sort({ createdAt: -1 });

    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch payment history", error: error.message });
  }
}

// 4. Get Payment By ID
async function getPaymentById(req, res) {
  try {
    const payment = await Payment.findById(req.params.id)
      .populate("patient", "name email phone")
      .populate("invoice")
      .populate("refundedBy", "name email");

    if (!payment) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    const isOwner = payment.patient && payment.patient._id.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Access denied. You cannot view this transaction." });
    }

    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch transaction", error: error.message });
  }
}

// 5. Get Payments By Invoice ID
async function getPaymentsByInvoice(req, res) {
  try {
    const { invoiceId } = req.params;

    const invoice = await Invoice.findById(invoiceId);
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    const isOwner = invoice.patient.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Access denied." });
    }

    const payments = await Payment.find({ invoice: invoiceId })
      .populate("patient", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch invoice transactions", error: error.message });
  }
}

// 6. Refund Payment (Admin Only)
async function refundPayment(req, res) {
  try {
    const { id } = req.params;
    const { reason = "" } = req.body;

    const payment = await Payment.findById(id);

    if (!payment) {
      return res.status(404).json({ success: false, message: "Transaction not found" });
    }

    if (payment.status === "REFUNDED") {
      return res.status(400).json({
        success: false,
        message: "Payment has already been refunded.",
      });
    }

    if (payment.status !== "SUCCESS") {
      return res.status(400).json({
        success: false,
        message: `Only successful payments can be refunded (current status: ${payment.status}).`,
      });
    }

    const invoice = await Invoice.findById(payment.invoice);
    if (!invoice) {
      return res.status(404).json({ success: false, message: "Associated invoice not found" });
    }

    // Mark payment as refunded
    payment.status = "REFUNDED";
    payment.refundedAt = new Date();
    payment.refundReason = reason || "Administrative refund";
    payment.refundedBy = req.user._id;
    await payment.save();

    // Recalculate invoice totals
    invoice.amountPaid = Math.max(0, Math.round((invoice.amountPaid - payment.amount) * 100) / 100);
    invoice.recalculatePaymentStatus();

    // If completely refunded
    if (invoice.amountPaid === 0) {
      invoice.paymentStatus = "REFUNDED";
    }

    await invoice.save();

    await recordAuditLog({
      req,
      action: "PAYMENT_REFUNDED",
      resource: "Payment",
      resourceId: payment._id,
      details: {
        transactionId: payment.transactionId,
        invoiceNumber: invoice.invoiceNumber,
        refundAmount: payment.amount,
        reason: payment.refundReason,
      },
    });

    const populatedInvoice = await Invoice.findById(invoice._id)
      .populate("patient", "name email phone")
      .populate("doctor", "name specialization");

    res.status(200).json({
      success: true,
      message: "Payment refunded successfully",
      data: {
        transaction: payment,
        invoice: populatedInvoice,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to refund payment",
      error: error.message,
    });
  }
}

module.exports = {
  processPayment,
  getAllPayments,
  getMyPayments,
  getPaymentById,
  getPaymentsByInvoice,
  refundPayment,
};
