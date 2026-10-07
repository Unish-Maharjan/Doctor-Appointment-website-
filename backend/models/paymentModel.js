const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    transactionId: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    invoice: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Invoice",
      required: true,
      index: true,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0.01,
    },
    paymentMethod: {
      type: String,
      enum: ["CASH", "CARD", "ONLINE", "ESEWA", "KHALTI", "BANK_TRANSFER"],
      default: "ONLINE",
    },
    paymentGateway: {
      type: String,
      enum: ["DEMO", "ESEWA", "KHALTI", "CASH", "CARD", "OTHER"],
      default: "DEMO",
    },
    gatewayTransactionId: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED", "REFUNDED", "CANCELLED"],
      default: "SUCCESS",
      index: true,
    },
    currency: {
      type: String,
      default: "NPR",
    },
    paidAt: {
      type: Date,
      default: Date.now,
    },
    notes: {
      type: String,
      default: "",
    },
    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    refundReason: {
      type: String,
      default: "",
    },
    refundedAt: {
      type: Date,
    },
    refundedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
