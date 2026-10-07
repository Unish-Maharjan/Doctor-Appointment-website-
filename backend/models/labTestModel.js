const mongoose = require("mongoose");

const labTestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
      default: "General",
    },
    price: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },
    description: {
      type: String,
      default: "",
    },
    sampleType: {
      type: String,
      default: "Blood",
    },
    normalRange: {
      type: String,
      default: "",
    },
    turnaroundTime: {
      type: String,
      default: "24 hours",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("LabTest", labTestSchema);
