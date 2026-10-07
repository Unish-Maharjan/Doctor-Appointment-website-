const Counter = require("../models/counterModel");

async function generateInvoiceNumber() {
  const year = new Date().getFullYear();
  const counterId = `invoice_${year}`;

  try {
    const counter = await Counter.findByIdAndUpdate(
      counterId,
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    const padded = String(counter.seq).padStart(6, "0");
    return `INV-${year}-${padded}`;
  } catch (err) {
    const fallbackSeq = Math.floor(100000 + Math.random() * 900000);
    return `INV-${year}-${fallbackSeq}`;
  }
}

async function generateTransactionId() {
  const year = new Date().getFullYear();
  const counterId = `transaction_${year}`;

  try {
    const counter = await Counter.findByIdAndUpdate(
      counterId,
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    const padded = String(counter.seq).padStart(6, "0");
    return `TXN-${year}-${padded}`;
  } catch (err) {
    const fallbackSeq = Math.floor(100000 + Math.random() * 900000);
    return `TXN-${year}-${fallbackSeq}`;
  }
}

async function generateAdmissionNumber() {
  const year = new Date().getFullYear();
  const counterId = `admission_${year}`;

  try {
    const counter = await Counter.findByIdAndUpdate(
      counterId,
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    const padded = String(counter.seq).padStart(6, "0");
    return `ADM-${year}-${padded}`;
  } catch (err) {
    const fallbackSeq = Math.floor(100000 + Math.random() * 900000);
    return `ADM-${year}-${fallbackSeq}`;
  }
}

async function generateEmergencyCaseNumber() {
  const year = new Date().getFullYear();
  const counterId = `emergency_${year}`;

  try {
    const counter = await Counter.findByIdAndUpdate(
      counterId,
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    const padded = String(counter.seq).padStart(6, "0");
    return `EMG-${year}-${padded}`;
  } catch (err) {
    const fallbackSeq = Math.floor(100000 + Math.random() * 900000);
    return `EMG-${year}-${fallbackSeq}`;
  }
}

async function generatePrescriptionNumber() {
  const year = new Date().getFullYear();
  const counterId = `prescription_${year}`;

  try {
    const counter = await Counter.findByIdAndUpdate(
      counterId,
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    const padded = String(counter.seq).padStart(6, "0");
    return `RX-${year}-${padded}`;
  } catch (err) {
    const fallbackSeq = Math.floor(100000 + Math.random() * 900000);
    return `RX-${year}-${fallbackSeq}`;
  }
}

async function generateLabOrderNumber() {
  const year = new Date().getFullYear();
  const counterId = `lab_order_${year}`;

  try {
    const counter = await Counter.findByIdAndUpdate(
      counterId,
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    const padded = String(counter.seq).padStart(6, "0");
    return `LAB-${year}-${padded}`;
  } catch (err) {
    const fallbackSeq = Math.floor(100000 + Math.random() * 900000);
    return `LAB-${year}-${fallbackSeq}`;
  }
}

module.exports = {
  generateInvoiceNumber,
  generateTransactionId,
  generateAdmissionNumber,
  generateEmergencyCaseNumber,
  generatePrescriptionNumber,
  generateLabOrderNumber,
};
