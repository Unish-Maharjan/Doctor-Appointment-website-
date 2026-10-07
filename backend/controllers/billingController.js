const Invoice = require("../models/invoiceModel");
const Appointment = require("../models/appointmentModel");
const Doctor = require("../models/doctorModel");
const Payment = require("../models/paymentModel");
const AuditLog = require("../models/auditLogModel");
const { generateInvoiceNumber } = require("../utils/sequenceGenerator");
const { recordAuditLog } = require("../utils/auditLogger");

// Helper to safely calculate item and invoice totals
function calculateInvoiceTotals(items = [], discount = 0, tax = 0) {
  const safeItems = items.map((item) => {
    const qty = Math.max(1, Number(item.quantity) || 1);
    const unitPrice = Math.max(0, Number(item.unitPrice) || 0);
    const total = Math.round(qty * unitPrice * 100) / 100;
    return {
      serviceName: item.serviceName || "Hospital Service",
      serviceType: item.serviceType || "consultation",
      description: item.description || "",
      quantity: qty,
      unitPrice,
      total,
    };
  });

  const subtotal = safeItems.reduce((acc, curr) => acc + curr.total, 0);
  const safeDiscount = Math.min(subtotal, Math.max(0, Number(discount) || 0));
  const safeTax = Math.max(0, Number(tax) || 0);
  const totalAmount = Math.max(0, Math.round((subtotal - safeDiscount + safeTax) * 100) / 100);

  return {
    items: safeItems,
    subtotal: Math.round(subtotal * 100) / 100,
    discount: Math.round(safeDiscount * 100) / 100,
    tax: Math.round(safeTax * 100) / 100,
    totalAmount,
  };
}

// 1. Create Invoice (Admin)
async function createInvoice(req, res) {
  try {
    const {
      patient,
      appointment,
      doctor,
      items,
      discount = 0,
      tax = 0,
      dueDate,
      notes = "",
      status = "ISSUED",
    } = req.body;

    if (!patient) {
      return res.status(400).json({ message: "Patient ID is required" });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "At least one billing item is required" });
    }

    const {
      items: processedItems,
      subtotal,
      discount: finalDiscount,
      tax: finalTax,
      totalAmount,
    } = calculateInvoiceTotals(items, discount, tax);

    const invoiceNumber = await generateInvoiceNumber();

    const invoice = new Invoice({
      invoiceNumber,
      patient,
      appointment: appointment || undefined,
      doctor: doctor || undefined,
      items: processedItems,
      subtotal,
      discount: finalDiscount,
      tax: finalTax,
      totalAmount,
      amountPaid: 0,
      balanceDue: totalAmount,
      status: status || "ISSUED",
      paymentStatus: "UNPAID",
      dueDate: dueDate ? new Date(dueDate) : undefined,
      notes,
      createdBy: req.user._id,
    });

    const savedInvoice = await invoice.save();

    await recordAuditLog({
      req,
      action: "INVOICE_CREATED",
      resource: "Invoice",
      resourceId: savedInvoice._id,
      details: {
        invoiceNumber: savedInvoice.invoiceNumber,
        totalAmount: savedInvoice.totalAmount,
        patient: savedInvoice.patient,
      },
    });

    const populated = await Invoice.findById(savedInvoice._id)
      .populate("patient", "name email phone")
      .populate("doctor", "name specialization")
      .populate("appointment", "date time reason");

    res.status(201).json(populated);
  } catch (error) {
    res.status(500).json({ message: "Failed to create invoice", error: error.message });
  }
}

// 2. Get All Invoices (Admin)
async function getAllInvoices(req, res) {
  try {
    const { status, paymentStatus, patient, search, startDate, endDate } = req.query;

    const query = {};

    if (status) query.status = status;
    if (paymentStatus) query.paymentStatus = paymentStatus;
    if (patient) query.patient = patient;

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        query.createdAt.$lte = end;
      }
    }

    if (search) {
      query.invoiceNumber = { $regex: search, $options: "i" };
    }

    const invoices = await Invoice.find(query)
      .populate("patient", "name email phone")
      .populate("doctor", "name specialization")
      .populate("appointment", "date time status reason")
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch invoices", error: error.message });
  }
}

