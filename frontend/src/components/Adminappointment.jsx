import {
  useGetAllAppointmentsQuery,
  useUpdateAppointmentStatusMutation,
} from "../services/appointmentApi";

const Adminappointments = () => {
  const { data, isLoading, isError } = useGetAllAppointmentsQuery();
  const appointments = data || [];

  const [updateAppointmentStatus] = useUpdateAppointmentStatusMutation();

  async function handleStatusChange(id, status) {
    await updateAppointmentStatus({ id, status });
  }

  if (isLoading) {
    return <p className="text-gray-500">Loading appointments...</p>;
  }

  if (isError) {
    return <p className="text-red-500">Could not load appointments. Check your backend is running.</p>;
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
          {appointments.map((appointment) => (
            <tr key={appointment._id} className="border-b border-[#E7EEFC] last:border-0">
              <td className="px-6 py-4">
                <div className="font-medium text-[#161654]">
                  {appointment.patient?.name || "Unknown patient"}
                </div>
                <div className="text-xs text-gray-400">{appointment.patient?.email}</div>
              </td>
              <td className="px-6 py-4 text-gray-600">
                {appointment.doctor?.name ? `Dr. ${appointment.doctor.name}` : "Unknown doctor"}
              </td>
              <td className="px-6 py-4 text-gray-600">{appointment.date}</td>
              <td className="px-6 py-4 text-gray-600">{appointment.time}</td>
              <td className="px-6 py-4">
                <select
                  value={appointment.status}
                  onChange={(e) => handleStatusChange(appointment._id, e.target.value)}
                  className="px-3 py-2 rounded-lg border border-[#dde9fc] bg-white text-sm"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Adminappointments;