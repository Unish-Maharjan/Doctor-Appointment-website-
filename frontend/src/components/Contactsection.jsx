import React from 'react'

const Contactsection = () => {
  return (
    <>

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

    </>
  )
}

export default Contactsection