// 3. Get My Invoices (Logged-in Patient)
async function getMyInvoices(req, res) {
  try {
    const invoices = await Invoice.find({ patient: req.user._id })
      .populate("doctor", "name specialization photo")
      .populate("appointment", "date time status reason")
      .sort({ createdAt: -1 });

    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch your invoices", error: error.message });
  }
}

// 4. Get Invoice By ID (Patient can access own; Admin can access any)
async function getInvoiceById(req, res) {
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate("patient", "name email phone")
      .populate("doctor", "name specialization photo")
      .populate("appointment", "date time status reason")
      .populate("createdBy", "name email");

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    const isOwner = invoice.patient && invoice.patient._id.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Access denied. You cannot view this invoice." });
    }

    // Also fetch all transactions attached to this invoice
    const transactions = await Payment.find({ invoice: invoice._id }).sort({ createdAt: -1 });

    res.status(200).json({
      ...invoice.toObject(),
      transactions,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch invoice", error: error.message });
  }
}

// 5. Get Invoices By Patient (Admin or self)
async function getInvoicesByPatient(req, res) {
  try {
    const { patientId } = req.params;

    if (req.user.role !== "admin" && req.user._id.toString() !== patientId) {
      return res.status(403).json({ message: "Access denied." });
    }

    const invoices = await Invoice.find({ patient: patientId })
      .populate("doctor", "name specialization")
      .populate("appointment", "date time")
      .sort({ createdAt: -1 });

    res.status(200).json(invoices);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch patient invoices", error: error.message });
  }
}

// 6. Get Invoice By Appointment
async function getInvoiceByAppointment(req, res) {
  try {
    const { appointmentId } = req.params;

    const invoice = await Invoice.findOne({ appointment: appointmentId })
      .populate("patient", "name email phone")
      .populate("doctor", "name specialization")
      .populate("appointment", "date time status reason");

    if (!invoice) {
      return res.status(404).json({ message: "No invoice found for this appointment" });
    }

    const isOwner = invoice.patient && invoice.patient._id.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Access denied." });
    }

    const transactions = await Payment.find({ invoice: invoice._id }).sort({ createdAt: -1 });

    res.status(200).json({
      ...invoice.toObject(),
      transactions,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch appointment invoice", error: error.message });
  }
}

// 7. Generate Invoice Automatically from Appointment
async function generateFromAppointment(req, res) {
  try {
    const { appointmentId } = req.params;

    const appointment = await Appointment.findById(appointmentId)
      .populate("doctor")
      .populate("patient");

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // Check ownership or admin
    const isOwner =
      appointment.patient && appointment.patient._id.toString() === req.user._id.toString();
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: "Not authorized to generate invoice for this appointment" });
    }

    // Check if invoice already exists for this appointment
    const existingInvoice = await Invoice.findOne({ appointment: appointment._id })
      .populate("patient", "name email phone")
      .populate("doctor", "name specialization")
      .populate("appointment", "date time status reason");

    if (existingInvoice) {
      return res.status(200).json({
        message: "Invoice already exists for this appointment",
        invoice: existingInvoice,
      });
    }

    // Determine consultation fee from doctor (default 1000)
    const consultationFee =
      appointment.doctor && appointment.doctor.consultationFee !== undefined
        ? appointment.doctor.consultationFee
        : 1000;

    const doctorName = appointment.doctor ? appointment.doctor.name : "Specialist";
    const doctorSpec = appointment.doctor ? appointment.doctor.specialization : "General";

    const items = [
      {
        serviceName: "Doctor Consultation",
        serviceType: "consultation",
        description: `Consultation with Dr. ${doctorName} (${doctorSpec}) on ${appointment.date} at ${appointment.time}`,
        quantity: 1,
        unitPrice: consultationFee,
        total: consultationFee,
      },
    ];

    const invoiceNumber = await generateInvoiceNumber();

    const newInvoice = new Invoice({
      invoiceNumber,
      patient: appointment.patient._id,
      appointment: appointment._id,
      doctor: appointment.doctor ? appointment.doctor._id : undefined,
      items,
      subtotal: consultationFee,
      discount: 0,
      tax: 0,
      totalAmount: consultationFee,
      amountPaid: 0,
      balanceDue: consultationFee,
      status: "ISSUED",
      paymentStatus: "UNPAID",
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
      notes: `Generated for appointment scheduled on ${appointment.date} at ${appointment.time}`,
      createdBy: req.user._id,
    });

    const savedInvoice = await newInvoice.save();

    await recordAuditLog({
      req,
      action: "INVOICE_CREATED",
      resource: "Invoice",
      resourceId: savedInvoice._id,
      details: {
        invoiceNumber: savedInvoice.invoiceNumber,
        appointment: appointment._id,
        totalAmount: consultationFee,
      },
    });

    const populated = await Invoice.findById(savedInvoice._id)
      .populate("patient", "name email phone")
      .populate("doctor", "name specialization")
      .populate("appointment", "date time status reason");

    res.status(201).json({
      message: "Invoice generated successfully",
      invoice: populated,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to generate invoice from appointment", error: error.message });
  }
}

