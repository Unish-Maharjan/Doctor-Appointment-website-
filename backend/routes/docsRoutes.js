const express = require("express");
const router = express.Router();

const apiDocumentation = {
  openapi: "3.0.0",
  info: {
    title: "Meddical Hospital Management System API",
    version: "2.0.0",
    description:
      "Comprehensive Hospital Management System REST API specification with Laboratory, Pharmacy, Prescriptions, Departments, Patient EHR, Bed Admission, Staff Management, Emergency, Reports, and Billing/Payments.",
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "Local development server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  endpoints: [
    {
      group: "1. Laboratory Management",
      items: [
        {
          method: "GET",
          path: "/api/lab/tests",
          auth: "Public",
          summary: "List all available catalog lab tests (optional query: category, search)",
        },
        {
          method: "POST",
          path: "/api/lab/tests",
          auth: "Admin / Lab Technician",
          summary: "Create a new catalog lab test",
          requestBody: {
            name: "Complete Blood Count (CBC)",
            category: "Hematology",
            price: 650,
            sampleType: "Blood",
            normalRange: "WBC: 4,000-11,000 /uL",
            turnaroundTime: "12 hours",
          },
        },
        {
          method: "POST",
          path: "/api/lab/orders",
          auth: "Admin / Doctor / Lab Technician",
          summary: "Assign lab test to patient",
          requestBody: {
            patient: "User ObjectId",
            doctor: "Doctor ObjectId (optional)",
            labTestId: "LabTest ObjectId",
            notes: "Fasting sample required",
          },
        },
        {
          method: "GET",
          path: "/api/lab/orders/my",
          auth: "Patient",
          summary: "Patient views their own assigned lab orders and test results",
        },
        {
          method: "GET",
          path: "/api/lab/orders",
          auth: "Admin / Doctor / Staff",
          summary: "Get all lab orders with status/patient filtering",
        },
        {
          method: "PUT",
          path: "/api/lab/orders/:id/result",
          auth: "Admin / Lab Technician / Doctor",
          summary: "Enter test findings/results and mark order as Completed",
          requestBody: {
            results: "WBC: 7,500 /uL, RBC: 4.8 million/uL, Hemoglobin: 14.2 g/dL",
            normalRange: "Normal values",
            remarks: "Within healthy range",
          },
        },
      ],
    },
    {
      group: "2. Pharmacy & Medicines",
      items: [
        {
          method: "GET",
          path: "/api/pharmacy/medicines",
          auth: "Public / Authenticated",
          summary: "List medicines (search, category, lowStock=true filters)",
        },
        {
          method: "POST",
          path: "/api/pharmacy/medicines",
          auth: "Admin / Pharmacist",
          summary: "Add new medicine to pharmacy inventory",
          requestBody: {
            name: "Amoxicillin 500mg",
            genericName: "Amoxicillin",
            category: "Capsule",
            price: 15,
            quantity: 200,
            minStockLevel: 25,
            expiryDate: "2027-12-31",
            manufacturer: "HealthPharma",
          },
        },
        {
          method: "GET",
          path: "/api/pharmacy/medicines/low-stock",
          auth: "Admin / Pharmacist",
          summary: "Get list of low-stock medicines needing replenishment",
        },
        {
          method: "PUT",
          path: "/api/pharmacy/medicines/:id/adjust-stock",
          auth: "Admin / Pharmacist",
          summary: "Adjust medicine stock quantity directly (+/- units)",
          requestBody: {
            changeQuantity: 50,
          },
        },
      ],
    },
    {
      group: "3. Prescriptions & Dispensing",
      items: [
        {
          method: "POST",
          path: "/api/prescriptions",
          auth: "Admin / Doctor",
          summary: "Create doctor prescription linked with pharmacy medicines",
          requestBody: {
            patient: "User ObjectId",
            doctor: "Doctor ObjectId",
            diagnosis: "Bacterial respiratory infection",
            medicines: [
              {
                medicine: "Medicine ObjectId",
                dosage: "500mg",
                frequency: "3 times daily",
                duration: "7 days",
                quantity: 21,
              },
            ],
            notes: "Drink plenty of water",
          },
        },
        {
          method: "GET",
          path: "/api/prescriptions/my",
          auth: "Patient",
          summary: "Patient views their active and past prescriptions",
        },
        {
          method: "GET",
          path: "/api/prescriptions",
          auth: "Admin / Doctor / Pharmacist",
          summary: "List all prescriptions across hospital",
        },
        {
          method: "POST",
          path: "/api/prescriptions/:id/dispense",
          auth: "Admin / Pharmacist",
          summary: "Dispense prescription and automatically deduct stock from pharmacy inventory",
        },
      ],
    },
    {
      group: "4. Department Management",
      items: [
        {
          method: "GET",
          path: "/api/departments",
          auth: "Public",
          summary: "List all hospital departments with doctor count",
        },
        {
          method: "POST",
          path: "/api/departments",
          auth: "Admin",
          summary: "Create new hospital department",
          requestBody: {
            name: "Cardiology",
            description: "Heart and cardiovascular care center",
            location: "Building B, 2nd Floor",
            contactNumber: "01-4455667",
          },
        },
        {
          method: "GET",
          path: "/api/departments/:id/doctors",
          auth: "Public",
          summary: "Get all doctors belonging to a specific department",
        },
        {
          method: "POST",
          path: "/api/departments/:id/assign-doctor",
          auth: "Admin",
          summary: "Assign doctor to department",
          requestBody: {
            doctorId: "Doctor ObjectId",
          },
        },
      ],
    },
    {
      group: "5. Patient Management & EHR",
      items: [
        {
          method: "GET",
          path: "/api/patients/me",
          auth: "Patient",
          summary: "Get currently logged-in patient's medical profile",
        },
        {
          method: "PUT",
          path: "/api/patients/me",
          auth: "Patient",
          summary: "Update patient's personal details, address, allergies, emergency contact",
          requestBody: {
            bloodGroup: "O+",
            gender: "Male",
            age: 26,
            address: "Kathmandu, Nepal",
            allergies: ["Penicillin", "Pollen"],
            emergencyContact: {
              name: "Suman Maharjan",
              phone: "9841000000",
              relation: "Brother",
            },
          },
        },
        {
          method: "GET",
          path: "/api/patients/:id/full-record",
          auth: "Patient (Self) / Doctor / Admin / Staff",
          summary: "Complete consolidated Electronic Health Record (EHR) with medical history, appointments, prescriptions, lab results, bills and payments",
        },
      ],
    },
    {
      group: "6. Admission & Bed Management",
      items: [
        {
          method: "GET",
          path: "/api/admissions/wards",
          auth: "Public",
          summary: "Get all wards with real-time bed capacity and availability counts",
        },
        {
          method: "POST",
          path: "/api/admissions/wards",
          auth: "Admin",
          summary: "Create hospital ward",
          requestBody: {
            name: "ICU Unit A",
            wardType: "ICU",
            floor: "3rd Floor",
            capacity: 8,
            dailyRate: 3500,
          },
        },
        {
          method: "POST",
          path: "/api/admissions/beds",
          auth: "Admin",
          summary: "Add bed to a ward",
          requestBody: {
            bedNumber: "ICU-01",
            wardId: "Ward ObjectId",
            dailyRate: 3500,
          },
        },
        {
          method: "POST",
          path: "/api/admissions",
          auth: "Admin / Doctor / Nurse",
          summary: "Admit patient, assign ward & bed, automatically marks bed as Occupied",
          requestBody: {
            patient: "User ObjectId",
            doctor: "Doctor ObjectId",
            wardId: "Ward ObjectId",
            bedId: "Bed ObjectId",
            reason: "Post-operative monitoring",
          },
        },
        {
          method: "PUT",
          path: "/api/admissions/:id/discharge",
          auth: "Admin / Doctor / Nurse",
          summary: "Discharge patient, records discharge summary, and frees bed to Available",
          requestBody: {
            dischargeSummary: "Patient recovered well and is stable for home care",
          },
        },
      ],
    },
    {
      group: "7. Staff Management",
      items: [
        {
          method: "GET",
          path: "/api/staff/roles",
          auth: "Admin",
          summary: "Get list of supported staff roles (Nurse, Receptionist, Pharmacist, Lab Technician)",
        },
        {
          method: "POST",
          path: "/api/staff",
          auth: "Admin",
          summary: "Register new hospital staff member with login credentials and department assignment",
          requestBody: {
            name: "Kiran Sharma",
            email: "kiran.nurse@hospital.com",
            password: "StaffPassword123!",
            phone: "9812345678",
            role: "nurse",
            department: "Department ObjectId (optional)",
            qualification: "B.Sc. Nursing",
            shift: "Morning",
          },
        },
        {
          method: "GET",
          path: "/api/staff",
          auth: "Admin",
          summary: "List all staff members with filter by role, department, shift, status",
        },
        {
          method: "PUT",
          path: "/api/staff/:id",
          auth: "Admin",
          summary: "Edit staff details, role, department or shift",
        },
        {
          method: "DELETE",
          path: "/api/staff/:id",
          auth: "Admin",
          summary: "Remove staff member and revoke access",
        },
      ],
    },
    {
      group: "8. Emergency Management",
      items: [
        {
          method: "POST",
          path: "/api/emergency",
          auth: "Admin / Doctor / Nurse / Receptionist",
          summary: "Register emergency patient with priority level, triage notes, and vitals",
          requestBody: {
            patientName: "John Doe",
            age: 45,
            gender: "Male",
            contactNumber: "9800000000",
            priority: "Critical",
            triageNotes: "Chest pain radiating to left arm, sweating",
            vitals: {
              bp: "150/95",
              pulse: "110",
              temp: "98.6 F",
              spO2: "94%",
            },
          },
        },
        {
          method: "GET",
          path: "/api/emergency",
          auth: "Admin / Doctor / Nurse",
          summary: "List active emergency cases sorted by arrival and priority",
        },
        {
          method: "POST",
          path: "/api/emergency/:id/admit",
          auth: "Admin / Doctor / Nurse",
          summary: "Emergency admission: admits emergency case directly into ward & bed",
          requestBody: {
            wardId: "Ward ObjectId",
            bedId: "Bed ObjectId",
            doctorId: "Doctor ObjectId",
          },
        },
        {
          method: "PUT",
          path: "/api/emergency/:id/discharge",
          auth: "Admin / Doctor / Nurse",
          summary: "Discharge emergency patient after stabilization",
        },
      ],
    },
    {
      group: "9. Reports & Dashboard Statistics",
      items: [
        {
          method: "GET",
          path: "/api/reports/dashboard",
          auth: "Admin",
          summary: "Complete hospital analytics: patients, doctors, appointments, revenue, admissions, bed occupancy, lab tests, pharmacy inventory, and chart datasets",
        },
      ],
    },
    {
      group: "10. Billing, Invoices & Payments",
      items: [
        {
          method: "POST",
          path: "/api/billing",
          auth: "Admin",
          summary: "Create hospital invoice manually",
        },
        {
          method: "GET",
          path: "/api/billing/my",
          auth: "Patient",
          summary: "Get all invoices belonging to authenticated patient",
        },
        {
          method: "POST",
          path: "/api/payments/pay",
          auth: "Patient / Admin",
          summary: "Process demo payment for an invoice (eSewa / Khalti / Card / Cash)",
        },
      ],
    },
  ],
};

