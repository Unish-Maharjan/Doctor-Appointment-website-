const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    availableDays: {
      type: [String],
      default: [],
    },
    availableTime: {
      type: String,
      default: "",
    },
    consultationFee: {
      type: Number,
      default: 1000,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema);
