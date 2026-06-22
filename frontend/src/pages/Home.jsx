import Doctors from "../components/Doctors";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden bg-white font-sans">  

    <Header/>

      {/* ===================== HERO ===================== */}
      <section
        id="home"
        className="relative overflow-hidden"
        style={{ backgroundColor: "#E7EEFC" }}
      >
        <div
          className="anim-float absolute -left-24 -top-24 h-72 w-72 rounded-full opacity-60"
          style={{ backgroundColor: "#dde9fc" }}
        />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-2 lg:px-8">
          <div className="anim-fadeInUp relative z-10 text-center lg:text-left">
            <p
              className="mb-3 text-sm font-bold uppercase tracking-widest"
              style={{ color: "#3EA6E0" }}
            >
              Caring For Life
            </p>
            <h1
              className="text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl"
              style={{ color: "#161654" }}
            >
              Leading the Way in Medical Excellence
            </h1>
            <button
              className="mt-8 rounded-full px-8 py-3 text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ backgroundColor: "#dde9fc", color: "#161654" }}
            >
              Our Services
            </button>
          </div>

          <div className="anim-fadeIn relative flex justify-center" style={{ animationDelay: "0.3s" }}>
            <div className="flex h-80 w-full max-w-md items-center justify-center rounded-3xl bg-gray-300 shadow-xl sm:h-96">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-20 w-20 text-gray-400">
                <circle cx="9" cy="8" r="3.2" />
                <path d="M3 20c0-3.2 2.8-5 6-5s6 1.8 6 5" />
                <circle cx="17" cy="9" r="2.6" />
                <path d="M14.5 13.2c.6-.2 1.3-.3 2-.3 2.6 0 4.6 1.6 4.6 4.3" />
              </svg>
            </div>
          </div>
        </div>

        {/* Three CTA buttons strip */}
        <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-4 px-4 pb-14 sm:grid-cols-3 sm:px-6 lg:px-8">
          <button
            className="flex items-center justify-center gap-3 rounded-xl px-6 py-5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            style={{ backgroundColor: "#161654" }}
          >
            Book an Appointment
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M3 10h18M8 3v4M16 3v4" />
            </svg>
          </button>
          <button
            className="flex items-center justify-center gap-3 rounded-xl px-6 py-5 text-sm font-semibold shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            style={{ backgroundColor: "#dde9fc", color: "#161654" }}
          >
            Book an Appointment
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <circle cx="9" cy="8" r="3.2" />
              <path d="M3 20c0-3.2 2.8-5 6-5s6 1.8 6 5" />
              <circle cx="17" cy="9" r="2.6" />
              <path d="M14.5 13.2c.6-.2 1.3-.3 2-.3 2.6 0 4.6 1.6 4.6 4.3" />
            </svg>
          </button>
          <button
            className="flex items-center justify-center gap-3 rounded-xl px-6 py-5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            style={{ backgroundColor: "#3EA6E0" }}
          >
            Book an Appointment
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
              <rect x="2" y="6" width="20" height="13" rx="2" />
              <path d="M2 10h20M6 15h4" />
            </svg>
          </button>
        </div>
      </section>

      {/* ===================== WELCOME ===================== */}
      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <p
          className="anim-fadeInUp text-sm font-bold uppercase tracking-widest"
          style={{ color: "#3EA6E0" }}
        >
          Welcome To Meddical
        </p>
        <h2
          className="anim-fadeInUp mt-2 text-3xl font-extrabold sm:text-4xl"
          style={{ color: "#161654", animationDelay: "0.1s" }}
        >
          A Great Place to Receive Care
        </h2>
        <p className="anim-fadeInUp mt-5 text-sm leading-relaxed text-gray-500" style={{ animationDelay: "0.2s" }}>
          We bring together experienced specialists, modern technology, and genuine
          compassion to make every visit comfortable, efficient, and reassuring for
          you and your family. Our goal is simple: care that puts you first.
        </p>
        <a
          href="#about"
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 hover:gap-3"
          style={{ color: "#3EA6E0" }}
        >
          Learn More
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
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

      {/* ===================== SERVICES ===================== */}
      <section id="services" className="px-4 py-16 sm:px-6 lg:px-8" style={{ backgroundColor: "#E7EEFC" }}>
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-widest" style={{ color: "#3EA6E0" }}>
              Care You Can Believe In
            </p>
            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl" style={{ color: "#161654" }}>
              Our Services
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Sidebar */}
            <div className="flex flex-col gap-3 rounded-2xl bg-white p-4 shadow-md lg:col-span-3">
              <div className="flex flex-col items-center gap-2 rounded-xl px-4 py-5 text-center transition-all duration-300 hover:shadow-md" style={{ backgroundColor: "#E7EEFC" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" style={{ color: "#3EA6E0" }}>
                  <path d="M5 4v6a4 4 0 0 0 8 0V4" />
                  <path d="M9 17a4 4 0 0 0 8 0v-3" />
                  <circle cx="19" cy="14" r="2" />
                </svg>
                <p className="text-sm font-semibold" style={{ color: "#161654" }}>
                  Free Checkup
                </p>
              </div>
              <div className="flex flex-col items-center gap-2 rounded-xl px-4 py-5 text-center text-white shadow-md transition-transform duration-300 hover:scale-[1.03]" style={{ backgroundColor: "#161654" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
                  <path d="M20.5 8.5c0 4-8.5 10-8.5 10s-8.5-6-8.5-10A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 8.5 2.5z" />
                  <path d="M5 12h3l1.5-3 2 5 1.5-3H17" />
                </svg>
                <p className="text-sm font-semibold">Cardiology</p>
              </div>
              <div className="flex flex-col items-center gap-2 rounded-xl px-4 py-5 text-center transition-all duration-300 hover:shadow-md" style={{ backgroundColor: "#E7EEFC" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" style={{ color: "#3EA6E0" }}>
                  <path d="M7 3c0 6 10 6 10 12 0 3-3 5-5 6" />
                  <path d="M17 21c0-6-10-6-10-12 0-3 3-5 5-6" />
                  <path d="M8.5 7h7M8.5 17h7" />
                </svg>
                <p className="text-sm font-semibold" style={{ color: "#161654" }}>
                  Dna Testing
                </p>
              </div>
              <div className="flex flex-col items-center gap-2 rounded-xl px-4 py-5 text-center transition-all duration-300 hover:shadow-md" style={{ backgroundColor: "#E7EEFC" }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" style={{ color: "#3EA6E0" }}>
                  <path d="M12 3s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z" />
                </svg>
                <p className="text-sm font-semibold" style={{ color: "#161654" }}>
                  Blood Bank
                </p>
              </div>
              <button
                className="mt-2 rounded-xl py-3 text-sm font-semibold text-white transition-all duration-300 hover:opacity-90"
                style={{ backgroundColor: "#161654" }}
              >
                View All
              </button>
            </div>

            {/* Middle text */}
            <div className="lg:col-span-5">
              <h3 className="text-2xl font-bold" style={{ color: "#161654" }}>
                A passion for putting patients first.
              </h3>
              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0" style={{ color: "#3EA6E0" }}>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M8.5 12.5l2.3 2.3 4.7-5.1" />
                  </svg>
                  A Passion for Healing
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0" style={{ color: "#3EA6E0" }}>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M8.5 12.5l2.3 2.3 4.7-5.1" />
                  </svg>
                  5-Star Care
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0" style={{ color: "#3EA6E0" }}>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M8.5 12.5l2.3 2.3 4.7-5.1" />
                  </svg>
                  All our best
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0" style={{ color: "#3EA6E0" }}>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M8.5 12.5l2.3 2.3 4.7-5.1" />
                  </svg>
                  Believe in Us
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0" style={{ color: "#3EA6E0" }}>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M8.5 12.5l2.3 2.3 4.7-5.1" />
                  </svg>
                  A Legacy of Excellence
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 shrink-0" style={{ color: "#3EA6E0" }}>
                    <circle cx="12" cy="12" r="9" />
                    <path d="M8.5 12.5l2.3 2.3 4.7-5.1" />
                  </svg>
                  Always Caring
                </div>
              </div>
              <p className="mt-6 text-sm leading-relaxed text-gray-500">
                Every member of our team is dedicated to delivering care that&apos;s
                thorough, attentive, and centered entirely on your wellbeing.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-gray-500">
                From routine checkups to specialized treatment, we combine clinical
                expertise with a warm, patient-first approach in everything we do.
              </p>
            </div>

            {/* Images */}
            <div className="flex flex-col gap-4 lg:col-span-4">
              <div className="relative h-40 overflow-hidden rounded-2xl bg-gray-300 shadow-md transition-transform duration-300 hover:scale-[1.02]">
                <div className="flex h-full items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-gray-400">
                    <path d="M5 4v6a4 4 0 0 0 8 0V4" />
                    <path d="M9 17a4 4 0 0 0 8 0v-3" />
                    <circle cx="19" cy="14" r="2" />
                  </svg>
                </div>
                <div className="absolute bottom-0 left-0 h-1.5 w-1/2" style={{ backgroundColor: "#3EA6E0" }} />
              </div>
              <div className="relative h-40 overflow-hidden rounded-2xl bg-gray-300 shadow-md transition-transform duration-300 hover:scale-[1.02]">
                <div className="flex h-full items-center justify-center">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 text-gray-400">
                    <circle cx="9" cy="8" r="3.2" />
                    <path d="M3 20c0-3.2 2.8-5 6-5s6 1.8 6 5" />
                    <circle cx="17" cy="9" r="2.6" />
                    <path d="M14.5 13.2c.6-.2 1.3-.3 2-.3 2.6 0 4.6 1.6 4.6 4.3" />
                  </svg>
                </div>
                <div className="absolute bottom-0 left-0 h-1.5 w-1/2" style={{ backgroundColor: "#3EA6E0" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== SPECIALTIES ===================== */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-widest" style={{ color: "#3EA6E0" }}>
              Always Caring
            </p>
            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl" style={{ color: "#161654" }}>
              Our Specialties
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-gray-100 py-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" style={{ color: "#3EA6E0" }}>
                <path d="M20.5 8.5c0 4-8.5 10-8.5 10s-8.5-6-8.5-10A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 8.5 2.5z" />
                <path d="M5 12h3l1.5-3 2 5 1.5-3H17" />
              </svg>
              <p className="text-sm font-semibold" style={{ color: "#161654" }}>Neurology</p>
            </div>
            <div className="flex flex-col items-center gap-3 rounded-2xl py-8 text-center text-white shadow-md transition-transform duration-300 hover:scale-[1.03]" style={{ backgroundColor: "#161654" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
                <path d="M20.5 8.5c0 4-8.5 10-8.5 10s-8.5-6-8.5-10A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 8.5 2.5z" />
                <path d="M5 12h3l1.5-3 2 5 1.5-3H17" />
              </svg>
              <p className="text-sm font-semibold">Bones</p>
            </div>
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-gray-100 py-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" style={{ color: "#3EA6E0" }}>
                <path d="M20.5 8.5c0 4-8.5 10-8.5 10s-8.5-6-8.5-10A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 8.5 2.5z" />
                <path d="M5 12h3l1.5-3 2 5 1.5-3H17" />
              </svg>
              <p className="text-sm font-semibold" style={{ color: "#161654" }}>Oncology</p>
            </div>
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-gray-100 py-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" style={{ color: "#3EA6E0" }}>
                <path d="M20.5 8.5c0 4-8.5 10-8.5 10s-8.5-6-8.5-10A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 8.5 2.5z" />
                <path d="M5 12h3l1.5-3 2 5 1.5-3H17" />
              </svg>
              <p className="text-sm font-semibold" style={{ color: "#161654" }}>Otorhinolaryngology</p>
            </div>
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-gray-100 py-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" style={{ color: "#3EA6E0" }}>
                <path d="M20.5 8.5c0 4-8.5 10-8.5 10s-8.5-6-8.5-10A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 8.5 2.5z" />
                <path d="M5 12h3l1.5-3 2 5 1.5-3H17" />
              </svg>
              <p className="text-sm font-semibold" style={{ color: "#161654" }}>Ophthalmology</p>
            </div>
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-gray-100 py-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" style={{ color: "#3EA6E0" }}>
                <path d="M20.5 8.5c0 4-8.5 10-8.5 10s-8.5-6-8.5-10A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 8.5 2.5z" />
                <path d="M5 12h3l1.5-3 2 5 1.5-3H17" />
              </svg>
              <p className="text-sm font-semibold" style={{ color: "#161654" }}>Cardiovascular</p>
            </div>
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-gray-100 py-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" style={{ color: "#3EA6E0" }}>
                <path d="M20.5 8.5c0 4-8.5 10-8.5 10s-8.5-6-8.5-10A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 8.5 2.5z" />
                <path d="M5 12h3l1.5-3 2 5 1.5-3H17" />
              </svg>
              <p className="text-sm font-semibold" style={{ color: "#161654" }}>Pulmonology</p>
            </div>
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-gray-100 py-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" style={{ color: "#3EA6E0" }}>
                <path d="M20.5 8.5c0 4-8.5 10-8.5 10s-8.5-6-8.5-10A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 8.5 2.5z" />
                <path d="M5 12h3l1.5-3 2 5 1.5-3H17" />
              </svg>
              <p className="text-sm font-semibold" style={{ color: "#161654" }}>Renal Medicine</p>
            </div>
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-gray-100 py-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" style={{ color: "#3EA6E0" }}>
                <path d="M20.5 8.5c0 4-8.5 10-8.5 10s-8.5-6-8.5-10A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 8.5 2.5z" />
                <path d="M5 12h3l1.5-3 2 5 1.5-3H17" />
              </svg>
              <p className="text-sm font-semibold" style={{ color: "#161654" }}>Gastroenterology</p>
            </div>
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-gray-100 py-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" style={{ color: "#3EA6E0" }}>
                <path d="M20.5 8.5c0 4-8.5 10-8.5 10s-8.5-6-8.5-10A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 8.5 2.5z" />
                <path d="M5 12h3l1.5-3 2 5 1.5-3H17" />
              </svg>
              <p className="text-sm font-semibold" style={{ color: "#161654" }}>Urology</p>
            </div>
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-gray-100 py-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" style={{ color: "#3EA6E0" }}>
                <path d="M20.5 8.5c0 4-8.5 10-8.5 10s-8.5-6-8.5-10A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 8.5 2.5z" />
                <path d="M5 12h3l1.5-3 2 5 1.5-3H17" />
              </svg>
              <p className="text-sm font-semibold" style={{ color: "#161654" }}>Dermatology</p>
            </div>
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-gray-100 py-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7" style={{ color: "#3EA6E0" }}>
                <path d="M20.5 8.5c0 4-8.5 10-8.5 10s-8.5-6-8.5-10A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 8.5 2.5z" />
                <path d="M5 12h3l1.5-3 2 5 1.5-3H17" />
              </svg>
              <p className="text-sm font-semibold" style={{ color: "#161654" }}>Gynaecology</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== APPOINTMENT BOOKING ===================== */}
      <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8" style={{ backgroundColor: "#161654" }}>
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div className="relative">
            <div className="flex h-64 w-full items-center justify-center rounded-2xl bg-white/10 sm:h-80">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-16 w-16 text-white/30">
                <circle cx="9" cy="8" r="3.2" />
                <path d="M3 20c0-3.2 2.8-5 6-5s6 1.8 6 5" />
                <circle cx="17" cy="9" r="2.6" />
                <path d="M14.5 13.2c.6-.2 1.3-.3 2-.3 2.6 0 4.6 1.6 4.6 4.3" />
              </svg>
            </div>
            <div className="absolute -bottom-6 left-1/2 w-3/4 -translate-x-1/2 rounded-2xl bg-white p-6 text-center shadow-xl sm:left-6 sm:w-auto sm:-translate-x-0">
              <h3 className="text-xl font-bold" style={{ color: "#3EA6E0" }}>
                Book an Appointment
              </h3>
              <p className="mt-2 text-xs text-gray-500">
                Schedule a visit with one of our specialists in just a few clicks.
                Tell us a little about your needs and we&apos;ll take care of the rest.
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-2xl bg-white p-6 shadow-xl sm:p-8 lg:mt-0">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                type="text"
                placeholder="Name"
                className="rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-transparent focus:ring-2"
                style={{ "--tw-ring-color": "#3EA6E0" }}
              />
              <div className="relative">
                <select className="w-full appearance-none rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-500 outline-none">
                  <option>Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>

              <input
                type="email"
                placeholder="Email"
                className="rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-transparent focus:ring-2"
              />
              <input
                type="tel"
                placeholder="Phone"
                className="rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-transparent focus:ring-2"
              />

              <div className="relative">
                <select className="w-full appearance-none rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-500 outline-none">
                  <option>Date</option>
                </select>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
              <div className="relative">
                <select className="w-full appearance-none rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-500 outline-none">
                  <option>Time</option>
                </select>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>

              <div className="relative">
                <select className="w-full appearance-none rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-500 outline-none">
                  <option>Doctor</option>
                </select>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
              <div className="relative">
                <select className="w-full appearance-none rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-500 outline-none">
                  <option>Department</option>
                </select>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400">
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
            </div>

            <textarea
              placeholder="Message"
              rows={4}
              className="mt-4 w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none transition-all duration-300 focus:border-transparent focus:ring-2"
            />

            <button
              className="mt-4 w-full rounded-lg py-3 text-sm font-bold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              style={{ backgroundColor: "#3EA6E0" }}
            >
              SUBMIT
            </button>
          </div>
        </div>
      </section>

    <Doctors/> 

      {/* ===================== NEWS ===================== */}
      <section id="news" className="px-4 py-20 sm:px-6 lg:px-8" style={{ backgroundColor: "#E7EEFC" }}>
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-widest" style={{ color: "#3EA6E0" }}>
              Better Information, Better Health
            </p>
            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl" style={{ color: "#161654" }}>
              News
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-20 w-24 flex-shrink-0 items-center justify-center rounded-xl bg-gray-300">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-gray-400">
                  <circle cx="9" cy="8" r="3.2" />
                  <path d="M3 20c0-3.2 2.8-5 6-5s6 1.8 6 5" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium" style={{ color: "#3EA6E0" }}>
                  Monday, 05 September 2021 | By Author
                </p>
                <p className="mt-1 text-sm font-bold" style={{ color: "#161654" }}>
                  This Article&apos;s Title Goes Here, but not too long.
                </p>
                <div className="mt-2 flex items-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    68
                  </span>
                  <span className="flex items-center gap-1">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                      <path d="M12 21s-7-4.5-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z" />
                    </svg>
                    86
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-20 w-24 shrink-0 items-center justify-center rounded-xl bg-gray-300">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-gray-400">
                  <circle cx="9" cy="8" r="3.2" />
                  <path d="M3 20c0-3.2 2.8-5 6-5s6 1.8 6 5" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium" style={{ color: "#3EA6E0" }}>
                  Monday, 05 September 2021 | By Author
                </p>
                <p className="mt-1 text-sm font-bold" style={{ color: "#161654" }}>
                  This Article&apos;s Title Goes Here, but not too long.
                </p>
                <div className="mt-2 flex items-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    68
                  </span>
                  <span className="flex items-center gap-1">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                      <path d="M12 21s-7-4.5-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z" />
                    </svg>
                    86
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-20 w-24 flex-shrink-0 items-center justify-center rounded-xl bg-gray-300">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-gray-400">
                  <circle cx="9" cy="8" r="3.2" />
                  <path d="M3 20c0-3.2 2.8-5 6-5s6 1.8 6 5" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium" style={{ color: "#3EA6E0" }}>
                  Monday, 05 September 2021 | By Author
                </p>
                <p className="mt-1 text-sm font-bold" style={{ color: "#161654" }}>
                  This Article&apos;s Title Goes Here, but not too long.
                </p>
                <div className="mt-2 flex items-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    68
                  </span>
                  <span className="flex items-center gap-1">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                      <path d="M12 21s-7-4.5-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z" />
                    </svg>
                    86
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-20 w-24 flex-shrink-0 items-center justify-center rounded-xl bg-gray-300">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-gray-400">
                  <circle cx="9" cy="8" r="3.2" />
                  <path d="M3 20c0-3.2 2.8-5 6-5s6 1.8 6 5" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium" style={{ color: "#3EA6E0" }}>
                  Monday, 05 September 2021 | By Author
                </p>
                <p className="mt-1 text-sm font-bold" style={{ color: "#161654" }}>
                  This Article&apos;s Title Goes Here, but not too long.
                </p>
                <div className="mt-2 flex items-center gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                      <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    68
                  </span>
                  <span className="flex items-center gap-1">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                      <path d="M12 21s-7-4.5-9.5-9A5 5 0 0 1 12 6a5 5 0 0 1 9.5 6c-2.5 4.5-9.5 9-9.5 9z" />
                    </svg>
                    86
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "#dde9fc" }} />
            <span className="h-2 w-6 rounded-full" style={{ backgroundColor: "#161654" }} />
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "#dde9fc" }} />
          </div>
        </div>
      </section>

      {/* ===================== CONTACT ===================== */}
      <section id="contact" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-widest" style={{ color: "#3EA6E0" }}>
              Get In Touch
            </p>
            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl" style={{ color: "#161654" }}>
              Contact
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ backgroundColor: "#E7EEFC" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" style={{ color: "#3EA6E0" }}>
                <path d="M4 4l4 1 1 4-2 2c1.5 3 3.5 5 6 6l2-2 4 1 1 4c0 1-1 2-2 2-8 0-15-7-15-15 0-1 1-2 2-2z" />
              </svg>
              <p className="mt-4 text-sm font-bold" style={{ color: "#161654" }}>
                EMERGENCY
              </p>
              <p className="mt-1 text-xs text-gray-500">(237) 681-812-255</p>
              <p className="text-xs text-gray-500">(237) 666-331-894</p>
            </div>

            <div className="rounded-2xl p-6 text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl" style={{ backgroundColor: "#161654" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" style={{ color: "#3EA6E0" }}>
                <path d="M12 22s7-7.5 7-12a7 7 0 1 0-14 0c0 4.5 7 12 7 12z" />
                <circle cx="12" cy="10" r="2.5" />
              </svg>
              <p className="mt-4 text-sm font-bold">LOCATION</p>
              <p className="mt-1 text-xs text-blue-100">0123 Some Place</p>
              <p className="text-xs text-blue-100">9876 Some country</p>
            </div>

            <div className="rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ backgroundColor: "#E7EEFC" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" style={{ color: "#3EA6E0" }}>
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
              <p className="mt-4 text-sm font-bold" style={{ color: "#161654" }}>
                EMAIL
              </p>
              <p className="mt-1 text-xs text-gray-500">fldineesoe@gmail.com</p>
              <p className="text-xs text-gray-500">myebstudios@gmail.com</p>
            </div>

            <div className="rounded-2xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg" style={{ backgroundColor: "#E7EEFC" }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6" style={{ color: "#3EA6E0" }}>
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l4 2" />
              </svg>
              <p className="mt-4 text-sm font-bold" style={{ color: "#161654" }}>
                WORKING HOURS
              </p>
              <p className="mt-1 text-xs text-gray-500">Mon-Sat 09:00-20:00</p>
              <p className="text-xs text-gray-500">Sunday Emergency only</p>
            </div>
          </div>
        </div>
      </section>

      <Footer/>
    
    </div>
  );
}