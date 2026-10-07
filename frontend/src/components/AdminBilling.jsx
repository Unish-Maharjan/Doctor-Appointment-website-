import { useState } from "react";
import {
  FaMoneyBillWave,
  FaFileInvoiceDollar,
  FaReceipt,
  FaSearch,
  FaPlus,
  FaCheckCircle,
  FaExclamationCircle,
  FaTimes,
  FaUndo,
  FaPrint,
  FaCalendarAlt,
  FaUserMd,
  FaShieldAlt,
  FaChartLine,
  FaCreditCard,
  FaHistory,
  FaSpinner,
} from "react-icons/fa";
import {
  useGetBillingStatsQuery,
  useGetAllInvoicesQuery,
  useGetAllPaymentsQuery,
  useGetAuditLogsQuery,
  useCreateInvoiceMutation,
  useCancelInvoiceMutation,
  useRefundPaymentMutation,
} from "../services/billingApi";
import { useGetDoctorsQuery } from "../services/doctorApi";

function statusBadgeClasses(paymentStatus) {
  switch (paymentStatus) {
    case "PAID":
      return "bg-emerald-50 text-emerald-700 border border-emerald-200";
    case "PARTIALLY_PAID":
      return "bg-blue-50 text-blue-700 border border-blue-200";
    case "REFUNDED":
      return "bg-purple-50 text-purple-700 border border-purple-200";
    default:
      return "bg-amber-50 text-amber-700 border border-amber-200";
  }
}

