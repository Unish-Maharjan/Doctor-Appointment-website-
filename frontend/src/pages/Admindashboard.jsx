import { useState } from "react";
import {
  FaUserMd,
  FaNewspaper,
  FaCalendarCheck,
  FaTachometerAlt,
  FaBars,
  FaSignOutAlt,
} from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


import { logout } from "../Authslice";
import Header from "../components/Header";
import Footer from "../components/Footer";


import AdminDoctors from "../components/AdminDoctors";
import AdminAppointments from "../components/AdminAppointments";
import AdminNews from "../components/AdminNews";


function AdminDashboard() {
  const [page, setPage] = useState("overview");
  const [showSidebar, setShowSidebar] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logout());
    navigate("/login");
  }

  return (
    <>
    <Header/>
    <div className="flex min-h-screen bg-[#E7EEFC]">
      <aside
        className={`${
          showSidebar ? "w-64" : "w-0 md:w-20"
        } bg-[#161654] overflow-hidden transition-all duration-300`}
      >
        <div className="p-4 flex items-center justify-between">
          <button onClick={() => setShowSidebar(!showSidebar)} className="text-white text-xl">
            <FaBars />
          </button>
        </div>

        <nav className="p-3 space-y-2">
          <button
            onClick={() => setPage("overview")}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg font-medium ${
              page === "overview" ? "bg-[#3EA6E0] text-white" : "text-[#dde9fc] hover:bg-[#1B2363]"
            }`}
          >
            <FaTachometerAlt />
            {showSidebar && "Overview"}
          </button>
          <button
            onClick={() => setPage("doctors")}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg font-medium ${
              page === "doctors" ? "bg-[#3EA6E0] text-white" : "text-[#dde9fc] hover:bg-[#1B2363]"
            }`}
          >
            <FaUserMd />
            {showSidebar && "Doctors"}
          </button>
          <button
            onClick={() => setPage("news")}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg font-medium ${
              page === "news" ? "bg-[#3EA6E0] text-white" : "text-[#dde9fc] hover:bg-[#1B2363]"
            }`}
          >
            <FaNewspaper />
            {showSidebar && "News"}
          </button>
          <button
            onClick={() => setPage("appointments")}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg font-medium ${
              page === "appointments" ? "bg-[#3EA6E0] text-white" : "text-[#dde9fc] hover:bg-[#1B2363]"
            }`}
          >
            <FaCalendarCheck />
            {showSidebar && "Appointments"}
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-lg font-medium text-[#dde9fc] hover:bg-red-500 hover:text-white transition-colors mt-4"
          >
            <FaSignOutAlt />
            {showSidebar && "Logout"}
          </button>
        </nav>
      </aside>

      <div className="flex-1">
        <main className="p-6 md:p-8">
          {page === "overview" && <Overview />}
          {page === "doctors" && <AdminDoctors/>}
          {page === "news" && <AdminNews />}
          {page === "appointments" && <AdminAppointments />}
        </main>
      </div>
    </div>
    <Footer/>
    </>
  );
}

function Overview() {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-8 anim-fadeInUp">
      <h2 className="text-7xl font-bold text-[#161654] mb-2 text-center">Welcome back, Admin</h2>
    </div>
  );
}

export default AdminDashboard;