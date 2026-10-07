import { useState } from "react";
import {
  FaUserMd,
  FaNewspaper,
  FaCalendarCheck,
  FaTachometerAlt,
  FaBars,
  FaSignOutAlt,
  FaTimes,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../Authslice";
import Header from "../components/Header";
import Footer from "../components/Footer";

import AdminDoctors from "../components/AdminDoctors";
import AdminAppointments from "../components/AdminAppointments";
import AdminNews from "../components/AdminNews";
import AdminBilling from "../components/AdminBilling";

const pageTitles = {
  overview: "Overview",
  doctors: "Doctors",
  news: "News",
  appointments: "Appointments",
  billing: "Billing & Revenue Management",
};

function AdminDashboard() {
  const [page, setPage] = useState("overview");
  const [showSidebar, setShowSidebar] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logout());
    navigate("/login");
  }

  function goTo(target) {
    setPage(target);
    setMobileOpen(false);
  }

  return (
    <>
      <Header />
      <div className="flex min-h-screen bg-[#E7EEFC] relative">
        {mobileOpen && (
          <div
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/40 z-30 md:hidden"
          ></div>
        )}

        <aside
          className={`${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          } fixed z-40 top-0 left-0 h-full w-64 bg-[#161654] transition-transform duration-300 md:sticky md:top-0 md:translate-x-0 md:h-screen ${
            showSidebar ? "md:w-64" : "md:w-20"
          } md:transition-all`}
        >
          <div className="p-4 flex items-center justify-between">
            <span className={`text-white font-bold text-lg ${showSidebar ? "block" : "md:hidden"}`}>
              Meddical
            </span>
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="text-white text-xl hidden md:block"
            >
              <FaBars />
            </button>
            <button
              onClick={() => setMobileOpen(false)}
              className="text-white text-xl md:hidden"
            >
              <FaTimes />
            </button>
          </div>

          <nav className="p-3 space-y-2">
            <button
              onClick={() => goTo("overview")}
              title="Overview"
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg font-medium border-l-4 transition-colors ${
                page === "overview"
                  ? "bg-[#3EA6E0] text-white border-white"
                  : "text-[#dde9fc] border-transparent hover:bg-[#1B2363]"
              }`}
            >
              <FaTachometerAlt />
              {(showSidebar || mobileOpen) && "Overview"}
            </button>
            <button
              onClick={() => goTo("doctors")}
              title="Doctors"
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg font-medium border-l-4 transition-colors ${
                page === "doctors"
                  ? "bg-[#3EA6E0] text-white border-white"
                  : "text-[#dde9fc] border-transparent hover:bg-[#1B2363]"
              }`}
            >
              <FaUserMd />
              {(showSidebar || mobileOpen) && "Doctors"}
            </button>
            <button
              onClick={() => goTo("news")}
              title="News"
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg font-medium border-l-4 transition-colors ${
                page === "news"
                  ? "bg-[#3EA6E0] text-white border-white"
                  : "text-[#dde9fc] border-transparent hover:bg-[#1B2363]"
              }`}
            >
              <FaNewspaper />
              {(showSidebar || mobileOpen) && "News"}
            </button>
            <button
              onClick={() => goTo("appointments")}
              title="Appointments"
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg font-medium border-l-4 transition-colors ${
                page === "appointments"
                  ? "bg-[#3EA6E0] text-white border-white"
                  : "text-[#dde9fc] border-transparent hover:bg-[#1B2363]"
              }`}
            >
              <FaCalendarCheck />
              {(showSidebar || mobileOpen) && "Appointments"}
            </button>
            <button
              onClick={() => goTo("billing")}
              title="Billing & Revenue"
              className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg font-medium border-l-4 transition-colors ${
                page === "billing"
                  ? "bg-[#3EA6E0] text-white border-white"
                  : "text-[#dde9fc] border-transparent hover:bg-[#1B2363]"
              }`}
            >
              <FaFileInvoiceDollar />
              {(showSidebar || mobileOpen) && "Billing & Revenue"}
            </button>

            <button
              onClick={() => setConfirmLogout(true)}
              title="Logout"
              className="w-full flex items-center gap-3 px-3 py-3 rounded-lg font-medium text-[#dde9fc] hover:bg-red-500 hover:text-white transition-colors mt-4"
            >
              <FaSignOutAlt />
              {(showSidebar || mobileOpen) && "Logout"}
            </button>
          </nav>
        </aside>

        <div className="flex-1 min-w-0">
          <div className="bg-white border-b border-[#dde9fc] px-6 py-4 flex items-center gap-4 sticky top-0 z-20">
            <button
              onClick={() => setMobileOpen(true)}
              className="text-[#161654] text-xl md:hidden"
            >
              <FaBars />
            </button>
            <h1 className="text-lg font-semibold text-[#161654]">{pageTitles[page]}</h1>
          </div>

          <main className="p-6 md:p-8">
            {page === "overview" && <Overview onNavigate={goTo} />}
            {page === "doctors" && <AdminDoctors />}
            {page === "news" && <AdminNews />}
            {page === "appointments" && <AdminAppointments />}
            {page === "billing" && <AdminBilling />}
          </main>
        </div>
      </div>
      <Footer />

      {confirmLogout && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm anim-fadeInUp">
            <h3 className="text-lg font-semibold text-[#161654] mb-2">Log out?</h3>
            <p className="text-gray-500 text-sm mb-6">
              You'll need to sign in again to access the admin dashboard.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setConfirmLogout(false)}
                className="px-4 py-2 rounded-lg text-[#161654] font-medium hover:bg-[#E7EEFC]"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .anim-fadeInUp {
          animation: fadeInUp 0.25s ease-out;
        }
      `}</style>
    </>
  );
}

