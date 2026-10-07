const dns = require("dns");
try {
  dns.setServers(["1.1.1.1", "8.8.8.8"]);
} catch (e) {}

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const authRoutes = require("./routes/authRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const newsRoutes = require("./routes/newsRoutes");
const billingRoutes = require("./routes/billingRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const docsRoutes = require("./routes/docsRoutes");

const User = require("./models/userModel");
const Doctor = require("./models/doctorModel");
const Appointment = require("./models/appointmentModel");
const Invoice = require("./models/invoiceModel");
const Payment = require("./models/paymentModel");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/billing", billingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/docs", docsRoutes);

async function runTests() {
  console.log("=== STARTING FULL BILLING & PAYMENT SUITE TESTS ===");

  await mongoose.connect(process.env.MONGO_URI);
  console.log(" Connected to MongoDB");

  const server = app.listen(5099);
  const BASE_URL = "http://localhost:5099/api";

  let adminUser = await User.findOne({ role: "admin" });
  if (!adminUser) {
    adminUser = await User.create({
      name: "Test Admin",
      email: "testadmin@hospital.com",
      password: "password123",
      role: "admin",
    });
  }

  let patient1 = await User.findOne({ email: "patient1_test@example.com" });
  if (!patient1) {
    patient1 = await User.create({
      name: "Patient One",
      email: "patient1_test@example.com",
      password: "password123",
      role: "patient",
      phone: "9800000001",
    });
  }

  let patient2 = await User.findOne({ email: "patient2_test@example.com" });
  if (!patient2) {
    patient2 = await User.create({
      name: "Patient Two",
      email: "patient2_test@example.com",
      password: "password123",
      role: "patient",
      phone: "9800000002",
    });
  }

  const doctor = await Doctor.findOne();
  if (!doctor) {
    throw new Error("No doctor found in database to test appointments");
  }

  const adminToken = jwt.sign({ id: adminUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  const patient1Token = jwt.sign({ id: patient1._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  const patient2Token = jwt.sign({ id: patient2._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

  let testsPassed = 0;
  let testsTotal = 0;

  function assert(condition, testName) {
    testsTotal++;
    if (condition) {
      console.log(` PASS [${testsTotal}]: ${testName}`);
      testsPassed++;
    } else {
      console.error(` FAIL [${testsTotal}]: ${testName}`);
      throw new Error(`Test failed: ${testName}`);
    }
  }

  // 1. Create Appointment as Patient 1 -> check invoice auto-generation
  console.log("\n--- Testing Appointment Creation & Auto-Invoice Generation ---");
  const aptRes = await fetch(`${BASE_URL}/appointments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${patient1Token}`,
    },
    body: JSON.stringify({
      doctor: doctor._id.toString(),
      date: "2026-10-15",
      time: "10:30 AM",
      reason: "General Consultation Test",
    }),
  });
  const aptData = await aptRes.json();
  assert(aptRes.status === 201, "Appointment created successfully (Status 201)");
  assert(aptData.invoice && aptData.invoice.invoiceNumber, "Invoice was automatically generated with human-readable invoiceNumber");
  assert(aptData.invoice.invoiceNumber.startsWith("INV-"), `Invoice number starts with INV- (${aptData.invoice.invoiceNumber})`);
  assert(aptData.invoice.paymentStatus === "UNPAID", "Generated invoice has paymentStatus UNPAID");
  assert(aptData.invoice.totalAmount === (doctor.consultationFee || 1000), "Generated invoice totalAmount matches doctor consultation fee");

  const testInvoiceId = aptData.invoice._id;

  // 2. Patient 1 retrieves own invoices via /api/billing/my
  console.log("\n--- Testing Patient Invoices Retrieval ---");
  const myBillsRes = await fetch(`${BASE_URL}/billing/my`, {
    headers: { Authorization: `Bearer ${patient1Token}` },
  });
  const myBills = await myBillsRes.json();
  assert(myBillsRes.status === 200, "Patient 1 can fetch own invoices (Status 200)");
  assert(Array.isArray(myBills) && myBills.some((b) => b._id.toString() === testInvoiceId), "Auto-generated invoice is present in patient's bill list");

  // 3. Patient 1 retrieves specific invoice by ID
  const billDetailRes = await fetch(`${BASE_URL}/billing/${testInvoiceId}`, {
    headers: { Authorization: `Bearer ${patient1Token}` },
  });
  const billDetail = await billDetailRes.json();
  assert(billDetailRes.status === 200, "Patient 1 can view their invoice details");
  assert(billDetail.invoiceNumber === aptData.invoice.invoiceNumber, "Invoice detail matches");

  // 4. Patient 2 attempts to view Patient 1's invoice -> MUST FAIL (403)
  console.log("\n--- Testing Authorization & Ownership Verification ---");
  const p2Res = await fetch(`${BASE_URL}/billing/${testInvoiceId}`, {
    headers: { Authorization: `Bearer ${patient2Token}` },
  });
  assert(p2Res.status === 403, "Patient 2 forbidden from accessing Patient 1's invoice (Status 403)");

  // 5. Unauthenticated user attempts to view invoice -> MUST FAIL (401)
  const noAuthRes = await fetch(`${BASE_URL}/billing/${testInvoiceId}`);
  assert(noAuthRes.status === 401, "Unauthenticated user cannot view invoice (Status 401)");

  // 6. Test Demo Payment: Patient 1 pays invoice
  console.log("\n--- Testing Payment Processing (Demo Flow) ---");
  const payRes = await fetch(`${BASE_URL}/payments/pay`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${patient1Token}`,
    },
    body: JSON.stringify({
      invoiceId: testInvoiceId,
      amount: billDetail.balanceDue,
      paymentMethod: "ESEWA",
    }),
  });
  const payData = await payRes.json();
  assert(payRes.status === 200, "Payment processed successfully (Status 200)");
  assert(payData.success === true, "Response has success: true");
  assert(payData.data.transaction.transactionId.startsWith("TXN-"), `Transaction ID generated (${payData.data.transaction.transactionId})`);
  assert(payData.data.transaction.paymentMethod === "ESEWA", "Payment method correctly stored as ESEWA");
  assert(payData.data.invoice.paymentStatus === "PAID", "Invoice paymentStatus updated to PAID");
  assert(payData.data.invoice.balanceDue === 0, "Invoice balanceDue updated to 0");
  assert(payData.data.invoice.amountPaid === billDetail.totalAmount, "Invoice amountPaid equals totalAmount");

  const testTxnId = payData.data.transaction._id;

  // 7. Prevent Double Payment: Patient 1 tries to pay again -> MUST FAIL (400)
  console.log("\n--- Testing Double Payment Prevention ---");
  const doublePayRes = await fetch(`${BASE_URL}/payments/pay`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${patient1Token}`,
    },
    body: JSON.stringify({
      invoiceId: testInvoiceId,
      amount: 500,
      paymentMethod: "CASH",
    }),
  });
  const doublePayData = await doublePayRes.json();
  assert(doublePayRes.status === 400, "Double payment rejected with Status 400");
  assert(doublePayData.message.includes("already fully paid"), "Rejection message specifies invoice is already fully paid");

  // 8. Overpayment validation: Create a new invoice for Rs. 2000, attempt to pay Rs. 3000
  console.log("\n--- Testing Overpayment & Amount Validation ---");
  const newBillRes = await fetch(`${BASE_URL}/billing`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${adminToken}`,
    },
    body: JSON.stringify({
      patient: patient1._id.toString(),
      items: [
        {
          serviceName: "Laboratory Tests",
          serviceType: "lab_test",
          quantity: 1,
          unitPrice: 2000,
        },
      ],
    }),
  });
  const newBill = await newBillRes.json();
  assert(newBillRes.status === 201, "Admin created custom laboratory invoice");

  const overPayRes = await fetch(`${BASE_URL}/payments/pay`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${patient1Token}`,
    },
    body: JSON.stringify({
      invoiceId: newBill._id,
      amount: 3000, // exceeds 2000
      paymentMethod: "ONLINE",
    }),
  });
  assert(overPayRes.status === 400, "Overpayment rejected with Status 400");

  // Partial payment test
  const partialPayRes = await fetch(`${BASE_URL}/payments/pay`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${patient1Token}`,
    },
    body: JSON.stringify({
      invoiceId: newBill._id,
      amount: 800,
      paymentMethod: "KHALTI",
    }),
  });
  const partialPayData = await partialPayRes.json();
  assert(partialPayRes.status === 200, "Partial payment of 800 processed successfully");
  assert(partialPayData.data.invoice.paymentStatus === "PARTIALLY_PAID", "Invoice marked PARTIALLY_PAID");
  assert(partialPayData.data.invoice.balanceDue === 1200, "Invoice balanceDue accurately recalculated to 1200");

  // 9. Refund workflow: Admin refunds the first full payment
  console.log("\n--- Testing Refund Workflow ---");
  const refundRes = await fetch(`${BASE_URL}/payments/${testTxnId}/refund`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${adminToken}`,
    },
    body: JSON.stringify({
      reason: "Patient requested refund test",
    }),
  });
  const refundData = await refundRes.json();
  assert(refundRes.status === 200, "Admin successfully refunded payment (Status 200)");
  assert(refundData.data.transaction.status === "REFUNDED", "Transaction marked REFUNDED");
  assert(refundData.data.invoice.amountPaid === 0, "Invoice amountPaid recalculated to 0");
  assert(refundData.data.invoice.balanceDue === refundData.data.invoice.totalAmount, "Invoice balanceDue restored to full total");

  // 10. Attempt to refund same payment again -> MUST FAIL (400)
  const doubleRefundRes = await fetch(`${BASE_URL}/payments/${testTxnId}/refund`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${adminToken}`,
    },
    body: JSON.stringify({ reason: "Repeat refund" }),
  });
  assert(doubleRefundRes.status === 400, "Double refund rejected with Status 400");

  // 11. Patient cannot refund (Admin only)
  const patientRefundRes = await fetch(`${BASE_URL}/payments/${testTxnId}/refund`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${patient1Token}`,
    },
    body: JSON.stringify({ reason: "Unauthorized refund" }),
  });
  assert(patientRefundRes.status === 403, "Non-admin user cannot refund payments (Status 403)");

  // 12. Admin Billing Dashboard Statistics
  console.log("\n--- Testing Admin Billing Statistics Dashboard ---");
  const statsRes = await fetch(`${BASE_URL}/billing/stats/dashboard`, {
    headers: { Authorization: `Bearer ${adminToken}` },
  });
  const statsData = await statsRes.json();
  assert(statsRes.status === 200, "Admin can access billing dashboard stats (Status 200)");
  assert(typeof statsData.revenue.totalNet === "number", "Total net revenue is a number");
  assert(typeof statsData.invoices.total === "number", "Total invoices count returned");
  assert(Array.isArray(statsData.monthlyChartData) && statsData.monthlyChartData.length === 12, "12-month chart data provided");
  assert(statsData.methodStats.ESEWA !== undefined, "Method stats includes ESEWA");

  // 13. Regular patient cannot access admin stats -> MUST FAIL (403)
  const patientStatsRes = await fetch(`${BASE_URL}/billing/stats/dashboard`, {
    headers: { Authorization: `Bearer ${patient1Token}` },
  });
  assert(patientStatsRes.status === 403, "Patient cannot access admin billing stats (Status 403)");

  // 14. Audit logs verification
  console.log("\n--- Testing Audit Logs ---");
  const auditRes = await fetch(`${BASE_URL}/billing/audit-logs`, {
    headers: { Authorization: `Bearer ${adminToken}` },
  });
  const auditLogs = await auditRes.json();
  assert(auditRes.status === 200, "Admin can retrieve audit logs");
  assert(Array.isArray(auditLogs) && auditLogs.length > 0, "Audit logs contain recorded events");
  const actions = auditLogs.map((l) => l.action);
  assert(actions.includes("INVOICE_CREATED"), "Audit logs recorded INVOICE_CREATED");
  assert(actions.includes("PAYMENT_PROCESSED"), "Audit logs recorded PAYMENT_PROCESSED");
  assert(actions.includes("PAYMENT_REFUNDED"), "Audit logs recorded PAYMENT_REFUNDED");

  // 15. API Docs endpoint test
  console.log("\n--- Testing API Documentation Endpoints ---");
  const docsRes = await fetch(`${BASE_URL}/docs`);
  assert(docsRes.status === 200, "Swagger/OpenAPI HTML documentation loads (Status 200)");
  const specRes = await fetch(`${BASE_URL}/docs/spec`);
  const specData = await specRes.json();
  assert(specRes.status === 200 && specData.openapi === "3.0.0", "OpenAPI spec JSON is valid (Status 200)");

  // Clean up test documents
  await Appointment.deleteMany({ patient: { $in: [patient1._id, patient2._id] } });
  await Invoice.deleteMany({ patient: { $in: [patient1._id, patient2._id] } });
  await Payment.deleteMany({ patient: { $in: [patient1._id, patient2._id] } });

  server.close();
  await mongoose.disconnect();

  console.log(`\n========================================`);
  console.log(` ALL ${testsPassed} / ${testsTotal} TESTS PASSED!`);
  console.log(`========================================\n`);
  process.exit(0);
}

runTests().catch((err) => {
  console.error("Test execution error:", err);
  process.exit(1);
});
