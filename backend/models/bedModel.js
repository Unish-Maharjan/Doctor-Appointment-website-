const mongoose = require("mongoose");

const bedSchema = new mongoose.Schema(
  {
    bedNumber: {
      type: String,
      required: true,
      trim: true,
    },
    ward: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ward",
      required: true,
    },
    status: {
      type: String,
      enum: ["Available", "Occupied", "Maintenance"],
      default: "Available",
      index: true,
    },
    dailyRate: {
      type: Number,
      min: 0,
    },
    currentAdmission: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admission",
    },
  },
  { timestamps: true }
);

bedSchema.index({ bedNumber: 1, ward: 1 }, { unique: true });

module.exports = mongoose.model("Bed", bedSchema);