function Overview({ onNavigate }) {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-6 anim-fadeInUp">
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <h2 className="text-4xl font-bold text-[#161654] mb-2">Welcome back, Admin</h2>
        <p className="text-gray-400">{today}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => onNavigate("billing")}
          className="bg-white p-6 rounded-2xl shadow-xs border border-[#dde9fc] text-left hover:border-[#3EA6E0] transition group"
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition">
            <FaFileInvoiceDollar />
          </div>
          <h3 className="font-extrabold text-[#161654] text-base mb-1">Billing & Revenue</h3>
          <p className="text-xs text-gray-400">Manage hospital invoices, verify payments, and issue refunds.</p>
        </button>

        <button
          onClick={() => onNavigate("appointments")}
          className="bg-white p-6 rounded-2xl shadow-xs border border-[#dde9fc] text-left hover:border-[#3EA6E0] transition group"
        >
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition">
            <FaCalendarCheck />
          </div>
          <h3 className="font-extrabold text-[#161654] text-base mb-1">Appointments</h3>
          <p className="text-xs text-gray-400">View upcoming bookings, change status, and bill appointments.</p>
        </button>

        <button
          onClick={() => onNavigate("doctors")}
          className="bg-white p-6 rounded-2xl shadow-xs border border-[#dde9fc] text-left hover:border-[#3EA6E0] transition group"
        >
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition">
            <FaUserMd />
          </div>
          <h3 className="font-extrabold text-[#161654] text-base mb-1">Doctors Roster</h3>
          <p className="text-xs text-gray-400">Manage medical staff, consultation fees, and working hours.</p>
        </button>

        <button
          onClick={() => onNavigate("news")}
          className="bg-white p-6 rounded-2xl shadow-xs border border-[#dde9fc] text-left hover:border-[#3EA6E0] transition group"
        >
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl mb-4 group-hover:scale-110 transition">
            <FaNewspaper />
          </div>
          <h3 className="font-extrabold text-[#161654] text-base mb-1">Hospital News</h3>
          <p className="text-xs text-gray-400">Publish articles, updates, and medical health notices.</p>
        </button>
      </div>
    </div>
  );
}

export default AdminDashboard;