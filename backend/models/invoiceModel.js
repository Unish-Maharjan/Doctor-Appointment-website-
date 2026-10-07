const mongoose = require("mongoose");

const invoiceItemSchema = new mongoose.Schema(
  {
    serviceName: {
      type: String,
      required: true,
      trim: true,
    },
    serviceType: {
      type: String,
      enum: [
        "consultation",
        "follow_up",
        "lab_test",
        "medicine",
        "procedure",
        "room_charge",
        "emergency",
        "other",
      ],
      default: "consultation",
    },
    description: {
      type: String,
      default: "",
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
    unitPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: true }
);

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      index: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      index: true,
    },
    items: {
      type: [invoiceItemSchema],
      default: [],
      validate: {
        validator: function (v) {
          return Array.isArray(v) && v.length > 0;
        },
        message: "Invoice must contain at least one item",
      },
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    discount: {
      type: Number,
      min: 0,
      default: 0,
    },
    tax: {
      type: Number,
      min: 0,
      default: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    amountPaid: {
      type: Number,
      min: 0,
      default: 0,
    },
    balanceDue: {
      type: Number,
      min: 0,
      default: 0,
    },
    status: {
      type: String,
      enum: ["DRAFT", "ISSUED", "CANCELLED"],
      default: "ISSUED",
      index: true,
    },
    paymentStatus: {
      type: String,
      enum: ["UNPAID", "PARTIALLY_PAID", "PAID", "REFUNDED"],
      default: "UNPAID",
      index: true,
    },
    dueDate: {
      type: Date,
    },
    notes: {
      type: String,
      default: "",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// Method to recalculate balance and payment status safely
invoiceSchema.methods.recalculatePaymentStatus = function () {
  this.amountPaid = Math.round(Number(this.amountPaid || 0) * 100) / 100;
  this.totalAmount = Math.round(Number(this.totalAmount || 0) * 100) / 100;
  this.balanceDue = Math.max(0, Math.round((this.totalAmount - this.amountPaid) * 100) / 100);

  if (this.amountPaid >= this.totalAmount && this.totalAmount > 0) {
    this.paymentStatus = "PAID";
    this.balanceDue = 0;
  } else if (this.amountPaid > 0 && this.amountPaid < this.totalAmount) {
    this.paymentStatus = "PARTIALLY_PAID";
  } else if (this.amountPaid === 0) {
    if (this.paymentStatus !== "REFUNDED") {
      this.paymentStatus = "UNPAID";
    }
  }
};

module.exports = mongoose.model("Invoice", invoiceSchema);
