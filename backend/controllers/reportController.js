const User = require("../models/userModel");
const Doctor = require("../models/doctorModel");
const Appointment = require("../models/appointmentModel");
const Invoice = require("../models/invoiceModel");
const Admission = require("../models/admissionModel");
const Bed = require("../models/bedModel");
const LabTest = require("../models/labTestModel");
const LabOrder = require("../models/labOrderModel");
const Medicine = require("../models/medicineModel");
const EmergencyCase = require("../models/emergencyModel");

async function getDashboardStats(req, res) {
  try {
    const [
      totalPatients,
      totalDoctors,
      totalAppointments,
      pendingAppointments,
      confirmedAppointments,
      cancelledAppointments,
      totalAdmissions,
      activeAdmissions,
      dischargedAdmissions,
      totalBeds,
      availableBeds,
      occupiedBeds,
      totalLabCatalogTests,
      totalLabOrders,
      pendingLabOrders,
      completedLabOrders,
      totalMedicines,
      lowStockMedicines,
      outOfStockMedicines,
      totalEmergencyCases,
      activeEmergencyCases,
    ] = await Promise.all([
      User.countDocuments({ role: "patient" }),
      Doctor.countDocuments(),
      Appointment.countDocuments(),
      Appointment.countDocuments({ status: "pending" }),
      Appointment.countDocuments({ status: "confirmed" }),
      Appointment.countDocuments({ status: "cancelled" }),
      Admission.countDocuments(),
      Admission.countDocuments({ status: "Admitted" }),
      Admission.countDocuments({ status: "Discharged" }),
      Bed.countDocuments(),
      Bed.countDocuments({ status: "Available" }),
      Bed.countDocuments({ status: "Occupied" }),
      LabTest.countDocuments(),
      LabOrder.countDocuments(),
      LabOrder.countDocuments({ status: "Pending" }),
      LabOrder.countDocuments({ status: "Completed" }),
      Medicine.countDocuments(),
      Medicine.countDocuments({ $expr: { $lte: ["$quantity", "$minStockLevel"] } }),
      Medicine.countDocuments({ quantity: { $lte: 0 } }),
      EmergencyCase.countDocuments(),
      EmergencyCase.countDocuments({ treatmentStatus: { $in: ["Triaged", "Under Treatment", "Stabilized"] } }),
    ]);

    // Financial aggregation from Invoices
    const financialAggregate = await Invoice.aggregate([
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: "$totalAmount" },
          totalPaid: { $sum: "$amountPaid" },
          totalBalanceDue: { $sum: "$balanceDue" },
          invoiceCount: { $sum: 1 },
        },
      },
    ]);

    const financialData = financialAggregate[0] || {
      totalRevenue: 0,
      totalPaid: 0,
      totalBalanceDue: 0,
      invoiceCount: 0,
    };

    const bedOccupancyRate = totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0;

    res.status(200).json({
      summary: {
        totalPatients,
        totalDoctors,
        totalAppointments,
        totalRevenue: financialData.totalPaid,
        totalBilled: financialData.totalRevenue,
        pendingRevenue: financialData.totalBalanceDue,
        totalAdmissions,
        activeAdmissions,
        availableBeds,
        totalBeds,
        occupancyRate: `${bedOccupancyRate}%`,
        totalLabOrders,
        pendingLabOrders,
        totalMedicines,
        lowStockMedicines,
        totalEmergencyCases,
        activeEmergencyCases,
      },
      appointments: {
        total: totalAppointments,
        pending: pendingAppointments,
        confirmed: confirmedAppointments,
        cancelled: cancelledAppointments,
      },
      admissions: {
        total: totalAdmissions,
        currentlyAdmitted: activeAdmissions,
        discharged: dischargedAdmissions,
      },
      beds: {
        total: totalBeds,
        available: availableBeds,
        occupied: occupiedBeds,
        occupancyRate: bedOccupancyRate,
      },
      laboratory: {
        catalogTests: totalLabCatalogTests,
        totalOrders: totalLabOrders,
        pending: pendingLabOrders,
        completed: completedLabOrders,
      },
      pharmacy: {
        totalMedicines,
        lowStock: lowStockMedicines,
        outOfStock: outOfStockMedicines,
      },
      emergency: {
        total: totalEmergencyCases,
        active: activeEmergencyCases,
      },
      revenue: financialData,
      // Charts data formatted for UI charting libraries
      charts: {
        appointmentStatusBreakdown: [
          { status: "Pending", count: pendingAppointments },
          { status: "Confirmed", count: confirmedAppointments },
          { status: "Cancelled", count: cancelledAppointments },
        ],
        bedOccupancyBreakdown: [
          { name: "Available Beds", count: availableBeds },
          { name: "Occupied Beds", count: occupiedBeds },
        ],
        pharmacyStockHealth: [
          { name: "Adequate Stock", count: Math.max(0, totalMedicines - lowStockMedicines) },
          { name: "Low Stock Alert", count: Math.max(0, lowStockMedicines - outOfStockMedicines) },
          { name: "Out of Stock", count: outOfStockMedicines },
        ],
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to generate report statistics", error: error.message });
  }
}

module.exports = {
  getDashboardStats,
};
