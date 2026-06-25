import Contactsection from "../components/Contactsection";
import Doctors from "../components/Doctors";
import Footer from "../components/Footer";
import Header from "../components/Header";
import News from "../components/News";
import { FaStethoscope, FaHeartbeat, FaDna, FaTint, FaCheckCircle,
   FaChevronDown, FaEye, FaHeart, FaCalendarAlt, FaUserMd, FaCreditCard, FaArrowRight } from "react-icons/fa";
import { productApi } from "../services/product";

export default function Home() {

  const { data, error, isLoading } = productApi.useGetProductByNameQuery();

  console.log("Data:", data);
 

  return (
    <div className="w-full overflow-x-hidden bg-white font-sans">  

      {/*HERO*/}
      <section
        id="home"
        className="relative overflow-hidden bg-[url('/home.jpg')] bg-cover bg-center bg-no-repeat"
      >
        <div className="absolute inset-0 bg-white/30"></div>
  
        <div className="anim-float absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#3EA6E0]/30 blur-3xl"></div>
  
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 lg:grid-cols-2 lg:px-8">
          {/* Left Content */}
          <div className="anim-fadeInUp text-center lg:text-left">
            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[#3EA6E0]">
              Caring For Life
            </p>
  
            <h1 className="text-4xl font-extrabold leading-tight text-[#161654] sm:text-5xl md:text-6xl">
              Leading the Way in Medical Excellence
            </h1>
  
            <p className="mt-5 text-gray-600">
              Providing quality healthcare with experienced doctors and modern medical facilities.
            </p>
  
            <button className="mt-8 rounded-full bg-[#dde9fc] px-8 py-3 font-semibold text-[#161654] transition hover:scale-105">
              Our Services
            </button>
          </div>
        </div>
  
        {/* CTA Buttons */}
        <div className="anim-fadeInUp relative mx-auto grid max-w-6xl gap-4 px-4 pb-14 [animation-delay:200ms] sm:grid-cols-3 lg:px-8">
          <button className="flex items-center justify-center gap-3 rounded-xl bg-[#161654] px-6 py-5 font-semibold text-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
            <FaCalendarAlt size={18} />
            Book Appointment
          </button>
  
          <button className="flex items-center justify-center gap-3 rounded-xl bg-[#dde9fc] px-6 py-5 font-semibold text-[#161654] shadow-md transition hover:-translate-y-1 hover:shadow-xl">
            <FaUserMd size={18} />
            Find Doctors
          </button>
  
          <button className="flex items-center justify-center gap-3 rounded-xl bg-[#3EA6E0] px-6 py-5 font-semibold text-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">
            <FaCreditCard size={18} />
            Insurance & Billing
          </button>
        </div>
      </section>

      {/*WELCOME*/}
      <section className="mx-auto max-w-4xl px-4 py-16 text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-[#3EA6E0]">
          Welcome To Meddical
        </p>

        <h2 className="mt-2 text-3xl font-extrabold text-[#161654] sm:text-4xl">
          A Great Place to Receive Care
        </h2>

        <p className="mt-5 leading-relaxed text-gray-500">
          We bring together experienced specialists, modern technology, and genuine
          compassion to make every visit comfortable, efficient, and reassuring for
          you and your family. Our goal is simple: care that puts you first.
        </p>

        <a
          href="#about"
          className="mt-6 inline-flex items-center gap-2 font-semibold text-[#3EA6E0] transition-all hover:gap-3"
        >
          Learn More
          <FaArrowRight size={12} />
        </a>
      </section>

      <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="relative h-56 w-full overflow-hidden rounded-2xl bg-gray-300 shadow-md transition-transform duration-500 hover:scale-[1.01] sm:h-72 md:h-80">
          <div className="flex h-full w-full items-center justify-center">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-16 w-16 text-gray-400">
              <circle cx="9" cy="8" r="3.2" />
              <path d="M3 20c0-3.2 2.8-5 6-5s6 1.8 6 5" />
              <circle cx="17" cy="9" r="2.6" />
              <path d="M14.5 13.2c.6-.2 1.3-.3 2-.3 2.6 0 4.6 1.6 4.6 4.3" />
            </svg>
          </div>
          <div className="absolute bottom-0 left-0 h-1.5 w-2/3" style={{ backgroundColor: "#3EA6E0" }} />
        </div>
      </div>

      {/*SERVICES*/}
      <section id="services" className="bg-[#E7EEFC] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-[#3EA6E0]">
              Care You Can Believe In
            </p>
            <h2 className="mt-2 text-3xl font-extrabold text-[#161654] sm:text-4xl">Our Services</h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Sidebar */}
            <div className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-md lg:col-span-3">
              <div className="flex flex-col items-center gap-2 rounded-xl bg-[#E7EEFC] px-4 py-5 text-center transition hover:shadow-md">
                <FaStethoscope className="text-[#3EA6E0]" size={26} />
                <p className="text-sm font-semibold text-[#161654]">Free Checkup</p>
              </div>

              <div className="flex flex-col items-center gap-2 rounded-xl bg-[#161654] px-4 py-5 text-center text-white shadow-md transition hover:scale-[1.03]">
                <FaHeartbeat size={26} />
                <p className="text-sm font-semibold">Cardiology</p>
              </div>

              <div className="flex flex-col items-center gap-2 rounded-xl bg-[#E7EEFC] px-4 py-5 text-center transition hover:shadow-md">
                <FaDna className="text-[#3EA6E0]" size={26} />
                <p className="text-sm font-semibold text-[#161654]">Dna Testing</p>
              </div>

              <div className="flex flex-col items-center gap-2 rounded-xl bg-[#E7EEFC] px-4 py-5 text-center transition hover:shadow-md">
                <FaTint className="text-[#3EA6E0]" size={26} />
                <p className="text-sm font-semibold text-[#161654]">Blood Bank</p>
              </div>

              <button className="mt-2 rounded-xl bg-[#161654] py-3 text-sm font-semibold text-white transition hover:opacity-90">
                View All
              </button>
            </div>

            {/* Middle text */}
            <div className="lg:col-span-5">
              <h3 className="text-2xl font-bold text-[#161654]">
                A passion for putting patients first.
              </h3>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaCheckCircle className="text-[#3EA6E0]" size={14} />
                  A Passion for Healing
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaCheckCircle className="text-[#3EA6E0]" size={14} />
                  5-Star Care
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaCheckCircle className="text-[#3EA6E0]" size={14} />
                  All our best
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaCheckCircle className="text-[#3EA6E0]" size={14} />
                  Believe in Us
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaCheckCircle className="text-[#3EA6E0]" size={14} />
                  A Legacy of Excellence
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <FaCheckCircle className="text-[#3EA6E0]" size={14} />
                  Always Caring
                </div>
              </div>

              <p className="mt-6 text-sm leading-relaxed text-gray-500">
                Every member of our team is dedicated to delivering care that's
                thorough, attentive, and centered entirely on your wellbeing.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                From routine checkups to specialized treatment, we combine clinical
                expertise with a warm, patient-first approach in everything we do.
              </p>
            </div>

            {/* Images */}
            <div className="flex flex-col gap-4 lg:col-span-4">
              <div className="relative h-40 overflow-hidden rounded-2xl bg-gray-300 shadow-md transition hover:scale-[1.02]">
                <div className="absolute bottom-0 left-0 h-1.5 w-1/2 bg-[#3EA6E0]"></div>
              </div>
              <div className="relative h-40 overflow-hidden rounded-2xl bg-gray-300 shadow-md transition hover:scale-[1.02]">
                <div className="absolute bottom-0 left-0 h-1.5 w-1/2 bg-[#3EA6E0]"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*Doctors*/}
      <Doctors/>

      {/* APPOINTMENT BOOKING  */}
      <section className="relative overflow-hidden bg-[#161654] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div className="relative">
            <div className="h-64 w-full rounded-2xl bg-white/10 sm:h-80"></div>

            <div className="absolute -bottom-6 left-1/2 w-3/4 -translate-x-1/2 rounded-2xl bg-white p-6 text-center shadow-xl sm:left-6 sm:w-auto sm:-translate-x-0">
              <h3 className="text-xl font-bold text-[#3EA6E0]">Book an Appointment</h3>
              <p className="mt-2 text-xs text-gray-500">
                Schedule a visit with one of our specialists in just a few clicks.
                Tell us a little about your needs and we'll take care of the rest.
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-2xl bg-white p-6 shadow-xl sm:p-8 lg:mt-0">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                type="text"
                placeholder="Name"
                className="rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-[#3EA6E0]"
              />

              <div className="relative">
                <select className="w-full appearance-none rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-500 outline-none">
                  <option>Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
                <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={12} />
              </div>

              <input
                type="email"
                placeholder="Email"
                className="rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-[#3EA6E0]"
              />
              <input
                type="tel"
                placeholder="Phone"
                className="rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-[#3EA6E0]"
              />

              <div className="relative">
                <select className="w-full appearance-none rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-500 outline-none">
                  <option>Date</option>
                </select>
                <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={12} />
              </div>
              <div className="relative">
                <select className="w-full appearance-none rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-500 outline-none">
                  <option>Time</option>
                </select>
                <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={12} />
              </div>

              <div className="relative">
                <select className="w-full appearance-none rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-500 outline-none">
                  <option>Doctor</option>
                </select>
                <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={12} />
              </div>
              <div className="relative">
                <select className="w-full appearance-none rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-500 outline-none">
                  <option>Department</option>
                </select>
                <FaChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={12} />
              </div>
            </div>

            <textarea
              placeholder="Message"
              rows={4}
              className="mt-4 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-transparent focus:ring-2 focus:ring-[#3EA6E0]"
            />

            <button className="mt-4 w-full rounded-lg bg-[#3EA6E0] py-3 text-sm font-bold text-white transition hover:scale-[1.02] hover:shadow-lg">
              SUBMIT
            </button>
          </div>
        </div>
      </section>

      {/* News Section */}
      <News/>

      {/* Contact Section */}
      <Contactsection/>

    
    </div>
  );
}