export default function AdminBilling() {
  const [activeTab, setActiveTab] = useState("overview"); // 'overview' | 'invoices' | 'transactions' | 'audit'
  const [invoiceSearch, setInvoiceSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [refundModalTxn, setRefundModalTxn] = useState(null);
  const [refundReason, setRefundReason] = useState("");

  // RTK Queries
  const { data: stats, isLoading: statsLoading, refetch: refetchStats } = useGetBillingStatsQuery();
  const { data: invoices = [], isLoading: invoicesLoading, refetch: refetchInvoices } = useGetAllInvoicesQuery();
  const { data: payments = [], isLoading: paymentsLoading, refetch: refetchPayments } = useGetAllPaymentsQuery();
  const { data: auditLogs = [], isLoading: auditLoading } = useGetAuditLogsQuery();
  const { data: doctors = [] } = useGetDoctorsQuery();

  // Mutations
  const [createInvoice, { isLoading: isCreating }] = useCreateInvoiceMutation();
  const [cancelInvoice] = useCancelInvoiceMutation();
  const [refundPayment, { isLoading: isRefunding }] = useRefundPaymentMutation();

  // New Invoice Form State
  const [formData, setFormData] = useState({
    patient: "",
    doctor: "",
    discount: 0,
    tax: 0,
    notes: "",
    items: [
      {
        serviceName: "Doctor Consultation",
        serviceType: "consultation",
        description: "General consultation fee",
        quantity: 1,
        unitPrice: 1000,
      },
    ],
  });
  const [createError, setCreateError] = useState("");

  function handleAddItem() {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          serviceName: "Laboratory Test",
          serviceType: "lab_test",
          description: "Routine checkup",
          quantity: 1,
          unitPrice: 500,
        },
      ],
    }));
  }

  function handleRemoveItem(idx) {
    if (formData.items.length <= 1) return;
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== idx),
    }));
  }

  function handleItemChange(idx, field, value) {
    setFormData((prev) => {
      const items = [...prev.items];
      items[idx] = { ...items[idx], [field]: value };
      return { ...prev, items };
    });
  }

  async function handleCreateInvoice(e) {
    e.preventDefault();
    setCreateError("");

    if (!formData.patient) {
      setCreateError("Patient ID or User ID is required");
      return;
    }

    try {
      await createInvoice({
        ...formData,
        doctor: formData.doctor || undefined,
      }).unwrap();
      setShowCreateModal(false);
      setFormData({
        patient: "",
        doctor: "",
        discount: 0,
        tax: 0,
        notes: "",
        items: [
          {
            serviceName: "Doctor Consultation",
            serviceType: "consultation",
            description: "General consultation fee",
            quantity: 1,
            unitPrice: 1000,
          },
        ],
      });
      refetchInvoices();
      refetchStats();
    } catch (err) {
      setCreateError(err?.data?.message || "Failed to create invoice");
    }
  }

  async function handleCancelInvoice(id) {
    if (!window.confirm("Are you sure you want to cancel this invoice?")) return;
    try {
      await cancelInvoice(id).unwrap();
      refetchInvoices();
      refetchStats();
    } catch (err) {
      alert(err?.data?.message || "Failed to cancel invoice");
    }
  }

  async function handleConfirmRefund(e) {
    e.preventDefault();
    if (!refundModalTxn) return;

    try {
      await refundPayment({
        id: refundModalTxn._id,
        reason: refundReason || "Admin manual refund",
      }).unwrap();
      setRefundModalTxn(null);
      setRefundReason("");
      refetchPayments();
      refetchInvoices();
      refetchStats();
    } catch (err) {
      alert(err?.data?.message || "Failed to refund payment");
    }
  }

  const filteredInvoices = invoices.filter((inv) => {
    const matchesSearch =
      inv.invoiceNumber?.toLowerCase().includes(invoiceSearch.toLowerCase()) ||
      inv.patient?.name?.toLowerCase().includes(invoiceSearch.toLowerCase()) ||
      inv.patient?.email?.toLowerCase().includes(invoiceSearch.toLowerCase());
    const matchesStatus = statusFilter ? inv.paymentStatus === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Top Navigation Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-[#dde9fc] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === "overview"
                ? "bg-[#161654] text-white"
                : "text-gray-600 hover:bg-[#E7EEFC]"
            }`}
          >
            Revenue Overview
          </button>
          <button
            onClick={() => setActiveTab("invoices")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === "invoices"
                ? "bg-[#161654] text-white"
                : "text-gray-600 hover:bg-[#E7EEFC]"
            }`}
          >
            Invoices ({invoices.length})
          </button>
          <button
            onClick={() => setActiveTab("transactions")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === "transactions"
                ? "bg-[#161654] text-white"
                : "text-gray-600 hover:bg-[#E7EEFC]"
            }`}
          >
            Transactions ({payments.length})
          </button>
          <button
            onClick={() => setActiveTab("audit")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === "audit"
                ? "bg-[#161654] text-white"
                : "text-gray-600 hover:bg-[#E7EEFC]"
            }`}
          >
            Audit Trail
          </button>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-[#3EA6E0] text-white px-4 py-2 rounded-xl text-xs font-extrabold shadow-sm hover:bg-[#2b90c7] transition"
        >
          <FaPlus />
          <span>Create New Invoice</span>
        </button>
      </div>

      {/* TAB 1: REVENUE OVERVIEW & CHARTS */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {statsLoading ? (
            <div className="bg-white rounded-2xl p-12 text-center text-gray-400">
              <FaSpinner className="animate-spin text-3xl mx-auto mb-2 text-[#3EA6E0]" />
              Loading financial statistics...
            </div>
          ) : (
            <>
              {/* Financial Key Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#dde9fc]">
                  <div className="flex items-center justify-between text-gray-400 text-xs font-bold uppercase mb-2">
                    <span>Net Total Revenue</span>
                    <FaMoneyBillWave className="text-emerald-500 text-base" />
                  </div>
                  <div className="text-2xl font-black text-[#161654]">
                    Rs. {stats?.revenue?.totalNet?.toLocaleString() || "0"}
                  </div>
                  <p className="text-[11px] text-gray-400 mt-1">
                    Gross: Rs. {stats?.revenue?.totalGross?.toLocaleString() || "0"}
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#dde9fc]">
                  <div className="flex items-center justify-between text-gray-400 text-xs font-bold uppercase mb-2">
                    <span>This Month's Revenue</span>
                    <FaChartLine className="text-[#3EA6E0] text-base" />
                  </div>
                  <div className="text-2xl font-black text-[#3EA6E0]">
                    Rs. {stats?.revenue?.thisMonth?.toLocaleString() || "0"}
                  </div>
                  <p className="text-[11px] text-gray-400 mt-1">
                    Today: Rs. {stats?.revenue?.today?.toLocaleString() || "0"}
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#dde9fc]">
                  <div className="flex items-center justify-between text-gray-400 text-xs font-bold uppercase mb-2">
                    <span>Outstanding Balance</span>
                    <FaExclamationCircle className="text-amber-500 text-base" />
                  </div>
                  <div className="text-2xl font-black text-amber-600">
                    Rs. {stats?.invoices?.outstandingBalance?.toLocaleString() || "0"}
                  </div>
                  <p className="text-[11px] text-gray-400 mt-1">
                    Unpaid Invoices: {stats?.invoices?.unpaid || 0}
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-xs border border-[#dde9fc]">
                  <div className="flex items-center justify-between text-gray-400 text-xs font-bold uppercase mb-2">
                    <span>Invoices Lifecycle</span>
                    <FaFileInvoiceDollar className="text-purple-500 text-base" />
                  </div>
                  <div className="text-2xl font-black text-[#161654]">
                    {stats?.invoices?.total || 0}
                  </div>
                  <div className="flex gap-2 text-[11px] mt-1 font-semibold">
                    <span className="text-emerald-600">Paid: {stats?.invoices?.paid || 0}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-purple-600">
                      Refunds: {stats?.payments?.refundedCount || 0}
                    </span>
                  </div>
                </div>
              </div>

              {/* Monthly Revenue Bar Visualization & Payment Methods Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Monthly Revenue Graph */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-xs border border-[#dde9fc]">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-base font-extrabold text-[#161654]">Annual Revenue Trends</h3>
                      <p className="text-xs text-gray-400">Monthly breakdown for calendar year</p>
                    </div>
                    <span className="text-xs font-bold bg-[#E7EEFC] text-[#161654] px-3 py-1 rounded-full">
                      2026 Analytics
                    </span>
                  </div>

                  {/* Dynamic CSS Bar Chart */}
                  <div className="h-64 flex items-end justify-between gap-2 pt-6 pb-2 border-b border-gray-100">
                    {stats?.monthlyChartData?.map((item, idx) => {
                      const maxRev = Math.max(
                        ...stats.monthlyChartData.map((d) => d.revenue),
                        1000
                      );
                      const heightPercent = Math.max(6, Math.round((item.revenue / maxRev) * 100));

                      return (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-2 group relative">
                          {/* Tooltip on Hover */}
                          <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition bg-[#161654] text-white text-[10px] font-bold py-1 px-2 rounded-lg pointer-events-none whitespace-nowrap shadow-md z-10">
                            Rs. {item.revenue.toLocaleString()} ({item.transactions} txns)
                          </div>

                          <div
                            style={{ height: `${heightPercent}%` }}
                            className={`w-full max-w-[28px] rounded-t-lg transition-all duration-500 ${
                              item.revenue > 0
                                ? "bg-gradient-to-t from-[#161654] to-[#3EA6E0] group-hover:to-[#57bef7]"
                                : "bg-gray-100"
                            }`}
                          ></div>
                          <span className="text-[11px] font-bold text-gray-400 group-hover:text-[#161654]">
                            {item.month}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Payment Methods Breakdown */}
                <div className="bg-white rounded-2xl p-6 shadow-xs border border-[#dde9fc]">
                  <h3 className="text-base font-extrabold text-[#161654] mb-1">Payment Gateways</h3>
                  <p className="text-xs text-gray-400 mb-6">Distribution by transaction channel</p>

                  <div className="space-y-4">
                    {stats?.methodStats &&
                      Object.entries(stats.methodStats).map(([method, data]) => {
                        const totalGross = stats.revenue?.totalGross || 1;
                        const pct = Math.round(((data.total || 0) / totalGross) * 100);

                        return (
                          <div key={method}>
                            <div className="flex justify-between text-xs font-bold text-gray-700 mb-1">
                              <span>{method}</span>
                              <span className="text-[#161654]">
                                Rs. {(data.total || 0).toLocaleString()} ({data.count} txns)
                              </span>
                            </div>
                            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                              <div
                                style={{ width: `${pct}%` }}
                                className="h-full bg-[#3EA6E0] rounded-full transition-all"
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* TAB 2: ALL INVOICES */}
      {activeTab === "invoices" && (
        <div className="bg-white rounded-2xl shadow-xs border border-[#dde9fc] overflow-hidden">
          {/* Filter header */}
          <div className="p-4 border-b border-[#dde9fc] flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 min-w-[280px] max-w-md">
              <div className="relative flex-1">
                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-xs" />
                <input
                  type="text"
                  value={invoiceSearch}
                  onChange={(e) => setInvoiceSearch(e.target.value)}
                  placeholder="Search invoice number or patient..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#dde9fc] text-xs focus:outline-none focus:ring-2 focus:ring-[#3EA6E0]"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 rounded-xl border border-[#dde9fc] text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-[#3EA6E0]"
              >
                <option value="">All Payment Statuses</option>
                <option value="UNPAID">UNPAID</option>
                <option value="PARTIALLY_PAID">PARTIALLY_PAID</option>
                <option value="PAID">PAID</option>
                <option value="REFUNDED">REFUNDED</option>
              </select>
            </div>

            <div className="text-xs text-gray-400 font-semibold">
              Showing {filteredInvoices.length} of {invoices.length} invoices
            </div>
          </div>

          {/* Invoices Table */}
          {invoicesLoading ? (
            <div className="p-12 text-center text-gray-400">Loading invoices...</div>
          ) : filteredInvoices.length === 0 ? (
            <div className="p-12 text-center text-gray-400 text-sm">No invoices match your filter.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#161654] text-white uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="px-5 py-3.5">Invoice #</th>
                    <th className="px-5 py-3.5">Patient</th>
                    <th className="px-5 py-3.5">Doctor</th>
                    <th className="px-5 py-3.5">Date</th>
                    <th className="px-5 py-3.5">Total</th>
                    <th className="px-5 py-3.5">Balance</th>
                    <th className="px-5 py-3.5">Status</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#dde9fc]">
                  {filteredInvoices.map((inv) => (
                    <tr key={inv._id} className="hover:bg-blue-50/30 transition">
                      <td className="px-5 py-3.5 font-mono font-bold text-[#161654]">
                        {inv.invoiceNumber}
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="font-bold text-gray-800">{inv.patient?.name || "Patient"}</div>
                        <div className="text-[11px] text-gray-400">{inv.patient?.email}</div>
                      </td>
                      <td className="px-5 py-3.5 text-gray-600">
                        {inv.doctor?.name ? `Dr. ${inv.doctor.name}` : "—"}
                      </td>
                      <td className="px-5 py-3.5 text-gray-500">
                        {new Date(inv.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-5 py-3.5 font-bold text-gray-900">
                        Rs. {inv.totalAmount?.toLocaleString()}
                      </td>
                      <td className="px-5 py-3.5 font-bold text-amber-600">
                        Rs. {inv.balanceDue?.toLocaleString()}
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${statusBadgeClasses(
                            inv.paymentStatus
                          )}`}
                        >
                          {inv.paymentStatus}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right space-x-2">
                        <button
                          onClick={() => setSelectedInvoice(inv)}
                          className="px-3 py-1.5 rounded-lg bg-[#E7EEFC] text-[#161654] font-bold hover:bg-[#d5e3fa] transition"
                        >
                          View
                        </button>
                        {inv.amountPaid === 0 && inv.status !== "CANCELLED" && (
                          <button
                            onClick={() => handleCancelInvoice(inv._id)}
                            className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 font-bold hover:bg-red-100 transition"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: TRANSACTIONS & REFUNDS */}
      {activeTab === "transactions" && (
        <div className="bg-white rounded-2xl shadow-xs border border-[#dde9fc] overflow-hidden">
          <div className="p-4 border-b border-[#dde9fc] flex items-center justify-between">
            <h3 className="font-extrabold text-[#161654] text-sm">Payment Transactions & Gateway Records</h3>
            <span className="text-xs text-gray-400 font-semibold">{payments.length} transactions</span>
          </div>

          {paymentsLoading ? (
            <div className="p-12 text-center text-gray-400">Loading transactions...</div>
          ) : payments.length === 0 ? (
            <div className="p-12 text-center text-gray-400 text-sm">No payment records found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#161654] text-white uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="px-5 py-3.5">Transaction ID</th>
                    <th className="px-5 py-3.5">Invoice #</th>
                    <th className="px-5 py-3.5">Patient</th>
                    <th className="px-5 py-3.5">Amount</th>
                    <th className="px-5 py-3.5">Method</th>
                    <th className="px-5 py-3.5">Date</th>
                    <th className="px-5 py-3.5">Status</th>
                    <th className="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#dde9fc]">
                  {payments.map((p) => (
                    <tr key={p._id} className="hover:bg-blue-50/30 transition">
                      <td className="px-5 py-3.5 font-mono font-bold text-[#161654]">{p.transactionId}</td>
                      <td className="px-5 py-3.5 font-mono text-gray-600">
                        {p.invoice?.invoiceNumber || "—"}
                      </td>
                      <td className="px-5 py-3.5 font-medium text-gray-800">
                        {p.patient?.name || "Patient"}
                      </td>
                      <td className="px-5 py-3.5 font-black text-emerald-600">
                        Rs. {p.amount?.toLocaleString()}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="px-2 py-0.5 rounded bg-gray-100 text-gray-700 font-semibold">
                          {p.paymentMethod}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-gray-500">
                        {new Date(p.paidAt || p.createdAt).toLocaleString()}
                      </td>
                      <td className="px-5 py-3.5">
                        <span
                          className={`px-2.5 py-0.5 rounded-full font-bold ${
                            p.status === "SUCCESS"
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : p.status === "REFUNDED"
                              ? "bg-purple-50 text-purple-700 border border-purple-200"
                              : "bg-red-50 text-red-600"
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        {p.status === "SUCCESS" && (
                          <button
                            onClick={() => {
                              setRefundModalTxn(p);
                              setRefundReason("");
                            }}
                            className="px-3 py-1.5 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 font-bold transition flex items-center gap-1.5 ml-auto"
                          >
                            <FaUndo size={10} />
                            <span>Refund</span>
                          </button>
                        )}
                        {p.status === "REFUNDED" && (
                          <span className="text-[11px] text-gray-400 italic">Refunded</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: AUDIT LOGS */}
      {activeTab === "audit" && (
        <div className="bg-white rounded-2xl shadow-xs border border-[#dde9fc] overflow-hidden">
          <div className="p-4 border-b border-[#dde9fc] flex items-center justify-between">
            <h3 className="font-extrabold text-[#161654] text-sm">System Audit Logs</h3>
            <span className="text-xs text-gray-400 font-semibold">{auditLogs.length} events logged</span>
          </div>

          {auditLoading ? (
            <div className="p-12 text-center text-gray-400">Loading audit trail...</div>
          ) : auditLogs.length === 0 ? (
            <div className="p-12 text-center text-gray-400 text-sm">No audit logs recorded yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#161654] text-white uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="px-5 py-3.5">Action</th>
                    <th className="px-5 py-3.5">Resource</th>
                    <th className="px-5 py-3.5">User</th>
                    <th className="px-5 py-3.5">Timestamp</th>
                    <th className="px-5 py-3.5">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#dde9fc]">
                  {auditLogs.map((log) => (
                    <tr key={log._id} className="hover:bg-blue-50/30 transition">
                      <td className="px-5 py-3.5">
                        <span className="px-2 py-0.5 rounded font-mono font-bold text-[11px] bg-blue-50 text-blue-700 border border-blue-200">
                          {log.action}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 font-semibold text-gray-700">{log.resource}</td>
                      <td className="px-5 py-3.5 text-gray-600">
                        {log.user ? `${log.user.name} (${log.user.role})` : "System"}
                      </td>
                      <td className="px-5 py-3.5 text-gray-500">{new Date(log.createdAt).toLocaleString()}</td>
                      <td className="px-5 py-3.5 font-mono text-[11px] text-gray-500 max-w-xs truncate">
                        {JSON.stringify(log.details)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* MODAL: CREATE MANUAL INVOICE */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 anim-fadeInUp">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-5">
              <h3 className="font-extrabold text-[#161654] text-lg">Generate Hospital Invoice</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleCreateInvoice} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Patient ID (User ObjectId) *</label>
                  <input
                    type="text"
                    value={formData.patient}
                    onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
                    placeholder="e.g. 6a438b993e4a21c4fbd45e5c"
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#3EA6E0]"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Doctor (Optional)</label>
                  <select
                    value={formData.doctor}
                    onChange={(e) => setFormData({ ...formData, doctor: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#3EA6E0]"
                  >
                    <option value="">Select Doctor</option>
                    {doctors.map((d) => (
                      <option key={d._id} value={d._id}>
                        Dr. {d.name} ({d.specialization})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Items Section */}
              <div className="border border-gray-100 p-4 rounded-2xl bg-gray-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-gray-500">Service Line Items</span>
                  <button
                    type="button"
                    onClick={handleAddItem}
                    className="text-xs font-bold text-[#3EA6E0] hover:underline flex items-center gap-1"
                  >
                    <FaPlus size={10} /> Add Service
                  </button>
                </div>

                {formData.items.map((it, idx) => (
                  <div key={idx} className="bg-white p-3 rounded-xl border border-gray-200 space-y-2">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                      <div className="sm:col-span-2">
                        <input
                          type="text"
                          placeholder="Service Name (e.g. Consultation, Lab Test)"
                          value={it.serviceName}
                          onChange={(e) => handleItemChange(idx, "serviceName", e.target.value)}
                          className="w-full px-3 py-1.5 border rounded-lg"
                          required
                        />
                      </div>
                      <div>
                        <select
                          value={it.serviceType}
                          onChange={(e) => handleItemChange(idx, "serviceType", e.target.value)}
                          className="w-full px-2 py-1.5 border rounded-lg text-xs"
                        >
                          <option value="consultation">Consultation</option>
                          <option value="follow_up">Follow Up</option>
                          <option value="lab_test">Lab Test</option>
                          <option value="medicine">Medicine</option>
                          <option value="procedure">Procedure</option>
                          <option value="room_charge">Room Charge</option>
                          <option value="emergency">Emergency</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <label className="text-[10px] text-gray-400">Qty</label>
                        <input
                          type="number"
                          min="1"
                          value={it.quantity}
                          onChange={(e) => handleItemChange(idx, "quantity", e.target.value)}
                          className="w-full px-2 py-1 border rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-gray-400">Unit Price (Rs.)</label>
                        <input
                          type="number"
                          min="0"
                          value={it.unitPrice}
                          onChange={(e) => handleItemChange(idx, "unitPrice", e.target.value)}
                          className="w-full px-2 py-1 border rounded-lg"
                        />
                      </div>
                      <div className="flex items-end justify-between">
                        <span className="font-bold text-gray-700 text-xs">
                          Rs. {(it.quantity * it.unitPrice).toLocaleString()}
                        </span>
                        {formData.items.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(idx)}
                            className="text-red-500 hover:text-red-700 text-xs"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Discount, Tax, Notes */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Discount (Rs.)</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.discount}
                    onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  />
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Tax (Rs.)</label>
                  <input
                    type="number"
                    min="0"
                    value={formData.tax}
                    onChange={(e) => setFormData({ ...formData, tax: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1 text-xs">Invoice Notes</label>
                <textarea
                  rows="2"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Additional notes for patient receipt..."
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs resize-none"
                ></textarea>
              </div>

              {createError && (
                <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-semibold">
                  {createError}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="px-6 py-2.5 rounded-xl bg-[#3EA6E0] text-white text-xs font-extrabold shadow-sm hover:bg-[#2b90c7] disabled:opacity-50"
                >
                  {isCreating ? "Generating..." : "Generate Invoice"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: REFUND CONFIRMATION */}
      {refundModalTxn && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative anim-fadeInUp">
            <h3 className="text-lg font-black text-[#161654] mb-2">Refund Payment</h3>
            <p className="text-gray-500 text-xs mb-4">
              Refunding will mark transaction <strong className="text-black">{refundModalTxn.transactionId}</strong> as REFUNDED and recalculate the associated invoice balance in real-time.
            </p>

            <form onSubmit={handleConfirmRefund} className="space-y-4">
              <div className="bg-purple-50 p-3.5 rounded-2xl text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500">Refund Amount:</span>
                  <span className="font-extrabold text-purple-800">
                    Rs. {refundModalTxn.amount?.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Payment Channel:</span>
                  <span className="font-bold text-gray-700">{refundModalTxn.paymentMethod}</span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">Reason for Refund</label>
                <input
                  type="text"
                  placeholder="e.g. Consultation cancelled, Billing correction"
                  value={refundReason}
                  onChange={(e) => setRefundReason(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 text-xs"
                  required
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setRefundModalTxn(null)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isRefunding}
                  className="flex-1 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-extrabold hover:bg-purple-700 disabled:opacity-50"
                >
                  {isRefunding ? "Refunding..." : "Confirm Refund"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: VIEW INVOICE RECEIPT */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative my-8 anim-fadeInUp">
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <h3 className="font-extrabold text-[#161654]">Invoice #{selectedInvoice.invoiceNumber}</h3>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500"
              >
                <FaTimes />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="bg-gray-50 p-4 rounded-xl flex justify-between">
                <div>
                  <span className="text-gray-400 block font-semibold">Patient:</span>
                  <span className="font-bold text-gray-800 text-sm">
                    {selectedInvoice.patient?.name || "Patient"}
                  </span>
                  <p className="text-gray-500">{selectedInvoice.patient?.email}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${statusBadgeClasses(
                      selectedInvoice.paymentStatus
                    )}`}
                  >
                    {selectedInvoice.paymentStatus}
                  </span>
                </div>
              </div>

              {/* Items */}
              <div className="border border-gray-100 rounded-xl overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#161654] text-white">
                    <tr>
                      <th className="px-3 py-2">Service</th>
                      <th className="px-3 py-2 text-center">Qty</th>
                      <th className="px-3 py-2 text-right">Price</th>
                      <th className="px-3 py-2 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {selectedInvoice.items?.map((it, i) => (
                      <tr key={i}>
                        <td className="px-3 py-2 font-medium">{it.serviceName}</td>
                        <td className="px-3 py-2 text-center">{it.quantity}</td>
                        <td className="px-3 py-2 text-right">Rs. {it.unitPrice}</td>
                        <td className="px-3 py-2 text-right font-bold">Rs. {it.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="text-right space-y-1 font-semibold text-gray-600 pt-2 border-t">
                <div>Subtotal: Rs. {selectedInvoice.subtotal?.toLocaleString()}</div>
                {selectedInvoice.discount > 0 && (
                  <div className="text-emerald-600">- Discount: Rs. {selectedInvoice.discount}</div>
                )}
                {selectedInvoice.tax > 0 && <div>+ Tax: Rs. {selectedInvoice.tax}</div>}
                <div className="text-base font-black text-[#161654]">
                  Total Amount: Rs. {selectedInvoice.totalAmount?.toLocaleString()}
                </div>
                <div className="text-emerald-600 font-bold">
                  Amount Paid: Rs. {selectedInvoice.amountPaid?.toLocaleString()}
                </div>
                <div className="text-amber-600 font-black">
                  Balance Due: Rs. {selectedInvoice.balanceDue?.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedInvoice(null)}
                className="px-5 py-2 rounded-xl bg-gray-100 text-gray-700 text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
