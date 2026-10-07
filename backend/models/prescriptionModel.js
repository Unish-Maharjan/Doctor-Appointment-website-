const mongoose = require("mongoose");

const prescriptionMedicineItemSchema = new mongoose.Schema(
  {
    medicine: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Medicine",
      required: true,
    },
    medicineName: {
      type: String,
      required: true,
    },
    dosage: {
      type: String,
      default: "1 tablet",
    },
    frequency: {
      type: String,
      default: "Once daily",
    },
    duration: {
      type: String,
      default: "5 days",
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
  },
  { _id: true }
);

const prescriptionSchema = new mongoose.Schema(
  {
    prescriptionNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      index: true,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
    diagnosis: {
      type: String,
      default: "",
    },
    medicines: {
      type: [prescriptionMedicineItemSchema],
      required: true,
      validate: {
        validator: function (val) {
          return Array.isArray(val) && val.length > 0;
        },
        message: "Prescription must contain at least one medicine",
      },
    },
    notes: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["Prescribed", "Dispensed", "Cancelled"],
      default: "Prescribed",
      index: true,
    },
    dispensedAt: {
      type: Date,
    },
    dispensedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Prescription", prescriptionSchema);