// 8. Update Invoice (Admin)
async function updateInvoice(req, res) {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    if (invoice.status === "CANCELLED") {
      return res.status(400).json({ message: "Cannot edit a cancelled invoice" });
    }

    const { items, discount, tax, status, dueDate, notes } = req.body;

    if (items && Array.isArray(items) && items.length > 0) {
      const calc = calculateInvoiceTotals(
        items,
        discount !== undefined ? discount : invoice.discount,
        tax !== undefined ? tax : invoice.tax
      );
      invoice.items = calc.items;
      invoice.subtotal = calc.subtotal;
      invoice.discount = calc.discount;
      invoice.tax = calc.tax;
      invoice.totalAmount = calc.totalAmount;
    } else {
      if (discount !== undefined || tax !== undefined) {
        const disc = discount !== undefined ? Number(discount) : invoice.discount;
        const tx = tax !== undefined ? Number(tax) : invoice.tax;
        invoice.discount = Math.min(invoice.subtotal, Math.max(0, disc));
        invoice.tax = Math.max(0, tx);
        invoice.totalAmount = Math.max(
          0,
          Math.round((invoice.subtotal - invoice.discount + invoice.tax) * 100) / 100
        );
      }
    }

    if (status) invoice.status = status;
    if (dueDate) invoice.dueDate = new Date(dueDate);
    if (notes !== undefined) invoice.notes = notes;

    invoice.recalculatePaymentStatus();
    const updatedInvoice = await invoice.save();

    await recordAuditLog({
      req,
      action: "INVOICE_UPDATED",
      resource: "Invoice",
      resourceId: updatedInvoice._id,
      details: {
        invoiceNumber: updatedInvoice.invoiceNumber,
        totalAmount: updatedInvoice.totalAmount,
        status: updatedInvoice.status,
      },
    });

    const populated = await Invoice.findById(updatedInvoice._id)
      .populate("patient", "name email phone")
      .populate("doctor", "name specialization")
      .populate("appointment", "date time");

    res.status(200).json(populated);
  } catch (error) {
    res.status(500).json({ message: "Failed to update invoice", error: error.message });
  }
}

// 9. Cancel Invoice (Admin)
async function cancelInvoice(req, res) {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }

    if (invoice.amountPaid > 0) {
      return res.status(400).json({
        message: "Cannot cancel an invoice with payments recorded. Please refund payments first.",
      });
    }

    invoice.status = "CANCELLED";
    await invoice.save();

    await recordAuditLog({
      req,
      action: "INVOICE_CANCELLED",
      resource: "Invoice",
      resourceId: invoice._id,
      details: { invoiceNumber: invoice.invoiceNumber },
    });

    res.status(200).json({ message: "Invoice cancelled successfully", invoice });
  } catch (error) {
    res.status(500).json({ message: "Failed to cancel invoice", error: error.message });
  }
}

