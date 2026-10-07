import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaPhoneAlt, FaClock, FaMapMarkerAlt, FaBars, FaTimes, FaUser, FaSignOutAlt, FaTachometerAlt, FaFileInvoiceDollar } from 'react-icons/fa'
import { logout } from '../Authslice'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const user = useSelector((state) => state.auth.user)

  // nav links live here once, used for both desktop and mobile so they can't drift apart
  const navLinks = [
    { to: '/home', label: 'Home' },
    { to: '/about', label: 'About us' },
    { to: '/services', label: 'Services' },
    { to: '/doctors', label: 'Doctors' },
    { to: '/news', label: 'News' },
    { to: '/contact', label: 'Contact' },
  ]

  function handleLogout() {
    dispatch(logout())
    navigate("/login")
  }

  // lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      {/* skip link - lets keyboard users jump past the header straight to page content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:text-[#161654] focus:px-4 focus:py-2 focus:rounded"
      >
        Skip to main content
      </a>

      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
          <Link to="/home" className="text-2xl font-extrabold">
            <span className="text-[#161654]">MED</span>
            <span className="text-[#3EA6E0]">DICAL</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-full bg-[#E7EEFC] text-[#3EA6E0] flex items-center justify-center">
                <FaPhoneAlt size={14} />
              </span>
              <div className="text-xs">
                <p className="text-gray-400 font-semibold uppercase tracking-wide">Emergency</p>
                <a href="tel:+9779841399247" className="text-[#161654] font-bold hover:text-[#3EA6E0] transition-colors">
                  (977) 9841399247
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-full bg-[#E7EEFC] text-[#3EA6E0] flex items-center justify-center">
                <FaClock size={14} />
              </span>
              <div className="text-xs">
                <p className="text-gray-400 font-semibold uppercase tracking-wide">Work Hour</p>
                <p className="text-[#161654] font-bold">09:00 - 20:00 Everyday</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="w-9 h-9 rounded-full bg-[#E7EEFC] text-[#3EA6E0] flex items-center justify-center">
                <FaMapMarkerAlt size={14} />
              </span>
              <div className="text-xs">
                <p className="text-gray-400 font-semibold uppercase tracking-wide">Location</p>
                <p className="text-[#161654] font-bold">Kathmandu, Nepal</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav className="sticky top-0 z-100 bg-[#161654] shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between relative">
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  aria-current={isActive ? 'page' : undefined}
                  className={`pb-1 transition-colors ${
                    isActive ? 'border-b-2 border-white text-white' : 'text-blue-100 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>

          {/* Desktop right side */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/appointment"
              className="bg-[#3EA6E0] text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:scale-105 hover:shadow-lg transition"
            >
              Appointment
            </Link>

            {user ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/my-bills"
                  className="text-white text-sm font-semibold px-4 py-2.5 rounded-full hover:scale-105 hover:shadow-lg transition flex items-center gap-2 bg-[#3EA6E0]/20 border border-[#3EA6E0]/40"
                >
                  <FaFileInvoiceDollar size={16} />
                  <span>My Bills</span>
                </Link>

                {user.role === "admin" && (
                  <Link
                    to="/dashboard"
                    className="text-white text-sm font-semibold px-4 py-2.5 rounded-full hover:scale-105 hover:shadow-lg transition flex items-center gap-2"
                  >
                    <FaTachometerAlt size={18} />
                    <span>Dashboard</span>
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-white text-sm font-semibold px-4 py-2.5 rounded-full hover:scale-105 hover:shadow-lg transition"
                  aria-label="Log Out"
                >
                  <FaSignOutAlt size={22} />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:scale-105 hover:shadow-lg transition"
                aria-label="Log In"
              >
                <FaUser size={22} />
              </Link>
            )}
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div
              id="mobile-menu"
              className="absolute top-full left-0 w-full bg-[#1B2363] flex flex-col gap-4 px-4 py-5 text-sm font-medium text-white md:hidden"
            >
              {navLinks.map((link) => {
                const isActive = location.pathname === link.to
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isActive ? 'page' : undefined}
                    className={isActive ? 'text-white font-bold' : 'text-blue-100'}
                  >
                    {link.label}
                  </Link>
                )
              })}

              <Link
                to="/appointment"
                onClick={() => setMenuOpen(false)}
                className="bg-[#3EA6E0] text-white text-sm font-semibold px-6 py-2.5 rounded-full w-fit mt-2"
              >
                Appointment
              </Link>

              {user ? (
                <>
                  <Link
                    to="/my-bills"
                    onClick={() => setMenuOpen(false)}
                    className="text-white text-sm font-semibold px-4 py-2.5 rounded-full w-fit flex items-center gap-2 bg-[#3EA6E0]/20"
                  >
                    <FaFileInvoiceDollar size={16} />
                    <span>My Bills</span>
                  </Link>

                  {user.role === "admin" && (
                    <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="flex items-center gap-2">
                      <FaTachometerAlt size={16} />
                      <span>Dashboard</span>
                    </Link>
                  )}
                  <button
                    onClick={() => { handleLogout(); setMenuOpen(false); }}
                    className="text-white text-sm font-semibold px-6 py-2.5 rounded-full w-fit flex items-center gap-2 bg-red-500"
                  >
                    <FaSignOutAlt size={16} /> Log Out
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-white text-sm font-semibold px-6 py-2.5 rounded-full w-fit flex items-center gap-2"
                >
                  <FaUser size={16} /> Log In
                </Link>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  )
}

export default Header