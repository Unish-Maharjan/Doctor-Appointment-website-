import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaChevronDown, FaPhoneAlt, FaLock } from "react-icons/fa";
import Banner from "../components/Banner";
import Contactsection from "../components/Contactsection";
import { useGetDoctorsQuery } from "../services/doctorApi";
import { useCreateAppointmentMutation } from "../services/appointmentApi";

function Appointment() {
  // same auth state AdminRoute uses, so login checks stay consistent app-wide
  const { token, user } = useSelector((state) => state.auth);
  const isLoggedIn = Boolean(token);

  // if arriving from a doctor's profile page (?doctor=<id>), preselect them
  const [searchParams] = useSearchParams();
  const preselectedDoctor = searchParams.get("doctor") || "";

  const { data: doctors, isLoading: doctorsLoading } = useGetDoctorsQuery();
  const [createAppointment, { isLoading: isSubmitting }] = useCreateAppointmentMutation();

  const [formData, setFormData] = useState({
    doctor: preselectedDoctor,
    date: "",
    time: "",
    reason: "",
  });

  const [feedback, setFeedback] = useState(null); // { type: "success" | "error", message }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFeedback(null);

    if (!formData.doctor || !formData.date || !formData.time) {
      setFeedback({ type: "error", message: "Please choose a doctor, date and time." });
      return;
    }

    try {
      await createAppointment(formData).unwrap();
      setFeedback({ type: "success", message: "Your appointment has been booked successfully." });
      setFormData({ doctor: "", date: "", time: "", reason: "" });
    } catch (error) {
      setFeedback({
        type: "error",
        message: error?.data?.message || "Failed to book appointment. Please try again.",
      });
    }
  }

  return (
    <>
      <Banner title="Book an Appointment" image="Appointment.jpg" />
      <div className="min-h-screen bg-white px-4 py-16 md:px-10 lg:px-20">
        <div className="mx-auto flex max-w-295 flex-col gap-10 lg:flex-row">
          {/* Left - Form */}
          <div className="anim-fadeInUp flex-1 [animation-delay:0ms]">
            <h2 className="font-serif text-4xl font-bold text-[#161654]">Book an Appointment</h2>
            <p className="mt-4 max-w-md leading-relaxed text-gray-500">
              Choose a doctor and a time that works for you, and we'll take care of the rest.
            </p>

            {!isLoggedIn ? (
              // user is not logged in, so we block the form and point them to login
              <div className="mt-8 flex flex-col items-start gap-4 rounded-2xl bg-[#161654] px-8 py-10">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/30">
                  <FaLock className="text-white" />
                </div>
                <p className="text-white/90">
                  You need to be logged in to book an appointment.
                </p>
                <Link
                  to="/login"
                  className="rounded-md bg-[#dde9fc] px-6 py-3 font-semibold uppercase tracking-wide text-[#161654] transition-colors duration-300 hover:bg-[#3EA6E0] hover:text-white"
                >
                  Log in to continue
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 overflow-hidden rounded-2xl">
                <div className="bg-[#0f1440] px-5 py-3 text-sm text-white/70">
                  Booking as {user?.name} ({user?.email})
                </div>

                <div className="grid grid-cols-2">
                  <div className="relative col-span-2 border-b border-white/10 bg-[#161654] px-5 py-4">
                    <select
                      name="doctor"
                      value={formData.doctor}
                      onChange={handleChange}
                      className="w-full cursor-pointer appearance-none bg-transparent text-white outline-none"
                    >
                      <option className="bg-[#161654]" value="">
                        {doctorsLoading ? "Loading doctors..." : "Select a doctor"}
                      </option>
                      {doctors?.map((doctor) => (
                        <option className="bg-[#161654]" key={doctor._id} value={doctor._id}>
                          Dr. {doctor.name} — {doctor.specialization}
                        </option>
                      ))}
                    </select>
                    <FaChevronDown className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-white" />
                  </div>

                  <div className="border-b border-r border-white/10 bg-[#161654] px-5 py-4">
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full bg-transparent text-white outline-none [color-scheme:dark]"
                    />
                  </div>
                  <div className="border-b border-white/10 bg-[#161654] px-5 py-4">
                    <input
                      type="time"
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full bg-transparent text-white outline-none [color-scheme:dark]"
                    />
                  </div>

                  <div className="col-span-2 bg-[#161654] px-5 py-4">
                    <textarea
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      placeholder="Reason for visit (optional)"
                      rows="5"
                      className="w-full resize-none bg-transparent text-white placeholder-white outline-none"
                    ></textarea>
                  </div>
                </div>

                {feedback && (
                  <div
                    className={`px-5 py-3 text-sm ${
                      feedback.type === "success"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {feedback.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#dde9fc] py-4 font-semibold uppercase tracking-wide text-[#161654] transition-colors duration-300 hover:bg-[#3EA6E0] hover:text-white disabled:opacity-50"
                >
                  {isSubmitting ? "Booking..." : "Submit"}
                </button>
              </form>
            )}
          </div>

          {/* Right - Schedule */}
          <div className="anim-fadeInUp w-full rounded-2xl bg-[#1B2363] px-10 py-12 [animation-delay:200ms] lg:w-105">
            <h2 className="font-serif text-4xl font-bold text-[#dde9fc]">Schedule hours</h2>

            <div className="mt-8 flex flex-col">
              <div className="grid grid-cols-[110px_24px_1fr] items-center border-b border-white/10 py-3">
                <span className="text-white/90">Monday</span>
                <span className="text-white/40">—</span>
                <span className="text-white/90">09:00 AM - 07:00 PM</span>
              </div>
              <div className="grid grid-cols-[110px_24px_1fr] items-center border-b border-white/10 py-3">
                <span className="text-white/90">Tuesday</span>
                <span className="text-white/40">—</span>
                <span className="text-white/90">09:00 AM - 07:00 PM</span>
              </div>
              <div className="grid grid-cols-[110px_24px_1fr] items-center border-b border-white/10 py-3">
                <span className="text-white/90">Wednesday</span>
                <span className="text-white/40">—</span>
                <span className="text-white/90">09:00 AM - 07:00 PM</span>
              </div>
              <div className="grid grid-cols-[110px_24px_1fr] items-center border-b border-white/10 py-3">
                <span className="text-white/90">Thursday</span>
                <span className="text-white/40">—</span>
                <span className="text-white/90">09:00 AM - 07:00 PM</span>
              </div>
              <div className="grid grid-cols-[110px_24px_1fr] items-center border-b border-white/10 py-3">
                <span className="text-white/90">Friday</span>
                <span className="text-white/40">—</span>
                <span className="text-white/90">09:00 AM - 07:00 PM</span>
              </div>
              <div className="grid grid-cols-[110px_24px_1fr] items-center border-b border-white/10 py-3">
                <span className="text-white/90">Saturday</span>
                <span className="text-white/40">—</span>
                <span className="text-white/90">09:00 AM - 07:00 PM</span>
              </div>
              <div className="grid grid-cols-[110px_24px_1fr] items-center py-3">
                <span className="text-white/90">Sunday</span>
                <span className="text-white/40">—</span>
                <span className="text-white/90">Closed</span>
              </div>
            </div>

            <div className="mt-8 h-px w-3/5 bg-white/20"></div>

            <div className="mt-8 flex items-center gap-4">
              <div className="anim-float flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/30">
                <FaPhoneAlt className="text-white" />
              </div>
              <div>
                <p className="text-lg font-bold text-white">Emergency</p>
                <p className="text-white/80">(977) 9841-399247</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Contactsection />
    </>
  );
}

export default Appointment;