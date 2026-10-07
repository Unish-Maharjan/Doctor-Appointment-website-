const mongoose = require("mongoose");

const wardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    wardType: {
      type: String,
      enum: ["General", "ICU", "CCU", "Maternity", "Pediatric", "Emergency", "Private"],
      default: "General",
    },
    floor: {
      type: String,
      default: "1st Floor",
    },
    capacity: {
      type: Number,
      default: 10,
      min: 1,
    },
    dailyRate: {
      type: Number,
      default: 500,
      min: 0,
    },
    description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ward", wardSchema);
