const dns = require("dns");
try {
  dns.setServers(["1.1.1.1", "8.8.8.8"]);
} catch (e) {}

require("dotenv").config();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const doctorRoutes = require("./routes/doctorRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const newsRoutes = require("./routes/newsRoutes");
const billingRoutes = require("./routes/billingRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const departmentRoutes = require("./routes/departmentRoutes");
const labRoutes = require("./routes/labRoutes");
const pharmacyRoutes = require("./routes/pharmacyRoutes");
const prescriptionRoutes = require("./routes/prescriptionRoutes");
const patientRoutes = require("./routes/patientRoutes");
const admissionRoutes = require("./routes/admissionRoutes");
const staffRoutes = require("./routes/staffRoutes");
const reportRoutes = require("./routes/reportRoutes");
const emergencyRoutes = require("./routes/emergencyRoutes");
const docsRoutes = require("./routes/docsRoutes");

const User = require("./models/userModel");
const Doctor = require("./models/doctorModel");
const Department = require("./models/departmentModel");
const LabTest = require("./models/labTestModel");
const LabOrder = require("./models/labOrderModel");
const Medicine = require("./models/medicineModel");
const Prescription = require("./models/prescriptionModel");
const Ward = require("./models/wardModel");
const Bed = require("./models/bedModel");
const Admission = require("./models/admissionModel");
const Staff = require("./models/staffModel");
const EmergencyCase = require("./models/emergencyModel");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/billing", billingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/lab", labRoutes);
app.use("/api/pharmacy", pharmacyRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/admissions", admissionRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/emergency", emergencyRoutes);
app.use("/api/docs", docsRoutes);

async function runAllTests() {
  console.log("=== STARTING FULL HOSPITAL SUITE TESTS ===");

  await mongoose.connect(process.env.MONGO_URI);
  console.log("✔ Connected to MongoDB");

  const server = app.listen(5098);
  const BASE_URL = "http://localhost:5098/api";

  // Helper fetch function
  async function request(path, options = {}) {
    const res = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = text;
    }
    return { status: res.status, data };
  }

  // Set up Admin & Patient users
  let admin = await User.findOne({ role: "admin" });
  if (!admin) {
    admin = await User.create({
      name: "Super Admin",
      email: "hospital_admin_test@test.com",
      password: "password123",
      role: "admin",
    });
  }
  const adminToken = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
  const adminAuth = { Authorization: `Bearer ${adminToken}` };

  let patient = await User.findOne({ email: "hospital_patient_test@test.com" });
  if (!patient) {
    patient = await User.create({
      name: "Aakash Shrestha",
      email: "hospital_patient_test@test.com",
      password: "password123",
      role: "patient",
      phone: "9841234567",
    });
  }
  const patientToken = jwt.sign({ id: patient._id }, process.env.JWT_SECRET);
  const patientAuth = { Authorization: `Bearer ${patientToken}` };

  let doctor = await Doctor.findOne();
  if (!doctor) {
    doctor = await Doctor.create({
      name: "Dr. Ramesh Adhikari",
      specialization: "Cardiology",
      consultationFee: 1200,
    });
  }

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  [PASS] ${message}`);
      passed++;
    } else {
      console.error(`  [FAIL] ${message}`);
      failed++;
    }
  }

  try {
    // ----------------------------------------------------
    // TEST 1: Department Management
    // ----------------------------------------------------
    console.log("\n--- Testing Department Management ---");
    const deptRes = await request("/departments", {
      method: "POST",
      headers: adminAuth,
      body: {
        name: `Cardiology Department ${Date.now()}`,
        description: "Comprehensive heart care and catheterization lab",
        location: "Block C, 3rd Floor",
      },
    });
    assert(deptRes.status === 201 && deptRes.data._id, "Create Department");
    const createdDeptId = deptRes.data._id;

    const assignDocRes = await request(`/departments/${createdDeptId}/assign-doctor`, {
      method: "POST",
      headers: adminAuth,
      body: { doctorId: doctor._id },
    });
    assert(assignDocRes.status === 200, "Assign Doctor to Department");

    const deptDocsRes = await request(`/departments/${createdDeptId}/doctors`);
    assert(deptDocsRes.status === 200 && deptDocsRes.data.length > 0, "Get Doctors by Department");

    const filterDocsRes = await request(`/doctors?department=${createdDeptId}`);
    assert(filterDocsRes.status === 200 && filterDocsRes.data.length > 0, "Filter Doctors by Department Query");

    // ----------------------------------------------------
    // TEST 2: Laboratory Management
    // ----------------------------------------------------
    console.log("\n--- Testing Laboratory Management ---");
    const labTestRes = await request("/lab/tests", {
      method: "POST",
      headers: adminAuth,
      body: {
        name: `Lipid Panel Test ${Date.now()}`,
        category: "Biochemistry",
        price: 850,
        sampleType: "Blood",
        normalRange: "Cholesterol < 200 mg/dL",
      },
    });
    assert(labTestRes.status === 201 && labTestRes.data._id, "Create Catalog Lab Test");
    const createdLabTestId = labTestRes.data._id;

    const labOrderRes = await request("/lab/orders", {
      method: "POST",
      headers: adminAuth,
      body: {
        patient: patient._id,
        doctor: doctor._id,
        labTestId: createdLabTestId,
        notes: "Routine lipid profile",
      },
    });
    assert(labOrderRes.status === 201 && labOrderRes.data.status === "Pending", "Assign Lab Test to Patient (Pending)");
    const createdLabOrderId = labOrderRes.data._id;

    // Patient views their own lab orders
    const patientLabRes = await request("/lab/orders/my", {
      headers: patientAuth,
    });
    assert(patientLabRes.status === 200 && patientLabRes.data.length > 0, "Patient can view their results");

    // Enter lab results
    const updateResultRes = await request(`/lab/orders/${createdLabOrderId}/result`, {
      method: "PUT",
      headers: adminAuth,
      body: {
        results: "Total Cholesterol: 185 mg/dL, HDL: 45 mg/dL, LDL: 110 mg/dL",
        remarks: "Optimal profile",
      },
    });
    assert(
      updateResultRes.status === 200 && updateResultRes.data.status === "Completed" && updateResultRes.data.results,
      "Doctor/Lab tech entered results -> Status Completed"
    );

    // ----------------------------------------------------
    // TEST 3: Pharmacy Management & Prescriptions
    // ----------------------------------------------------
    console.log("\n--- Testing Pharmacy & Prescriptions ---");
    const medRes = await request("/pharmacy/medicines", {
      method: "POST",
      headers: adminAuth,
      body: {
        name: `Atorvastatin 10mg ${Date.now()}`,
        category: "Tablet",
        price: 25,
        quantity: 50,
        minStockLevel: 10,
        expiryDate: "2027-12-31",
      },
    });
    assert(medRes.status === 201 && medRes.data._id, "Create Medicine");
    const createdMedId = medRes.data._id;

    // Low stock medicine
    const lowStockMedRes = await request("/pharmacy/medicines", {
      method: "POST",
      headers: adminAuth,
      body: {
        name: `Insulin Syringe ${Date.now()}`,
        category: "Other",
        price: 40,
        quantity: 5,
        minStockLevel: 10,
        expiryDate: "2027-06-30",
      },
    });
    assert(lowStockMedRes.status === 201, "Create Low-Stock Medicine");

    const lowStockList = await request("/pharmacy/medicines/low-stock", {
      headers: adminAuth,
    });
    assert(lowStockList.status === 200 && lowStockList.data.count > 0, "Low-stock indication retrieved");

    // Create prescription connecting patient, doctor, and medicine
    const prescriptionRes = await request("/prescriptions", {
      method: "POST",
      headers: adminAuth,
      body: {
        patient: patient._id,
        doctor: doctor._id,
        diagnosis: "Dyslipidemia",
        medicines: [
          {
            medicine: createdMedId,
            dosage: "10mg",
            frequency: "Once daily at night",
            duration: "10 days",
            quantity: 10,
          },
        ],
        notes: "Take after dinner",
      },
    });
    assert(prescriptionRes.status === 201 && prescriptionRes.data._id, "Create Prescription with Medicines");
    const createdPrescriptionId = prescriptionRes.data._id;

    // Patient views their own prescriptions
    const patientPrescRes = await request("/prescriptions/my", {
      headers: patientAuth,
    });
    assert(patientPrescRes.status === 200 && patientPrescRes.data.length > 0, "Patient views their prescriptions");

    // Dispense prescription -> Reduce stock from 50 to 40
    const dispenseRes = await request(`/prescriptions/${createdPrescriptionId}/dispense`, {
      method: "POST",
      headers: adminAuth,
    });
    assert(dispenseRes.status === 200 && dispenseRes.data.prescription.status === "Dispensed", "Dispense Prescription");

    const medAfterDispense = await request(`/pharmacy/medicines/${createdMedId}`);
    assert(medAfterDispense.status === 200 && medAfterDispense.data.quantity === 40, "Medicine stock reduced by 10 (50 -> 40)");

    // ----------------------------------------------------
    // TEST 4: Patient Management & EHR
    // ----------------------------------------------------
    console.log("\n--- Testing Patient Management & EHR ---");
    const updatePatientRes = await request("/patients/me", {
      method: "PUT",
      headers: patientAuth,
      body: {
        bloodGroup: "O+",
        gender: "Male",
        age: 28,
        address: "Pulchowk, Lalitpur",
        allergies: ["Penicillin", "Dust"],
        emergencyContact: {
          name: "Suman Shrestha",
          phone: "9841112233",
          relation: "Brother",
        },
      },
    });
    assert(
      updatePatientRes.status === 200 && updatePatientRes.data.bloodGroup === "O+" && updatePatientRes.data.allergies.length === 2,
      "Patient profile updated with blood group, allergies, emergency contact"
    );

    // Full EHR record aggregation
    const fullEhrRes = await request(`/patients/${patient._id}/full-record`, {
      headers: patientAuth,
    });
    assert(
      fullEhrRes.status === 200 &&
      fullEhrRes.data.patient &&
      fullEhrRes.data.summary &&
      Array.isArray(fullEhrRes.data.prescriptions) &&
      Array.isArray(fullEhrRes.data.labOrders),
      "Consolidated Patient EHR record retrieved (personal info, medical history, allergies, prescriptions, lab, bills)"
    );

    // ----------------------------------------------------
    // TEST 5: Admission & Bed Management
    // ----------------------------------------------------
    console.log("\n--- Testing Admission & Bed Management ---");
    const wardRes = await request("/admissions/wards", {
      method: "POST",
      headers: adminAuth,
      body: {
        name: `Surgical Ward ${Date.now()}`,
        wardType: "General",
        floor: "2nd Floor",
        capacity: 5,
        dailyRate: 600,
      },
    });
    assert(wardRes.status === 201 && wardRes.data._id, "Create Ward");
    const createdWardId = wardRes.data._id;

    const bedRes = await request("/admissions/beds", {
      method: "POST",
      headers: adminAuth,
      body: {
        bedNumber: `BED-${Date.now().toString().slice(-4)}`,
        wardId: createdWardId,
      },
    });
    assert(bedRes.status === 201 && bedRes.data.status === "Available", "Create Bed (Available)");
    const createdBedId = bedRes.data._id;

    // Patient admission
    const admitRes = await request("/admissions", {
      method: "POST",
      headers: adminAuth,
      body: {
        patient: patient._id,
        doctor: doctor._id,
        wardId: createdWardId,
        bedId: createdBedId,
        reason: "Observation following acute symptoms",
      },
    });
    assert(admitRes.status === 201 && admitRes.data.status === "Admitted", "Admit Patient");
    const createdAdmissionId = admitRes.data._id;

    // Verify bed is now Occupied
    const bedCheck = await request(`/admissions/beds/${createdBedId}`, {
      headers: adminAuth,
    });
    assert(bedCheck.status === 200 && bedCheck.data.status === "Occupied", "Bed status changed to Occupied");

    // Discharge patient
    const dischargeRes = await request(`/admissions/${createdAdmissionId}/discharge`, {
      method: "PUT",
      headers: adminAuth,
      body: {
        dischargeSummary: "Patient vitals stable and discharged with medication instructions",
      },
    });
    assert(dischargeRes.status === 200 && dischargeRes.data.admission.status === "Discharged", "Patient Discharged");

    // Verify bed is now Available again
    const bedCheckAfterDischarge = await request(`/admissions/beds/${createdBedId}`, {
      headers: adminAuth,
    });
    assert(
      bedCheckAfterDischarge.status === 200 && bedCheckAfterDischarge.data.status === "Available",
      "Bed status returned to Available upon discharge"
    );

    // ----------------------------------------------------
    // TEST 6: Staff Management
    // ----------------------------------------------------
    console.log("\n--- Testing Staff Management ---");
    const rolesRes = await request("/staff/roles", {
      headers: adminAuth,
    });
    assert(rolesRes.status === 200 && rolesRes.data.roles.length === 4, "Get Staff Roles (Nurse, Receptionist, Pharmacist, Lab Technician)");

    const staffRes = await request("/staff", {
      method: "POST",
      headers: adminAuth,
      body: {
        name: "Sunita Thapa",
        email: `sunita.nurse.${Date.now()}@hospital.com`,
        password: "NursePassword123!",
        phone: "9811223344",
        role: "nurse",
        department: createdDeptId,
        shift: "Morning",
      },
    });
    assert(staffRes.status === 201 && staffRes.data.role === "nurse", "Add Staff Member (Nurse with User account)");
    const createdStaffId = staffRes.data._id;

    const editStaffRes = await request(`/staff/${createdStaffId}`, {
      method: "PUT",
      headers: adminAuth,
      body: {
        shift: "Evening",
        phone: "9811223355",
      },
    });
    assert(editStaffRes.status === 200 && editStaffRes.data.shift === "Evening", "Edit Staff Member");

    // ----------------------------------------------------
    // TEST 7: Emergency Management
    // ----------------------------------------------------
    console.log("\n--- Testing Emergency Management ---");
    const emgRes = await request("/emergency", {
      method: "POST",
      headers: adminAuth,
      body: {
        patientName: "Bishal Gurung",
        age: 34,
        gender: "Male",
        contactNumber: "9801234567",
        priority: "Critical",
        triageNotes: "High fever 104F, severe dehydration",
        vitals: { bp: "95/60", pulse: "115", temp: "104 F", spO2: "96%" },
        assignedDoctor: doctor._id,
      },
    });
    assert(emgRes.status === 201 && emgRes.data.caseNumber && emgRes.data.priority === "Critical", "Register Emergency Case");
    const createdEmgId = emgRes.data._id;

    // Emergency admission directly to bed
    const emgAdmitRes = await request(`/emergency/${createdEmgId}/admit`, {
      method: "POST",
      headers: adminAuth,
      body: {
        wardId: createdWardId,
        bedId: createdBedId,
        doctorId: doctor._id,
        reason: "Severe dehydration and hyperpyrexia",
      },
    });
    assert(emgAdmitRes.status === 200 && emgAdmitRes.data.emergencyCase.treatmentStatus === "Admitted", "Emergency Patient Admitted to Bed");

    // Discharge emergency
    const emgDischargeRes = await request(`/emergency/${createdEmgId}/discharge`, {
      method: "PUT",
      headers: adminAuth,
    });
    assert(emgDischargeRes.status === 200 && emgDischargeRes.data.emergencyCase.treatmentStatus === "Discharged", "Emergency Patient Discharged");

    // ----------------------------------------------------
    // TEST 8: Reports & Dashboard
    // ----------------------------------------------------
    console.log("\n--- Testing Reports & Dashboard ---");
    const dashboardRes = await request("/reports/dashboard", {
      headers: adminAuth,
    });
    assert(
      dashboardRes.status === 200 &&
      dashboardRes.data.summary &&
      dashboardRes.data.summary.totalPatients >= 1 &&
      dashboardRes.data.summary.totalDoctors >= 1 &&
      dashboardRes.data.appointments &&
      dashboardRes.data.admissions &&
      dashboardRes.data.beds &&
      dashboardRes.data.laboratory &&
      dashboardRes.data.pharmacy &&
      dashboardRes.data.charts,
      "Admin Dashboard Statistics & Charts generated successfully"
    );

    // ----------------------------------------------------
    // TEST 9: Existing Core Systems Check (Doctors, Appointments, Docs)
    // ----------------------------------------------------
    console.log("\n--- Testing Existing Features Integrity ---");
    const docsRes = await request("/doctors");
    assert(docsRes.status === 200 && Array.isArray(docsRes.data), "Existing Doctors API works");

    const apiDocsHtml = await request("/docs");
    assert(apiDocsHtml.status === 200, "API Documentation endpoint /docs works");

    const apiDocsSpec = await request("/docs/spec");
    assert(apiDocsSpec.status === 200 && apiDocsSpec.data.endpoints.length >= 8, "OpenAPI documentation /docs/spec works with all modules");

    console.log(`\n========================================`);
    console.log(`TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
    console.log(`========================================`);

  } catch (err) {
    console.error("Test execution error:", err);
  } finally {
    server.close();
    await mongoose.disconnect();
    process.exit(failed > 0 ? 1 : 0);
  }
}

runAllTests();
