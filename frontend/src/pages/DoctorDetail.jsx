import { Link, useParams } from "react-router-dom";
import { FaCalendarDay, FaClock, FaArrowLeft, FaStethoscope } from "react-icons/fa";
import Banner from "../components/Banner";
import { useGetDoctorsQuery } from "../services/doctorApi";

function DoctorDetail() {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetDoctorsQuery();
  const doctors = data || [];

  const doctor = doctors.find((item) => item._id === id);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-gray-500">Loading doctor profile...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-red-500">Could not load this profile. Check your backend is running.</p>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
        <p className="text-gray-500">This doctor doesn't exist or may have been removed.</p>
        <Link
          to="/doctors"
          className="flex items-center gap-2 font-semibold text-[#3EA6E0] hover:underline"
        >
          <FaArrowLeft /> Back to Doctors
        </Link>
      </div>
    );
  }

  return (
    <>
      <Banner title={doctor.name} image="Doctors.jpg" />

      <div className="mx-auto max-w-5xl px-4 py-16 md:px-0">
        <Link
          to="/doctors"
          className="anim-fadeIn mb-8 flex items-center gap-2 text-sm font-semibold text-[#3EA6E0] hover:underline"
        >
          <FaArrowLeft /> Back to Doctors
        </Link>

        <div className="anim-fadeInUp flex flex-col gap-10 md:flex-row">
          {/* Photo */}
          <div className="w-full shrink-0 md:w-72">
            {doctor.photo ? (
              <img
                src={doctor.photo}
                alt={doctor.name}
                className="aspect-square w-full rounded-2xl object-cover shadow-md"
              />
            ) : (
              <div className="aspect-square w-full rounded-2xl bg-gray-200" />
            )}
          </div>

          {/* Info */}
          <div className="flex-1">
            <p className="flex items-center gap-2 font-bold uppercase tracking-wide text-[#3EA6E0]">
              <FaStethoscope /> {doctor.specialization}
            </p>
            <h1 className="mt-2 font-serif text-3xl font-bold text-[#161654] md:text-4xl">
              {doctor.name}
            </h1>

            {doctor.bio && (
              <p className="mt-6 leading-relaxed text-gray-600">{doctor.bio}</p>
            )}

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl bg-[#E7EEFC] p-5">
                <div className="flex items-center gap-2 font-semibold text-[#161654]">
                  <FaCalendarDay className="text-[#3EA6E0]" /> Available Days
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  {doctor.availableDays?.length ? doctor.availableDays.join(", ") : "Not specified"}
                </p>
              </div>

              <div className="rounded-xl bg-[#E7EEFC] p-5">
                <div className="flex items-center gap-2 font-semibold text-[#161654]">
                  <FaClock className="text-[#3EA6E0]" /> Available Time
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  {doctor.availableTime || "Not specified"}
                </p>
              </div>
            </div>

            <Link
              to={`/appointment?doctor=${doctor._id}`}
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#161654] px-8 py-3 font-semibold text-white transition-colors duration-300 hover:bg-[#3EA6E0]"
            >
              Book an Appointment
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default DoctorDetail;