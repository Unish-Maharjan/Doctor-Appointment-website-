import { useState } from "react";
import { FaSearch, FaUserMd, FaCalendarAlt, FaClock, FaExclamationCircle } from "react-icons/fa";
import {
  useGetAllAppointmentsQuery,
  useUpdateAppointmentStatusMutation,
} from "../services/appointmentApi";

function statusBadgeClasses(status) {
  if (status === "confirmed") {
    return "bg-green-50 text-green-700 border border-green-200";
  }
  if (status === "cancelled") {
    return "bg-red-50 text-red-600 border border-red-200";
  }
  return "bg-yellow-50 text-yellow-700 border border-yellow-200";
}

function AdminAppointments() {
  const { data, isLoading, isError, isFetching } = useGetAllAppointmentsQuery();
  const appointments = data || [];

  const [updateAppointmentStatus] = useUpdateAppointmentStatusMutation();
  const [updatingId, setUpdatingId] = useState(null);
  const [search, setSearch] = useState("");

  async function handleStatusChange(id, status) {
    setUpdatingId(id);
    try {
      await updateAppointmentStatus({ id, status }).unwrap();
    } catch (err) {
      alert("Failed to update status. Please try again.");
    } finally {
      setUpdatingId(null);
    }
  }

  const filteredAppointments = appointments.filter((appointment) => {
    const name = appointment.patient?.name?.toLowerCase() || "";
    const doctor = appointment.doctor?.name?.toLowerCase() || "";
    const query = search.toLowerCase();
    return name.includes(query) || doctor.includes(query);
  });

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-[#E7EEFC] rounded-lg w-full"></div>
          <div className="h-10 bg-[#E7EEFC] rounded-lg w-full"></div>
          <div className="h-10 bg-[#E7EEFC] rounded-lg w-full"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
        <FaExclamationCircle className="text-red-400 text-3xl mx-auto mb-3" />
        <p className="text-red-500 font-medium">Could not load appointments.</p>
        <p className="text-gray-400 text-sm mt-1">Check your backend is running.</p>
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-8 text-center text-gray-500">
        No appointments yet.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden anim-fadeIn">
      <div className="p-4 border-b border-[#E7EEFC] flex items-center justify-between gap-4">
        <div className="relative w-full max-w-xs">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 text-sm" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search patient or doctor..."
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-[#dde9fc] text-sm focus:outline-none focus:ring-2 focus:ring-[#3EA6E0]"
          />
        </div>
        <span className="text-sm text-gray-400">
          {filteredAppointments.length} of {appointments.length}
        </span>
      </div>

      {filteredAppointments.length === 0 ? (
        <div className="p-8 text-center text-gray-400 text-sm">
          No appointments match "{search}"
        </div>
      ) : (
        <table className="w-full text-left">
          <thead className="bg-[#161654] text-white">
            <tr>
              <th className="px-6 py-4">Patient</th>
              <th className="px-6 py-4">Doctor</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Time</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appointment) => (
              <tr
                key={appointment._id}
                className="border-b border-[#E7EEFC] last:border-0 hover:bg-[#E7EEFC]/30 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="font-medium text-[#161654]">
                    {appointment.patient?.name || "Unknown patient"}
                  </div>
                  <div className="text-xs text-gray-400">{appointment.patient?.email}</div>
                </td>
                <td className="px-6 py-4 text-gray-600">
                  <div className="flex items-center gap-2">
                    <FaUserMd className="text-[#3EA6E0] text-sm" />
                    {appointment.doctor?.name ? `Dr. ${appointment.doctor.name}` : "Unknown doctor"}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-gray-300 text-sm" />
                    {appointment.date}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">
                  <div className="flex items-center gap-2">
                    <FaClock className="text-gray-300 text-sm" />
                    {appointment.time}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${statusBadgeClasses(appointment.status)}`}>
                      {appointment.status}
                    </span>
                    <select
                      value={appointment.status}
                      disabled={updatingId === appointment._id}
                      onChange={(e) => handleStatusChange(appointment._id, e.target.value)}
                      className="px-3 py-2 rounded-lg border border-[#dde9fc] bg-white text-sm disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#3EA6E0]"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    {updatingId === appointment._id && (
                      <span className="text-xs text-gray-400">Saving...</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AdminAppointments;