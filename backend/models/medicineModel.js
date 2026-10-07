const mongoose = require("mongoose");

const medicineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    genericName: {
      type: String,
      default: "",
      trim: true,
    },
    category: {
      type: String,
      enum: ["Tablet", "Capsule", "Syrup", "Injection", "Ointment", "Drops", "Inhaler", "Other"],
      default: "Tablet",
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    minStockLevel: {
      type: Number,
      default: 10,
      min: 0,
    },
    expiryDate: {
      type: Date,
      required: true,
    },
    manufacturer: {
      type: String,
      default: "",
      trim: true,
    },
    batchNumber: {
      type: String,
      default: "",
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

medicineSchema.virtual("isLowStock").get(function () {
  return this.quantity <= this.minStockLevel;
});

module.exports = mongoose.model("Medicine", medicineSchema);
