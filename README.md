# Meddical — Hospital Management System with Integrated Billing & Payments

Meddical is a fullstack Hospital & Doctor Appointment Management System built with Node.js, Express, MongoDB (Mongoose), React 19, Redux Toolkit, and TailwindCSS. It features complete patient appointment booking, doctor management, hospital news, and an integrated, production-grade **Billing and Payment Module**.

---

## Architecture Overview

```
Patient 
  └── Books Appointment
        └── Appointment Created
              └── Automated Invoice Generation (Doctor consultation fee)
                    └── Patient views Invoice & Itemized Charges (/my-bills)
                          └── Demo Payment Processing (eSewa / Khalti / Card / Cash)
                                └── Transaction Recorded (TXN-YYYY-XXXXXX)
                                      └── Invoice Marked PAID (balanceDue = 0)
                                            └── Admin Monitors Revenue & Issues Refunds
```

### Database Models & Relationships

- **User**: Stores patient and admin profiles (`role: "patient" | "admin"`).
- **Doctor**: Medical personnel profiles, specialties, and `consultationFee` (default: Rs. 1000).
- **Appointment**: Links `patient` (User) and `doctor` (Doctor) with date, time, status, and reason.
- **Invoice**: 
  - `invoiceNumber`: Unique human-readable code (`INV-2026-000001`).
  - References `patient` (User), `appointment` (Appointment), `doctor` (Doctor).
  - Itemized `items`: `[ { serviceName, serviceType, description, quantity, unitPrice, total } ]`.
  - Supports hospital charges: Doctor Consultation, Follow-up, Lab Tests, Medicines, Procedures, Room Charges, Emergency, and Other Services.
  - Lifecycle `status`: `DRAFT` | `ISSUED` | `CANCELLED`.
  - Payment status: `UNPAID` | `PARTIALLY_PAID` | `PAID` | `REFUNDED`.
  - Calculated fields: `subtotal`, `discount`, `tax`, `totalAmount`, `amountPaid`, `balanceDue`.
- **Payment / Transaction**:
  - `transactionId`: Unique code (`TXN-2026-000001`).
  - Links to `invoice` (Invoice) and `patient` (User).
  - `amount`, `paymentMethod` (`CASH`, `CARD`, `ONLINE`, `ESEWA`, `KHALTI`, `BANK_TRANSFER`).
  - `status`: `PENDING` | `SUCCESS` | `FAILED` | `REFUNDED` | `CANCELLED`.
  - `paidAt`, `refundReason`, `refundedAt`, `refundedBy`.
- **AuditLog**:
  - Automatically records `INVOICE_CREATED`, `INVOICE_UPDATED`, `INVOICE_CANCELLED`, `PAYMENT_PROCESSED`, and `PAYMENT_REFUNDED` with timestamps, actor IDs, and sanitized metadata.
- **Counter**:
  - Atomic sequence generator ensuring collision-proof invoice numbers and transaction IDs.

---

## API Endpoints

### 1. Invoices & Billing (`/api/billing`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/billing` | Admin | Manually create hospital invoice with custom line items |
| `GET` | `/api/billing` | Admin | Get all invoices (supports filter by `status`, `paymentStatus`, `patient`, `search`) |
| `GET` | `/api/billing/my` | Patient | Get authenticated patient's invoices |
| `GET` | `/api/billing/:id` | Patient (Own) / Admin | Get invoice details and attached transaction history |
| `POST` | `/api/billing/generate-from-appointment/:appointmentId` | Patient (Own) / Admin | Generate or retrieve invoice from appointment (idempotent, prevents duplicates) |
| `GET` | `/api/billing/appointment/:appointmentId` | Patient (Own) / Admin | Get invoice associated with an appointment |
| `GET` | `/api/billing/patient/:patientId` | Patient (Self) / Admin | Get all invoices for a specific patient |
| `PUT` | `/api/billing/:id` | Admin | Update invoice items, discount, tax, or notes (recalculates totals) |
| `DELETE` | `/api/billing/:id` | Admin | Cancel an invoice (prohibited if payments are recorded) |
| `GET` | `/api/billing/stats/dashboard` | Admin | Financial metrics, annual revenue breakdown, payment channels |
| `GET` | `/api/billing/audit-logs` | Admin | Full audit log of billing and transaction events |

