import React from 'react'

const Footer = () => {
  return (
    <>
        <footer className="px-4 pt-16 sm:px-6 lg:px-8" style={{ backgroundColor: "#161654" }}>
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-2xl font-extrabold text-white">
                MED<span style={{ color: "#3EA6E0" }}>DICAL</span>
              </p>
              <p className="mt-3 text-sm text-blue-100/70">
                Leading the Way in Medical Excellence, Trusted Care.
              </p>
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-white">
                Important Links
              </p>
              <div className="mt-4 flex flex-col gap-2 text-sm text-blue-100/70">
                <a href="#appointment" className="transition-colors duration-300 hover:text-white">
                  Appointment
                </a>
                <a href="#doctors" className="transition-colors duration-300 hover:text-white">
                  Doctors
                </a>
                <a href="#services" className="transition-colors duration-300 hover:text-white">
                  Services
                </a>
                <a href="#about" className="transition-colors duration-300 hover:text-white">
                  About Us
                </a>
              </div>
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-white">
                Contact Us
              </p>
              <div className="mt-4 flex flex-col gap-2 text-sm text-blue-100/70">
                <p>Call: (237) 681-812-255</p>
                <p>Email: fldineesoe@gmail.com</p>
                <p>Address: 0123 Some place, Some country</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-white">
                Newsletter
              </p>
              <p className="mt-4 text-sm text-blue-100/70">
                Subscribe to get the latest health tips and clinic updates.
              </p>
              <div className="mt-4 flex items-center overflow-hidden rounded-full bg-white/10 pl-4">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="w-full bg-transparent py-3 text-sm text-white placeholder:text-blue-100/50 outline-none"
                />
                <button
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full m-1 transition-transform duration-300 hover:scale-110"
                  style={{ backgroundColor: "#3EA6E0" }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-white">
                    <path d="M21 3L3 10.5l7 2.5 2.5 7L21 3z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 py-6 text-xs text-blue-100/60 sm:flex-row">
            <p>© 2026 Hospital&apos;s name. All Rights Reserved by PNTEC-LTD</p>
            <div className="flex gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-colors duration-300 hover:bg-white/20">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-white">
                  <path d="M9 15l6-6" />
                  <path d="M8 8l1.5-1.5a3 3 0 0 1 4.2 4.2L12 12" />
                  <path d="M16 16l-1.5 1.5a3 3 0 0 1-4.2-4.2L12 12" />
                </svg>
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-colors duration-300 hover:bg-white/20">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-white">
                  <path d="M21 12a8 8 0 1 1-3-6.2L21 4l-1 4.3c.6 1.1 1 2.4 1 3.7z" />
                </svg>
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-colors duration-300 hover:bg-white/20">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-white">
                  <rect x="3" y="7" width="18" height="13" rx="2" />
                  <path d="M8 7l1.5-3h5L16 7" />
                  <circle cx="12" cy="13.5" r="3.5" />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer