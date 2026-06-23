import React from "react";
import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaClock } from "react-icons/fa";
import Banner from "../components/Banner";
import News from "../components/News";

function Contact() {
  return (
    <>
    <Banner title="Contact Us" />

    <section className="px-6 py-16 max-w-6xl mx-auto">
      {/* map placeholder */}
      <div className="anim-fadeIn w-full h-72 bg-gray-300 rounded-2xl shadow-md -mb-16 relative z-0">
        <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14547.78727226663!2d85.27925359157827!3d27.67371941360972!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2snp!4v1782190510924!5m2!1sen!2snp" className="w-full h-full rounded-2xl" />

      </div>

      {/* heading */}
      <div className="relative z-10 anim-fadeInUp mt-30">
        <p className="font-bold uppercase text-sm tracking-wide mb-2 text-[#3EA6E0]">Get In Touch</p>
        <h2 className="text-3xl font-bold mb-10 text-[#161654]">Contact</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* form */}
        <div className="anim-fadeInUp delay-150 rounded-2xl p-8 bg-[#1B2363]">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              placeholder="Name"
              className="px-4 py-3 rounded-lg outline-none text-sm w-full bg-[#E7EEFC] text-[#161654]"
            />
            <input
              type="email"
              placeholder="Email"
              className="px-4 py-3 rounded-lg outline-none text-sm w-full bg-[#E7EEFC] text-[#161654]"
            />
          </div>

          <input
            type="text"
            placeholder="Subject"
            className="px-4 py-3 rounded-lg outline-none text-sm w-full mb-4 bg-[#E7EEFC] text-[#161654]"
          />

          <textarea
            placeholder="Message"
            rows="5"
            className="px-4 py-3 rounded-lg outline-none text-sm w-full mb-6 resize-none bg-[#E7EEFC] text-[#161654]"
          ></textarea>

          <button className="w-full py-3 rounded-lg font-semibold transition hover:opacity-90 bg-[#3EA6E0] text-white">
            SUBMIT
          </button>
        </div>

        {/* info cards */}
        <div className="grid grid-cols-2 gap-6">
          {/* emergency */}
          <div className="anim-fadeInUp delay-300 rounded-2xl p-6 bg-[#dde9fc]">
            <div className="anim-float w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-[#3EA6E0]">
              <FaPhoneAlt className="text-white" />
            </div>

            <h3 className="font-bold mb-2 text-[#161654]">Emergency</h3>
            <p className="text-sm text-[#1B2363]">(977) 9841-399247</p>
            <p className="text-sm text-[#1B2363]">(977) 9841-399247</p>
          </div>

          {/* location */}
          <div className="anim-fadeInUp delay-400 rounded-2xl p-6 bg-[#1B2363]">
            <div className="anim-float w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-[#3EA6E0]">
              <FaMapMarkerAlt className="text-white" />
            </div>
            <h3 className="font-bold mb-2 text-white">Location</h3>
            <p className="text-sm text-[#dde9fc]">09 Kirtipur</p>
            <p className="text-sm text-[#dde9fc]">977 Nepal</p>
          </div>

          {/* email */}
          <div className="anim-fadeInUp delay-500 rounded-2xl p-6 bg-[#dde9fc]">
            <div className="anim-float w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-[#3EA6E0]">
              <FaEnvelope className="text-white" />
            </div>
            <h3 className="font-bold mb-2 text-[#161654]">Email</h3>
            <p className="text-sm text-[#1B2363]">uniqueunish93@gmail.com</p>
            <p className="text-sm text-[#1B2363]">hospital@gmail.com</p>
          </div>

          {/* working hours */}
          <div className="anim-fadeInUp delay-600 rounded-2xl p-6 bg-[#1B2363]">
            <div className="anim-float w-12 h-12 rounded-full flex items-center justify-center mb-4 bg-[#3EA6E0]">
              <FaClock className="text-white" />
            </div>
            <h3 className="font-bold mb-2 text-white">Working Hours</h3>
            <p className="text-sm text-[#dde9fc]">Mon-Sat 09:00-20:00</p>
            <p className="text-sm text-[#dde9fc]">Sunday: Emergency only</p>
          </div>
        </div>
      </div>
    </section>

    <News/>
    </>
  );
}

export default Contact;