### 2. Payments & Transactions (`/api/payments`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/payments/pay` | Patient / Admin | Process safe demo payment for an invoice |
| `GET` | `/api/payments` | Admin | List all payment transactions |
| `GET` | `/api/payments/my` | Patient | List authenticated patient's payment transactions |
| `GET` | `/api/payments/:id` | Patient (Own) / Admin | Get transaction details by ID |
| `GET` | `/api/payments/invoice/:invoiceId` | Patient (Own) / Admin | Get all transactions recorded for an invoice |
| `POST` | `/api/payments/:id/refund` | Admin | Refund a successful transaction and recalculate invoice balance |

### 3. Laboratory Management (`/api/lab`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/lab/tests` | Public | List all catalog lab tests |
| `POST` | `/api/lab/tests` | Admin / Lab Tech | Add test to catalog (name, category, price, normal range) |
| `POST` | `/api/lab/orders` | Admin / Doctor / Staff | Assign lab test to patient |
| `GET` | `/api/lab/orders/my` | Patient | Patient views their own assigned lab tests and results |
| `GET` | `/api/lab/orders` | Admin / Doctor / Staff | View all lab orders |
| `PUT` | `/api/lab/orders/:id/result` | Admin / Lab Tech / Doctor | Enter lab findings and complete order |

### 4. Pharmacy Management (`/api/pharmacy` & `/api/prescriptions`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/pharmacy/medicines` | Public / Auth | List medicines (search, category, lowStock filter) |
| `POST` | `/api/pharmacy/medicines` | Admin / Pharmacist | Add medicine with price, stock, expiry date |
| `GET` | `/api/pharmacy/medicines/low-stock` | Admin / Pharmacist | Get low-stock medicines list |
| `PUT` | `/api/pharmacy/medicines/:id/adjust-stock`| Admin / Pharmacist | Increment/decrement medicine stock |
| `POST` | `/api/prescriptions` | Admin / Doctor | Create prescription linking medicines with dosage |
| `GET` | `/api/prescriptions/my` | Patient | Patient views their prescriptions |
| `POST` | `/api/prescriptions/:id/dispense` | Admin / Pharmacist | Dispense medicines and automatically deduct stock |

### 5. Department Management (`/api/departments`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/departments` | Public | List all departments with doctor counts |
| `POST` | `/api/departments` | Admin | Create department |
| `GET` | `/api/departments/:id/doctors` | Public | Get doctors in a specific department |
| `POST` | `/api/departments/:id/assign-doctor` | Admin | Assign doctor to department |
| `GET` | `/api/doctors?department=<id>` | Public | Filter doctors by department |

### 6. Patient Management & EHR (`/api/patients`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/patients/me` | Patient | Get authenticated patient's medical profile |
| `PUT` | `/api/patients/me` | Patient | Update personal info, blood group, allergies, contact |
| `GET` | `/api/patients/:id/full-record` | Patient (Self) / Staff | Consolidated EHR (history, appointments, prescriptions, labs, bills) |

### 7. Admission & Bed Management (`/api/admissions`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/admissions/wards` | Public | List wards with real-time bed capacity and availability |
| `POST` | `/api/admissions/wards` | Admin | Create ward |
| `POST` | `/api/admissions/beds` | Admin | Add bed to ward |
| `POST` | `/api/admissions` | Staff / Admin | Admit patient to bed (marks bed Occupied) |
| `PUT` | `/api/admissions/:id/discharge` | Staff / Admin | Discharge patient and free bed to Available |

### 8. Staff Management (`/api/staff`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/staff/roles` | Admin | Get list of staff roles (Nurse, Receptionist, Pharmacist, Lab Tech) |
| `POST` | `/api/staff` | Admin | Add staff with role, department, and login credentials |
| `GET` | `/api/staff` | Admin | List all staff members |
| `PUT` | `/api/staff/:id` | Admin | Edit staff member details, shift, or role |
| `DELETE` | `/api/staff/:id` | Admin | Remove staff member |

### 9. Emergency Management (`/api/emergency`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/emergency` | Staff / Admin | Register emergency case with priority (Critical, High, Moderate, Low) |
| `GET` | `/api/emergency` | Staff / Admin | List active emergency cases |
| `POST` | `/api/emergency/:id/admit` | Staff / Admin | Admit emergency patient directly to ward & bed |
| `PUT` | `/api/emergency/:id/discharge` | Staff / Admin | Discharge emergency patient |

