import React from 'react'

const Doctors = () => {
  return (
    <>
      <section id="doctors" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-widest" style={{ color: "#3EA6E0" }}>
              Trusted Care
            </p>
            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl" style={{ color: "#161654" }}>
              Our Doctors
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="group overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <div className="flex h-64 items-center justify-center overflow-hidden bg-gray-300">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-16 w-16 text-gray-400 transition-transform duration-500 group-hover:scale-110">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
                </svg>
              </div>
              <div className="px-5 py-4" style={{ backgroundColor: "#E7EEFC" }}>
                <p className="text-xs text-gray-500">Doctor&apos;s Name</p>
                <p className="text-lg font-bold" style={{ color: "#161654" }}>
                  NEUROLOGY
                </p>
                <div className="mt-3 flex gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-500 transition-colors duration-300 hover:text-white">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                      <path d="M9 15l6-6" />
                      <path d="M8 8l1.5-1.5a3 3 0 0 1 4.2 4.2L12 12" />
                      <path d="M16 16l-1.5 1.5a3 3 0 0 1-4.2-4.2L12 12" />
                    </svg>
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-500">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                      <path d="M21 12a8 8 0 1 1-3-6.2L21 4l-1 4.3c.6 1.1 1 2.4 1 3.7z" />
                    </svg>
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-500">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                      <rect x="3" y="7" width="18" height="13" rx="2" />
                      <path d="M8 7l1.5-3h5L16 7" />
                      <circle cx="12" cy="13.5" r="3.5" />
                    </svg>
                  </span>
                </div>
              </div>
              <button className="w-full py-3 text-sm font-semibold text-white transition-colors duration-300" style={{ backgroundColor: "#161654" }}>
                View Profile
              </button>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "#dde9fc" }} />
            <span className="h-2 w-6 rounded-full" style={{ backgroundColor: "#161654" }} />
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "#dde9fc" }} />
          </div>
        </div>
      </section>
    </>
  )
}

export default Doctors