router.get("/spec", (req, res) => {
  res.status(200).json(apiDocumentation);
});

router.get("/", (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Meddical - Hospital Management API Documentation</title>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Plus Jakarta Sans', sans-serif; background: #0c1222; color: #e2e8f0; line-height: 1.6; padding: 40px 20px; }
    .container { max-width: 1100px; margin: 0 auto; }
    .header { text-align: center; margin-bottom: 40px; }
    .badge { display: inline-block; padding: 6px 14px; background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.3); color: #38bdf8; border-radius: 9999px; font-size: 13px; font-weight: 600; margin-bottom: 16px; }
    h1 { font-size: 32px; font-weight: 800; color: #ffffff; margin-bottom: 8px; }
    p.lead { color: #94a3b8; font-size: 16px; max-width: 700px; margin: 0 auto; }
    .section-title { font-size: 20px; font-weight: 700; color: #38bdf8; margin: 36px 0 16px; border-left: 4px solid #38bdf8; padding-left: 12px; }
    .card { background: #162036; border: 1px solid #1e293b; border-radius: 12px; margin-bottom: 14px; overflow: hidden; }
    .card-header { padding: 16px 20px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; background: rgba(255, 255, 255, 0.02); }
    .method-tag { font-family: 'JetBrains Mono', monospace; font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 6px; }
    .method-POST { background: #059669; color: #fff; }
    .method-GET { background: #0284c7; color: #fff; }
    .method-PUT { background: #d97706; color: #fff; }
    .method-DELETE { background: #dc2626; color: #fff; }
    .path { font-family: 'JetBrains Mono', monospace; font-size: 14px; font-weight: 600; color: #f1f5f9; }
    .auth-badge { font-size: 11px; padding: 3px 8px; border-radius: 4px; background: #334155; color: #cbd5e1; }
    .card-body { padding: 16px 20px; border-top: 1px solid #1e293b; font-size: 14px; color: #94a3b8; }
    pre { background: #0a0f1d; padding: 12px; border-radius: 8px; font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #38bdf8; overflow-x: auto; margin-top: 8px; border: 1px solid #1e293b; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <span class="badge">OpenAPI 3.0 REST Specification</span>
      <h1>Hospital Management System API</h1>
      <p class="lead">Complete documentation for Laboratory, Pharmacy, Prescriptions, Departments, Patient EHR, Bed Admission, Staff, Emergency, Reports, and Billing.</p>
    </div>

    ${apiDocumentation.endpoints
      .map(
        (grp) => `
      <h2 class="section-title">${grp.group}</h2>
      ${grp.items
        .map(
          (ep) => `
        <div class="card">
          <div class="card-header">
            <div style="display: flex; align-items: center; gap: 12px;">
              <span class="method-tag method-${ep.method}">${ep.method}</span>
              <span class="path">${ep.path}</span>
            </div>
            <span class="auth-badge">🔒 ${ep.auth}</span>
          </div>
          <div class="card-body">
            <p>${ep.summary}</p>
            ${ep.requestBody ? `<p style="margin-top: 10px; font-weight: 600; color: #cbd5e1;">Request Body Format:</p><pre>${JSON.stringify(ep.requestBody, null, 2)}</pre>` : ""}
            ${ep.response ? `<p style="margin-top: 10px; font-weight: 600; color: #cbd5e1;">Sample Response:</p><pre>${JSON.stringify(ep.response, null, 2)}</pre>` : ""}
          </div>
        </div>
      `
        )
        .join("")}
    `
      )
      .join("")}
  </div>
</body>
</html>`);
});

module.exports = router;