### 10. Reports & Dashboard (`/api/reports`)

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/reports/dashboard` | Admin | Comprehensive analytics: patients, doctors, revenue, beds, labs, stock, and charts |

### 11. Interactive Documentation

- **HTML Interactive Documentation**: `GET http://localhost:5000/api/docs`
- **OpenAPI 3.0 JSON Specification**: `GET http://localhost:5000/api/docs/spec`

---

## Demonstration Payment Workflow

1. Patient logs in and visits **My Bills** (`/my-bills`) or books an appointment (`/appointment`).
2. An invoice is automatically generated with doctor consultation fees and status `UNPAID`.
3. Patient clicks **"Pay Now"** on the invoice card.
4. Patient selects payment method (**eSewa**, **Khalti**, **Card**, **Cash Desk**, or **Bank Wire**) and confirms amount.
5. The backend validates:
   - Invoice exists and belongs to the authenticated user.
   - Invoice is not cancelled or already fully paid.
   - Amount is strictly greater than 0 and does not exceed `balanceDue`.
6. Safe Demo transaction is saved to MongoDB with a unique ID (`TXN-2026-000001`).
7. Invoice `amountPaid` and `balanceDue` are updated atomically; status transitions to `PAID` (or `PARTIALLY_PAID`).
8. Patient receives immediate feedback, transaction receipt, and can print an official hospital receipt.
9. Admin can view the transaction on the **Billing & Revenue Dashboard** and issue refunds with one click.

---

## Example Requests & Responses

### 1. Process Payment

**Request:**
```http
POST /api/payments/pay
Authorization: Bearer <PATIENT_JWT_TOKEN>
Content-Type: application/json

{
  "invoiceId": "6a438b993e4a21c4fbd45e5c",
  "amount": 1000,
  "paymentMethod": "ESEWA",
  "notes": "Patient self-payment via eSewa (Demo)"
}
```

**Response (Status 200):**
```json
{
  "success": true,
  "message": "Payment processed successfully (Demo)",
  "data": {
    "transaction": {
      "_id": "6a8d115a319f074d284a1e90",
      "transactionId": "TXN-2026-000001",
      "invoice": "6a438b993e4a21c4fbd45e5c",
      "patient": "6a3e45cbcf5e3a5f3e099247",
      "amount": 1000,
      "paymentMethod": "ESEWA",
      "paymentGateway": "DEMO",
      "status": "SUCCESS",
      "currency": "NPR",
      "paidAt": "2026-10-07T09:20:00.000Z"
    },
    "invoice": {
      "_id": "6a438b993e4a21c4fbd45e5c",
      "invoiceNumber": "INV-2026-000001",
      "subtotal": 1000,
      "totalAmount": 1000,
      "amountPaid": 1000,
      "balanceDue": 0,
      "paymentStatus": "PAID",
      "status": "ISSUED"
    }
  }
}
```

### 2. Admin Revenue Statistics

**Request:**
```http
GET /api/billing/stats/dashboard
Authorization: Bearer <ADMIN_JWT_TOKEN>
```

**Response (Status 200):**
```json
{
  "revenue": {
    "totalNet": 15400,
    "totalGross": 16400,
    "refundedAmount": 1000,
    "today": 3500,
    "thisMonth": 15400
  },
  "invoices": {
    "total": 18,
    "paid": 14,
    "unpaid": 3,
    "partiallyPaid": 1,
    "cancelled": 0,
    "outstandingBalance": 2500
  },
  "payments": {
    "successfulCount": 16,
    "refundedCount": 1
  },
  "methodStats": {
    "ESEWA": { "count": 8, "total": 8000 },
    "KHALTI": { "count": 4, "total": 4000 },
    "ONLINE": { "count": 3, "total": 3400 },
    "CASH": { "count": 1, "total": 1000 }
  },
  "monthlyChartData": [
    { "month": "Jan", "revenue": 0, "transactions": 0 },
    { "month": "Oct", "revenue": 15400, "transactions": 16 }
  ]
}
```

---

## Test Credentials

| Role | Email | Password |
| :--- | :--- | :--- |
| **Admin** | `admin123@gmail.com` | `admin123` |
| **Patient** | `uniqueunish93@gmail.com` | *(Registered password)* |

---

## Running the Application Locally

### 1. Backend Setup

```bash
cd backend
npm install
npm run dev   # Runs on http://localhost:5000
```

To run the full 33-point hospital management module test suite:
```bash
node test_all_modules.js
```

To run the automated 44-point billing & payment verification test suite:
```bash
node test_billing_workflow.js
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev   # Runs on http://localhost:5173
```
