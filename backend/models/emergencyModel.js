const mongoose = require("mongoose");

const emergencyCaseSchema = new mongoose.Schema(
  {
    caseNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      index: true,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    patientName: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other", ""],
      default: "",
    },
    contactNumber: {
      type: String,
      default: "",
    },
    priority: {
      type: String,
      enum: ["Critical", "High", "Moderate", "Low"],
      default: "High",
      index: true,
    },
    assignedDoctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
    triageNotes: {
      type: String,
      default: "",
    },
    vitals: {
      bp: { type: String, default: "" },
      pulse: { type: String, default: "" },
      temp: { type: String, default: "" },
      spO2: { type: String, default: "" },
    },
    treatmentStatus: {
      type: String,
      enum: ["Triaged", "Under Treatment", "Stabilized", "Admitted", "Discharged"],
      default: "Triaged",
      index: true,
    },
    admission: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admission",
    },
    registeredAt: {
      type: Date,
      default: Date.now,
    },
    dischargedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("EmergencyCase", emergencyCaseSchema);