// 10. Admin Billing & Revenue Dashboard Statistics
async function getBillingStats(req, res) {
  try {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Payments aggregation
    const allSuccessfulPayments = await Payment.find({ status: "SUCCESS" });
    const allRefundedPayments = await Payment.find({ status: "REFUNDED" });

    const totalRevenueGross = allSuccessfulPayments.reduce((acc, curr) => acc + curr.amount, 0);
    const totalRefundedAmount = allRefundedPayments.reduce((acc, curr) => acc + curr.amount, 0);
    const netRevenue = Math.max(0, Math.round((totalRevenueGross - totalRefundedAmount) * 100) / 100);

    // Today's revenue
    const todayPayments = await Payment.find({
      status: "SUCCESS",
      paidAt: { $gte: startOfToday },
    });
    const todayRevenue = todayPayments.reduce((acc, curr) => acc + curr.amount, 0);

    // Monthly revenue
    const monthPayments = await Payment.find({
      status: "SUCCESS",
      paidAt: { $gte: startOfMonth },
    });
    const monthlyRevenue = monthPayments.reduce((acc, curr) => acc + curr.amount, 0);

    // Invoices breakdown
    const totalInvoices = await Invoice.countDocuments();
    const paidInvoices = await Invoice.countDocuments({ paymentStatus: "PAID" });
    const unpaidInvoices = await Invoice.countDocuments({ paymentStatus: "UNPAID" });
    const partiallyPaidInvoices = await Invoice.countDocuments({ paymentStatus: "PARTIALLY_PAID" });
    const cancelledInvoices = await Invoice.countDocuments({ status: "CANCELLED" });

    // Outstanding balance across all active (non-cancelled) invoices
    const outstandingInvoices = await Invoice.find({
      status: { $ne: "CANCELLED" },
      balanceDue: { $gt: 0 },
    });
    const totalOutstandingBalance = outstandingInvoices.reduce(
      (acc, curr) => acc + curr.balanceDue,
      0
    );

    // Payment methods breakdown
    const paymentMethods = ["CASH", "CARD", "ONLINE", "ESEWA", "KHALTI", "BANK_TRANSFER"];
    const methodStats = {};
    for (const method of paymentMethods) {
      const paymentsForMethod = allSuccessfulPayments.filter((p) => p.paymentMethod === method);
      methodStats[method] = {
        count: paymentsForMethod.length,
        total: paymentsForMethod.reduce((acc, curr) => acc + curr.amount, 0),
      };
    }

    // Monthly revenue chart data for the current year (12 months)
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const currentYear = now.getFullYear();
    const monthlyChartData = [];

    for (let m = 0; m < 12; m++) {
      const mStart = new Date(currentYear, m, 1);
      const mEnd = new Date(currentYear, m + 1, 0, 23, 59, 59, 999);
      const mPayments = allSuccessfulPayments.filter(
        (p) => p.paidAt >= mStart && p.paidAt <= mEnd
      );
      const mTotal = mPayments.reduce((acc, curr) => acc + curr.amount, 0);
      monthlyChartData.push({
        month: monthNames[m],
        revenue: Math.round(mTotal * 100) / 100,
        transactions: mPayments.length,
      });
    }

    // Recent 10 transactions
    const recentTransactions = await Payment.find()
      .populate("patient", "name email")
      .populate("invoice", "invoiceNumber")
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({
      revenue: {
        totalNet: netRevenue,
        totalGross: Math.round(totalRevenueGross * 100) / 100,
        refundedAmount: Math.round(totalRefundedAmount * 100) / 100,
        today: Math.round(todayRevenue * 100) / 100,
        thisMonth: Math.round(monthlyRevenue * 100) / 100,
      },
      invoices: {
        total: totalInvoices,
        paid: paidInvoices,
        unpaid: unpaidInvoices,
        partiallyPaid: partiallyPaidInvoices,
        cancelled: cancelledInvoices,
        outstandingBalance: Math.round(totalOutstandingBalance * 100) / 100,
      },
      payments: {
        successfulCount: allSuccessfulPayments.length,
        refundedCount: allRefundedPayments.length,
      },
      methodStats,
      monthlyChartData,
      recentTransactions,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch billing statistics", error: error.message });
  }
}

// 11. Get Audit Logs (Admin)
async function getAuditLogs(req, res) {
  try {
    const logs = await AuditLog.find()
      .populate("user", "name email role")
      .sort({ createdAt: -1 })
      .limit(100);

    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch audit logs", error: error.message });
  }
}

module.exports = {
  createInvoice,
  getAllInvoices,
  getMyInvoices,
  getInvoiceById,
  getInvoicesByPatient,
  getInvoiceByAppointment,
  generateFromAppointment,
  updateInvoice,
  cancelInvoice,
  getBillingStats,
  getAuditLogs,
};
