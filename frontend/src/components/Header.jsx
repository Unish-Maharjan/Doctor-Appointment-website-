import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
        
      <div className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-3 sm:px-6 md:flex-row lg:px-8">
          <a href="#home" className="text-2xl font-extrabold tracking-tight">
            <span style={{ color: "#161654" }}>MED</span>
            <span style={{ color: "#3EA6E0" }}>DICAL</span>
          </a>

          <div className="hidden flex-wrap items-center gap-6 md:flex">
            <div className="flex items-center gap-2">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full"
                style={{ backgroundColor: "#E7EEFC" }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" style={{ color: "#3EA6E0" }}>
                  <path d="M4 4l4 1 1 4-2 2c1.5 3 3.5 5 6 6l2-2 4 1 1 4c0 1-1 2-2 2-8 0-15-7-15-15 0-1 1-2 2-2z" />
                </svg>
              </span>
              <div className="text-xs leading-tight">
                <p className="font-semibold uppercase tracking-wide text-gray-400">
                  Emergency
                </p>
                <p className="font-bold" style={{ color: "#161654" }}>
                  (237) 681-812-255
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full"
                style={{ backgroundColor: "#E7EEFC" }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" style={{ color: "#3EA6E0" }}>
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l4 2" />
                </svg>
              </span>
              <div className="text-xs leading-tight">
                <p className="font-semibold uppercase tracking-wide text-gray-400">
                  Work Hour
                </p>
                <p className="font-bold" style={{ color: "#161654" }}>
                  09:00 - 20:00 Everyday
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span
                className="flex h-9 w-9 items-center justify-center rounded-full"
                style={{ backgroundColor: "#E7EEFC" }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4" style={{ color: "#3EA6E0" }}>
                  <path d="M12 22s7-7.5 7-12a7 7 0 1 0-14 0c0 4.5 7 12 7 12z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              </span>
              <div className="text-xs leading-tight">
                <p className="font-semibold uppercase tracking-wide text-gray-400">
                  Location
                </p>
                <p className="font-bold" style={{ color: "#161654" }}>
                  0123 Some Place
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <nav
        className="sticky top-0 z-50 shadow-md"
        style={{ backgroundColor: "#161654" }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="hidden items-center gap-8 text-sm font-medium text-white md:flex">
            <Link to="/home" className="relative border-b-2 border-white pb-1">
              Home
            </Link>
            <Link
              to="/about"
              className="relative pb-1 text-blue-100 transition-colors hover:text-white"
            >
              About us
            </Link>
            <Link
              to="/services"
              className="relative pb-1 text-blue-100 transition-colors hover:text-white"
            >
              Services
            </Link>
            <a
              href="#doctors"
              className="relative pb-1 text-blue-100 transition-colors hover:text-white"
            >
              Doctors
            </a>
            <a
              href="#news"
              className="relative pb-1 text-blue-100 transition-colors hover:text-white"
            >
              News
            </a>
            <a
              href="#contact"
              className="relative pb-1 text-blue-100 transition-colors hover:text-white"
            >
              Contact
            </a>
          </div>

          <input type="checkbox" id="mobile-nav-toggle" className="peer hidden" />
          <label
            htmlFor="mobile-nav-toggle"
            className="cursor-pointer text-white md:hidden"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-7 w-7">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>

          <div className="hidden items-center gap-5 md:flex">
            <button className="rounded-full p-2 text-white transition-transform duration-300 hover:scale-110">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
                <circle cx="11" cy="11" r="7" />
                <path d="M21 21l-4.3-4.3" />
              </svg>
            </button>
            <button
              className="rounded-full px-6 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ backgroundColor: "#3EA6E0" }}
            >
              Appointment
            </button>
          </div>

          <div className="absolute left-0 top-full hidden w-full flex-col gap-4 px-4 py-5 text-sm font-medium text-white peer-checked:flex md:hidden" style={{ backgroundColor: "#1B2363" }}>
            <a href="#home">Home</a>
            <a href="#about">About us</a>
            <a href="#services">Services</a>
            <a href="#doctors">Doctors</a>
            <a href="#news">News</a>
            <a href="#contact">Contact</a>
            <button
              className="mt-2 w-fit rounded-full px-6 py-2.5 text-sm font-semibold text-white"
              style={{ backgroundColor: "#3EA6E0" }}
            >
              Appointment
            </button>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header