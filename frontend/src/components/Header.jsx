import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaPhoneAlt, FaClock, FaMapMarkerAlt, FaBars, FaTimes, FaUser, FaSignOutAlt, FaTachometerAlt } from 'react-icons/fa'
import { logout } from '../Authslice'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state) => state.auth.user)

  function handleLogout() {
    dispatch(logout())
    navigate("/login")
  }

  return (
    <>
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
                <p className="text-[#161654] font-bold">(977) 9841399247</p>
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

      <nav className="sticky top-0 z-30 bg-[#161654] shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between relative">
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white">
            <Link to="/home" className="border-b-2 border-white pb-1">Home</Link>
            <Link to="/about" className="text-blue-100 hover:text-white pb-1">About us</Link>
            <Link to="/services" className="text-blue-100 hover:text-white pb-1">Services</Link>
            <Link to="/doctors" className="text-blue-100 hover:text-white pb-1">Doctors</Link>
            <Link to="/news" className="text-blue-100 hover:text-white pb-1">News</Link>
            <Link to="/contact" className="text-blue-100 hover:text-white pb-1">Contact</Link>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white">
            {menuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>

          {/* Desktop right side */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/appointment">
              <button className="bg-[#3EA6E0] text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:scale-105 hover:shadow-lg transition">
                Appointment
              </button>
            </Link>

            {user ? (
              <div className="flex items-center gap-2">
                {user.role === "admin" && (
                  <Link to="/dashboard">
                    <button className="text-white text-sm font-semibold px-4 py-2.5 rounded-full hover:scale-105 hover:shadow-lg transition flex items-center gap-2">
                      <FaTachometerAlt size={18} />
                      <span>Dashboard</span>
                    </button>
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-white text-sm font-semibold px-4 py-2.5 rounded-full hover:scale-105 hover:shadow-lg transition"
                  title="Log Out"
                >
                  <FaSignOutAlt size={22} />
                </button>
              </div>
            ) : (
              <Link to="/login">
                <button className="text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:scale-105 hover:shadow-lg transition">
                  <FaUser size={22} />
                </button>
              </Link>
            )}
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div className="absolute top-full left-0 w-full bg-[#1B2363] flex flex-col gap-4 px-4 py-5 text-sm font-medium text-white md:hidden">
              <Link to="/home" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="/about" onClick={() => setMenuOpen(false)}>About us</Link>
              <Link to="/services" onClick={() => setMenuOpen(false)}>Services</Link>
              <Link to="/doctors" onClick={() => setMenuOpen(false)}>Doctors</Link>
              <Link to="/news" onClick={() => setMenuOpen(false)}>News</Link>
              <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
              <Link to="/appointment" onClick={() => setMenuOpen(false)}>
                <button className="bg-[#3EA6E0] text-white text-sm font-semibold px-6 py-2.5 rounded-full w-fit mt-2">
                  Appointment
                </button>
              </Link>
              {user ? (
                <>
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
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  <button className="text-white text-sm font-semibold px-6 py-2.5 rounded-full w-fit flex items-center gap-2">
                    <FaUser size={16} /> Log In
                  </button>
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