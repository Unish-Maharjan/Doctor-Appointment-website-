import { FaQuoteRight, FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaClock, FaLinkedinIn, FaFacebookF, FaInstagram, FaEye, FaHeart } from "react-icons/fa";
import Doctors from "../components/Doctors";
import Contactsection from "../components/Contactsection";
import News from "../components/News";
import Banner from "../components/Banner";

export default function About() {
  return (
    <div>

      {/* Banner */}
      <Banner title="About Us" />

      {/* Welcome section */}
      <section className="px-6 md:px-20 py-16 flex flex-col md:flex-row gap-10 items-center">
        <div className="w-full md:w-1/2 h-96 bg-gray-200 rounded"></div>

        <div className="w-full md:w-1/2">
          <p className="text-[#3EA6E0] font-semibold text-sm mb-2">WELCOME TO HOSPITAL NAME</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1B2363] mb-6">
            Best Care for Your Good Health
          </h2>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#3EA6E0]"></span>
              <span className="text-gray-700">A Passion for Healing</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#3EA6E0]"></span>
              <span className="text-gray-700">5-Star Care</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#3EA6E0]"></span>
              <span className="text-gray-700">All our best</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#3EA6E0]"></span>
              <span className="text-gray-700">Believe in Us</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#3EA6E0]"></span>
              <span className="text-gray-700">Always Caring</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#3EA6E0]"></span>
              <span className="text-gray-700">A Legacy of Excellence</span>
            </div>
          </div>

          <p className="text-gray-600 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat
            scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare
            ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in.
            Consequat faucibus porttitor enim et.
          </p>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat
            scelerisque. Convallis felis vitae tortor augue. Velit nascetur proin massa in.
          </p>
        </div>
      </section>

      {/* Quote / testimonial section */}
      <section className="relative bg-[#1B2363] py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gray-400 opacity-20"></div>

        <div className="relative max-w-2xl mx-auto">
          <FaQuoteRight className="text-white mx-auto mb-6" size={40} />
          <p className="text-white text-lg md:text-xl mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat
            scelerisque tortor ornare ornare. Quisque placerat scelerisque felis vitae
            tortor augue. Velit nascetur Consequat faucibus porttitor enim et.
          </p>
          <div className="w-12 h-px bg-white mx-auto mb-4"></div>
          <p className="text-white font-medium mb-6">John Doe</p>

          <div className="flex justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white"></span>
            <span className="w-2 h-2 rounded-full bg-[#3EA6E0]"></span>
            <span className="w-2 h-2 rounded-full bg-white/40"></span>
          </div>
        </div>
      </section>

      <Doctors/>
      <News/>
      <Contactsection/>

    </div>
  );
}