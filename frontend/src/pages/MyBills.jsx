import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaFileInvoiceDollar,
  FaReceipt,
  FaCheckCircle,
  FaExclamationCircle,
  FaCreditCard,
  FaHistory,
  FaPrint,
  FaTimes,
  FaCalendarAlt,
  FaUserMd,
  FaShieldAlt,
  FaLock,
  FaMobileAlt,
  FaMoneyBillWave,
  FaSpinner,
} from "react-icons/fa";
import Banner from "../components/Banner";
import Contactsection from "../components/Contactsection";
import {
  useGetMyInvoicesQuery,
  useGetMyPaymentsQuery,
  useProcessPaymentMutation,
} from "../services/billingApi";

function statusBadge(paymentStatus) {
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

export default function MyBills() {
  const { token, user } = useSelector((state) => state.auth);
  const isLoggedIn = Boolean(token);

  const [activeTab, setActiveTab] = useState("invoices"); // 'invoices' | 'payments'
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [paymentModalInvoice, setPaymentModalInvoice] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("ONLINE");
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [paymentSuccessData, setPaymentSuccessData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    data: invoices = [],
    isLoading: invoicesLoading,
    refetch: refetchInvoices,
  } = useGetMyInvoicesQuery(undefined, { skip: !isLoggedIn });

  const {
    data: payments = [],
    isLoading: paymentsLoading,
    refetch: refetchPayments,
  } = useGetMyPaymentsQuery(undefined, { skip: !isLoggedIn });

  const [processPaymentMutation] = useProcessPaymentMutation();

  // Summary calculations
  const totalDue = invoices.reduce(
    (sum, inv) => (inv.status !== "CANCELLED" ? sum + (inv.balanceDue || 0) : sum),
    0
  );
  const totalPaid = invoices.reduce(
    (sum, inv) => (inv.status !== "CANCELLED" ? sum + (inv.amountPaid || 0) : sum),
    0
  );

  function handleOpenPayModal(inv) {
    setPaymentModalInvoice(inv);
    setPaymentAmount(inv.balanceDue.toString());
    setPaymentMethod("ONLINE");
    setErrorMessage("");
    setPaymentSuccessData(null);
    setIsProcessing(false);
    setProcessingStep(0);
  }

  async function handleConfirmPayment(e) {
    e.preventDefault();
    setErrorMessage("");

    const amt = Number(paymentAmount);
    if (!amt || amt <= 0) {
      setErrorMessage("Please enter a valid payment amount greater than zero.");
      return;
    }

    if (amt > paymentModalInvoice.balanceDue) {
      setErrorMessage(
        `Amount cannot exceed the outstanding balance of Rs. ${paymentModalInvoice.balanceDue.toLocaleString()}`
      );
      return;
    }

    setIsProcessing(true);
    setProcessingStep(1);

    // Realistic demo simulated steps for WOW experience
    setTimeout(() => {
      setProcessingStep(2);
    }, 600);

    setTimeout(async () => {
      setProcessingStep(3);
      try {
        const res = await processPaymentMutation({
          invoiceId: paymentModalInvoice._id,
          amount: amt,
          paymentMethod,
          notes: `Patient self-payment via ${paymentMethod} (Demo)`,
        }).unwrap();

        setIsProcessing(false);
        setPaymentSuccessData(res.data);
        refetchInvoices();
        refetchPayments();
      } catch (err) {
        setIsProcessing(false);
        setErrorMessage(err?.data?.message || "Failed to process payment. Please try again.");
      }
    }, 1200);
  }

  function handlePrint() {
    window.print();
  }

  return (
    <>
      <Banner title="Billing & Payments" image="Appointment.jpg" />

      <div className="min-h-screen bg-[#F5F8FE] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {!isLoggedIn ? (
            <div className="bg-white rounded-2xl shadow-sm p-10 text-center max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-full bg-[#E7EEFC] text-[#161654] flex items-center justify-center mx-auto mb-4">
                <FaLock size={24} />
              </div>
              <h2 className="text-2xl font-bold text-[#161654] mb-2">Access Your Bills</h2>
              <p className="text-gray-500 mb-6 text-sm">
                Please sign in to view your invoices, make safe demo payments, and view transaction history.
              </p>
              <Link
                to="/login"
                className="inline-block bg-[#3EA6E0] text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:bg-[#2b90c7] transition"
              >
                Log In to Continue
              </Link>
            </div>
          ) : (
            <>
              {/* Header Profile & Summary Cards */}
              <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-extrabold text-[#161654]">My Hospital Invoices</h1>
                  <p className="text-gray-500 text-sm mt-1">
                    Manage medical charges, pay securely, and track your payment receipts.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2 rounded-xl text-xs font-semibold">
                  <FaShieldAlt className="text-emerald-600" />
                  <span>Secure Demo Gateway Activated</span>
                </div>
              </div>

              {/* Stats Overview */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-blue-50 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#E7EEFC] text-[#3EA6E0] flex items-center justify-center text-2xl shrink-0">
                    <FaFileInvoiceDollar />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Invoices</p>
                    <p className="text-2xl font-black text-[#161654] mt-1">{invoices.length}</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-50 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-2xl shrink-0">
                    <FaCheckCircle />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Total Paid</p>
                    <p className="text-2xl font-black text-emerald-600 mt-1">
                      Rs. {totalPaid.toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 shadow-sm border border-amber-50 flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl shrink-0">
                    <FaExclamationCircle />
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Outstanding Due</p>
                    <p className="text-2xl font-black text-amber-600 mt-1">
                      Rs. {totalDue.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center gap-3 border-b border-gray-200 mb-6">
                <button
                  onClick={() => setActiveTab("invoices")}
                  className={`pb-3 font-semibold text-sm transition-colors border-b-2 flex items-center gap-2 ${
                    activeTab === "invoices"
                      ? "border-[#3EA6E0] text-[#161654]"
                      : "border-transparent text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <FaFileInvoiceDollar />
                  <span>Invoices & Bills ({invoices.length})</span>
                </button>
                <button
                  onClick={() => setActiveTab("payments")}
                  className={`pb-3 font-semibold text-sm transition-colors border-b-2 flex items-center gap-2 ${
                    activeTab === "payments"
                      ? "border-[#3EA6E0] text-[#161654]"
                      : "border-transparent text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <FaHistory />
                  <span>Payment Transactions ({payments.length})</span>
                </button>
              </div>

              {/* TAB 1: INVOICES */}
              {activeTab === "invoices" && (
                <div>
                  {invoicesLoading ? (
                    <div className="bg-white rounded-2xl p-10 text-center text-gray-400">
                      <FaSpinner className="animate-spin text-3xl mx-auto mb-2 text-[#3EA6E0]" />
                      Loading your medical bills...
                    </div>
                  ) : invoices.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
                      <FaReceipt className="text-gray-300 text-5xl mx-auto mb-3" />
                      <h3 className="text-lg font-bold text-[#161654]">No Invoices Found</h3>
                      <p className="text-gray-400 text-sm mt-1 max-w-md mx-auto">
                        When you book appointments or receive hospital services, your itemized bills will appear here automatically.
                      </p>
                      <Link
                        to="/appointment"
                        className="inline-block mt-5 bg-[#3EA6E0] text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-[#2b90c7] transition"
                      >
                        Book an Appointment
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {invoices.map((inv) => (
                        <div
                          key={inv._id}
                          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition flex flex-col md:flex-row md:items-center justify-between gap-6"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-3 flex-wrap mb-2">
                              <span className="font-mono text-base font-extrabold text-[#161654]">
                                {inv.invoiceNumber}
                              </span>
                              <span
                                className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide ${statusBadge(
                                  inv.paymentStatus
                                )}`}
                              >
                                {inv.paymentStatus.replace("_", " ")}
                              </span>
                              {inv.status === "CANCELLED" && (
                                <span className="bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded-full text-xs font-bold">
                                  CANCELLED
                                </span>
                              )}
                            </div>

                            <div className="flex flex-wrap items-center gap-y-1 gap-x-4 text-xs text-gray-500">
                              <div className="flex items-center gap-1.5">
                                <FaCalendarAlt className="text-gray-400" />
                                <span>{new Date(inv.createdAt).toLocaleDateString()}</span>
                              </div>
                              {inv.doctor && (
                                <div className="flex items-center gap-1.5 text-gray-700 font-medium">
                                  <FaUserMd className="text-[#3EA6E0]" />
                                  <span>
                                    Dr. {inv.doctor.name} ({inv.doctor.specialization})
                                  </span>
                                </div>
                              )}
                              {inv.appointment && (
                                <div className="bg-[#E7EEFC] text-[#161654] px-2 py-0.5 rounded text-[11px] font-semibold">
                                  Appt: {inv.appointment.date} at {inv.appointment.time}
                                </div>
                              )}
                            </div>

                            {/* Itemized preview */}
                            <div className="mt-3 text-xs text-gray-600 bg-gray-50 p-2.5 rounded-xl flex items-center justify-between">
                              <span className="truncate">
                                {inv.items?.map((it) => `${it.serviceName} (x${it.quantity})`).join(", ") ||
                                  "Hospital Services"}
                              </span>
                              <span className="font-semibold text-gray-800 ml-2">
                                Subtotal: Rs. {inv.subtotal?.toLocaleString()}
                              </span>
                            </div>
                          </div>

                          {/* Amounts & Action buttons */}
                          <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-3 md:pt-0">
                            <div className="text-right">
                              <div className="text-xs text-gray-400 font-semibold uppercase">Total Amount</div>
                              <div className="text-lg font-black text-[#161654]">
                                Rs. {inv.totalAmount?.toLocaleString()}
                              </div>
                              {inv.balanceDue > 0 ? (
                                <div className="text-xs font-bold text-amber-600">
                                  Due: Rs. {inv.balanceDue?.toLocaleString()}
                                </div>
                              ) : (
                                <div className="text-xs font-bold text-emerald-600">Fully Paid</div>
                              )}
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setSelectedInvoice(inv)}
                                className="px-4 py-2 rounded-xl text-xs font-bold text-[#161654] bg-[#E7EEFC] hover:bg-[#d5e3fa] transition"
                              >
                                View Bill
                              </button>

                              {inv.balanceDue > 0 && inv.status !== "CANCELLED" && (
                                <button
                                  onClick={() => handleOpenPayModal(inv)}
                                  className="px-5 py-2 rounded-xl text-xs font-extrabold text-white bg-[#3EA6E0] hover:bg-[#2b90c7] shadow-sm hover:scale-102 transition flex items-center gap-1.5"
                                >
                                  <FaCreditCard />
                                  <span>Pay Now</span>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: PAYMENT HISTORY */}
              {activeTab === "payments" && (
                <div>
                  {paymentsLoading ? (
                    <div className="bg-white rounded-2xl p-10 text-center text-gray-400">
                      <FaSpinner className="animate-spin text-3xl mx-auto mb-2 text-[#3EA6E0]" />
                      Loading payment transactions...
                    </div>
                  ) : payments.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
                      <FaHistory className="text-gray-300 text-5xl mx-auto mb-3" />
                      <h3 className="text-lg font-bold text-[#161654]">No Payment Transactions Yet</h3>
                      <p className="text-gray-400 text-sm mt-1">
                        When you pay invoices, your transaction records and generated TXN codes will be listed here.
                      </p>
                    </div>
                  ) : (
                    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                          <thead className="bg-[#161654] text-white text-xs uppercase tracking-wider">
                            <tr>
                              <th className="px-6 py-4">Transaction ID</th>
                              <th className="px-6 py-4">Invoice #</th>
                              <th className="px-6 py-4">Date & Time</th>
                              <th className="px-6 py-4">Payment Method</th>
                              <th className="px-6 py-4">Amount</th>
                              <th className="px-6 py-4">Status</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-100">
                            {payments.map((p) => (
                              <tr key={p._id} className="hover:bg-blue-50/40 transition">
                                <td className="px-6 py-4 font-mono font-bold text-[#161654]">
                                  {p.transactionId}
                                </td>
                                <td className="px-6 py-4 font-mono text-gray-600">
                                  {p.invoice?.invoiceNumber || "—"}
                                </td>
                                <td className="px-6 py-4 text-gray-500 text-xs">
                                  {new Date(p.paidAt || p.createdAt).toLocaleString()}
                                </td>
                                <td className="px-6 py-4">
                                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-gray-100 text-gray-700">
                                    <FaCreditCard size={11} className="text-[#3EA6E0]" />
                                    {p.paymentMethod}
                                  </span>
                                </td>
                                <td className="px-6 py-4 font-extrabold text-[#161654]">
                                  Rs. {p.amount?.toLocaleString()}
                                </td>
                                <td className="px-6 py-4">
                                  <span
                                    className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                                      p.status === "SUCCESS"
                                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                        : p.status === "REFUNDED"
                                        ? "bg-purple-50 text-purple-700 border border-purple-200"
                                        : "bg-red-50 text-red-600 border border-red-200"
                                    }`}
                                  >
                                    {p.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* MODAL 1: VIEW INVOICE RECEIPT (PRINT READY) */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8 anim-fadeInUp print:m-0 print:p-0 print:shadow-none">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6 print:hidden">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Official Hospital Receipt
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrint}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold transition"
                >
                  <FaPrint /> Print Receipt
                </button>
                <button
                  onClick={() => setSelectedInvoice(null)}
                  className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition"
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            {/* Receipt Content */}
            <div className="printable-receipt">
              <div className="flex items-start justify-between border-b border-gray-200 pb-6 mb-6">
                <div>
                  <h2 className="text-2xl font-black text-[#161654]">
                    MED<span className="text-[#3EA6E0]">DICAL</span> HOSPITAL
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">Kathmandu, Nepal • Phone: (977) 9841399247</p>
                  <p className="text-xs text-gray-400">Email: billing@meddicalhospital.com</p>
                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400 uppercase font-bold">Invoice Number</div>
                  <div className="text-lg font-mono font-black text-[#161654]">
                    {selectedInvoice.invoiceNumber}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Date: {new Date(selectedInvoice.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Patient info */}
              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl text-xs mb-6">
                <div>
                  <span className="text-gray-400 block font-semibold">Billed To:</span>
                  <span className="font-bold text-gray-800 text-sm">{user?.name || "Patient"}</span>
                  <p className="text-gray-500">{user?.email}</p>
                  {user?.phone && <p className="text-gray-500">Phone: {user.phone}</p>}
                </div>
                <div>
                  <span className="text-gray-400 block font-semibold">Doctor / Department:</span>
                  <span className="font-bold text-gray-800 text-sm">
                    {selectedInvoice.doctor?.name ? `Dr. ${selectedInvoice.doctor.name}` : "General Services"}
                  </span>
                  <p className="text-gray-500">{selectedInvoice.doctor?.specialization}</p>
                  <span
                    className={`inline-block mt-1 px-2 py-0.5 rounded text-[11px] font-bold ${statusBadge(
                      selectedInvoice.paymentStatus
                    )}`}
                  >
                    Payment Status: {selectedInvoice.paymentStatus}
                  </span>
                </div>
              </div>

              {/* Items Table */}
              <table className="w-full text-left text-xs mb-6">
                <thead className="bg-[#161654] text-white">
                  <tr>
                    <th className="px-3 py-2.5 rounded-l-lg">Item / Service</th>
                    <th className="px-3 py-2.5 text-center">Qty</th>
                    <th className="px-3 py-2.5 text-right">Unit Price</th>
                    <th className="px-3 py-2.5 text-right rounded-r-lg">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {selectedInvoice.items?.map((it, idx) => (
                    <tr key={idx}>
                      <td className="px-3 py-3">
                        <div className="font-bold text-gray-800">{it.serviceName}</div>
                        {it.description && <div className="text-gray-400 text-[11px]">{it.description}</div>}
                      </td>
                      <td className="px-3 py-3 text-center">{it.quantity}</td>
                      <td className="px-3 py-3 text-right">Rs. {it.unitPrice?.toLocaleString()}</td>
                      <td className="px-3 py-3 text-right font-bold">Rs. {it.total?.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Financial Totals */}
              <div className="border-t border-gray-200 pt-3 flex flex-col items-end text-xs space-y-1.5">
                <div className="flex justify-between w-60 text-gray-600">
                  <span>Subtotal:</span>
                  <span className="font-semibold">Rs. {selectedInvoice.subtotal?.toLocaleString()}</span>
                </div>
                {selectedInvoice.discount > 0 && (
                  <div className="flex justify-between w-60 text-emerald-600">
                    <span>Discount:</span>
                    <span className="font-semibold">- Rs. {selectedInvoice.discount?.toLocaleString()}</span>
                  </div>
                )}
                {selectedInvoice.tax > 0 && (
                  <div className="flex justify-between w-60 text-gray-600">
                    <span>Tax:</span>
                    <span className="font-semibold">+ Rs. {selectedInvoice.tax?.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between w-60 text-sm font-black text-[#161654] border-t border-gray-200 pt-2">
                  <span>Total Amount:</span>
                  <span>Rs. {selectedInvoice.totalAmount?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between w-60 text-emerald-600 font-bold">
                  <span>Amount Paid:</span>
                  <span>Rs. {selectedInvoice.amountPaid?.toLocaleString()}</span>
                </div>
                <div className="flex justify-between w-60 text-amber-600 font-black text-sm border-t border-gray-200 pt-1">
                  <span>Balance Due:</span>
                  <span>Rs. {selectedInvoice.balanceDue?.toLocaleString()}</span>
                </div>
              </div>

              {selectedInvoice.notes && (
                <div className="mt-6 text-[11px] text-gray-400 bg-gray-50 p-3 rounded-lg">
                  <span className="font-semibold text-gray-600">Notes:</span> {selectedInvoice.notes}
                </div>
              )}

              <div className="mt-8 text-center text-[10px] text-gray-400 border-t border-dashed border-gray-200 pt-4">
                Thank you for choosing Meddical Hospital. For medical emergency, call 9841399247.
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-6 flex justify-end gap-3 print:hidden">
              <button
                onClick={() => setSelectedInvoice(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 transition"
              >
                Close
              </button>
              {selectedInvoice.balanceDue > 0 && selectedInvoice.status !== "CANCELLED" && (
                <button
                  onClick={() => {
                    const inv = selectedInvoice;
                    setSelectedInvoice(null);
                    handleOpenPayModal(inv);
                  }}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-white bg-[#3EA6E0] hover:bg-[#2b90c7] transition flex items-center gap-2"
                >
                  <FaCreditCard /> Pay Balance (Rs. {selectedInvoice.balanceDue?.toLocaleString()})
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: SAFE DEMO PAYMENT FLOW */}
      {paymentModalInvoice && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative anim-fadeInUp overflow-hidden">
            {!paymentSuccessData ? (
              <>
                <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-full bg-[#E7EEFC] text-[#3EA6E0] flex items-center justify-center">
                      <FaCreditCard />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-[#161654] text-lg">Hospital Bill Payment</h3>
                      <p className="text-xs text-gray-400 font-mono">
                        Invoice: {paymentModalInvoice.invoiceNumber}
                      </p>
                    </div>
                  </div>
                  {!isProcessing && (
                    <button
                      onClick={() => setPaymentModalInvoice(null)}
                      className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 transition"
                    >
                      <FaTimes />
                    </button>
                  )}
                </div>

                {/* Demonstration Alert Banner */}
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3.5 mb-5 flex items-start gap-3 text-xs text-amber-800">
                  <FaShieldAlt className="text-amber-600 text-lg shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Safe Demo Payment Simulation</span>
                    This is an educational software engineering demonstration. No real bank accounts or cards are charged.
                  </div>
                </div>

                {isProcessing ? (
                  <div className="py-12 text-center">
                    <FaSpinner className="animate-spin text-4xl text-[#3EA6E0] mx-auto mb-4" />
                    <h4 className="text-lg font-bold text-[#161654]">
                      {processingStep === 1 && "Connecting to Demo Payment Gateway..."}
                      {processingStep === 2 && "Verifying Transaction & Balance..."}
                      {processingStep === 3 && "Finalizing Payment & Recording Invoice..."}
                    </h4>
                    <p className="text-gray-400 text-xs mt-2">Please do not close this window</p>
                  </div>
                ) : (
                  <form onSubmit={handleConfirmPayment}>
                    <div className="bg-gray-50 p-4 rounded-2xl mb-5 space-y-2 text-xs">
                      <div className="flex justify-between text-gray-500">
                        <span>Total Invoice Amount:</span>
                        <span className="font-bold text-gray-800">
                          Rs. {paymentModalInvoice.totalAmount?.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-gray-500">
                        <span>Already Paid:</span>
                        <span className="font-bold text-emerald-600">
                          Rs. {paymentModalInvoice.amountPaid?.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-base font-extrabold text-[#161654] border-t border-gray-200 pt-2">
                        <span>Outstanding Balance Due:</span>
                        <span className="text-amber-600">
                          Rs. {paymentModalInvoice.balanceDue?.toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Payment Amount Input */}
                    <div className="mb-4">
                      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-1.5">
                        Amount to Pay (Rs.)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max={paymentModalInvoice.balanceDue}
                        value={paymentAmount}
                        onChange={(e) => setPaymentAmount(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 text-lg font-bold text-[#161654] focus:outline-none focus:ring-2 focus:ring-[#3EA6E0]"
                        required
                      />
                      <span className="text-[11px] text-gray-400 mt-1 block">
                        You can pay full balance or make a partial payment.
                      </span>
                    </div>

                    {/* Payment Method Selector */}
                    <div className="mb-6">
                      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wide mb-2">
                        Choose Payment Method
                      </label>
                      <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
                        {[
                          { id: "ESEWA", label: "eSewa", icon: <FaMobileAlt className="text-emerald-500" /> },
                          { id: "KHALTI", label: "Khalti", icon: <FaMobileAlt className="text-purple-500" /> },
                          { id: "ONLINE", label: "Card / Net", icon: <FaCreditCard className="text-blue-500" /> },
                          { id: "CASH", label: "Cash Desk", icon: <FaMoneyBillWave className="text-green-600" /> },
                          { id: "BANK_TRANSFER", label: "Bank Wire", icon: <FaShieldAlt className="text-indigo-500" /> },
                        ].map((m) => (
                          <button
                            type="button"
                            key={m.id}
                            onClick={() => setPaymentMethod(m.id)}
                            className={`p-3 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition ${
                              paymentMethod === m.id
                                ? "border-[#3EA6E0] bg-[#E7EEFC] text-[#161654] font-bold shadow-xs"
                                : "border-gray-200 text-gray-600 hover:bg-gray-50"
                            }`}
                          >
                            <span className="text-base">{m.icon}</span>
                            <span>{m.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {errorMessage && (
                      <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-600 text-xs font-medium">
                        {errorMessage}
                      </div>
                    )}

                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setPaymentModalInvoice(null)}
                        className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 font-semibold text-xs hover:bg-gray-50 transition"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-3 rounded-xl bg-[#3EA6E0] text-white font-extrabold text-xs shadow-md hover:bg-[#2b90c7] transition"
                      >
                        Pay Now (Rs. {Number(paymentAmount || 0).toLocaleString()})
                      </button>
                    </div>
                  </form>
                )}
              </>
            ) : (
              /* SUCCESS SCREEN (SECTION 20 UX FLOW) */
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 text-3xl">
                  <FaCheckCircle />
                </div>
                <h3 className="text-2xl font-black text-[#161654] mb-1">PAYMENT SUCCESSFUL</h3>
                <p className="text-xs text-emerald-700 font-semibold bg-emerald-50 inline-block px-3 py-1 rounded-full mb-6">
                  Transaction Verified & Recorded in System
                </p>

                <div className="bg-gray-50 p-5 rounded-2xl text-left text-xs space-y-2.5 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-400 font-medium">Invoice Number:</span>
                    <span className="font-mono font-bold text-gray-800">
                      {paymentSuccessData.invoice?.invoiceNumber}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 font-medium">Transaction ID:</span>
                    <span className="font-mono font-bold text-[#3EA6E0]">
                      {paymentSuccessData.transaction?.transactionId}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 font-medium">Amount Paid:</span>
                    <span className="font-black text-emerald-600 text-sm">
                      Rs. {paymentSuccessData.transaction?.amount?.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 font-medium">Payment Method:</span>
                    <span className="font-bold text-gray-700">
                      {paymentSuccessData.transaction?.paymentMethod}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 font-medium">Status:</span>
                    <span className="font-bold text-emerald-600">
                      {paymentSuccessData.transaction?.status}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-2 font-bold">
                    <span className="text-gray-600">Remaining Balance:</span>
                    <span className="text-gray-800">
                      Rs. {paymentSuccessData.invoice?.balanceDue?.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      const updatedInv = paymentSuccessData.invoice;
                      setPaymentModalInvoice(null);
                      setPaymentSuccessData(null);
                      setSelectedInvoice(updatedInv);
                    }}
                    className="flex-1 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-xs transition flex items-center justify-center gap-1.5"
                  >
                    <FaPrint /> View Receipt
                  </button>
                  <button
                    onClick={() => {
                      setPaymentModalInvoice(null);
                      setPaymentSuccessData(null);
                    }}
                    className="flex-1 py-3 rounded-xl bg-[#3EA6E0] hover:bg-[#2b90c7] text-white font-extrabold text-xs transition"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Embedded print styles */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .printable-receipt, .printable-receipt * {
            visibility: visible;
          }
          .printable-receipt {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            padding: 20px;
          }
        }
      `}</style>
    </>
  );
}
