import React from 'react'
import { FaPaperPlane, FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="px-4 pt-16 sm:px-6 lg:px-8 bg-[#161654]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <p className="text-2xl font-extrabold text-white">
              MED<span className="text-[#3EA6E0]">DICAL</span>
            </p>
            <p className="mt-3 text-sm text-blue-100/70">
              Leading the Way in Medical Excellence, Trusted Care.
            </p>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-white">Important Links</p>
            <div className="mt-4 flex flex-col gap-2 text-sm text-blue-100/70">
              <a href="#appointment" className="hover:text-white transition-colors">Appointment</a>
              <a href="#doctors" className="hover:text-white transition-colors">Doctors</a>
              <a href="#services" className="hover:text-white transition-colors">Services</a>
              <a href="#about" className="hover:text-white transition-colors">About Us</a>
            </div>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-white">Contact Us</p>
            <div className="mt-4 flex flex-col gap-2 text-sm text-blue-100/70">
              <p>Call: (977) 9841399247</p>
              <p>Email: uniqueunish93@gmail.com</p>
              <p>Address: 0123 Kirtipur, Nepal</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-white">Newsletter</p>
            <p className="mt-4 text-sm text-blue-100/70">
              Subscribe to get the latest health tips and clinic updates.
            </p>
            <div className="mt-4 flex items-center bg-white/10 rounded-full pl-4 overflow-hidden">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full bg-transparent py-3 text-sm text-white placeholder:text-blue-100/50 outline-none"
              />
              <button className="m-1 w-10 h-10 shrink-0 rounded-full bg-[#3EA6E0] flex items-center justify-center hover:scale-110 transition-transform">
                <FaPaperPlane size={14} className="text-white" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-100/60">
          <p>© 2026 Hospital&apos;s name. All Rights Reserved by PNTEC-LTD</p>
          <div className="flex gap-3">
            <span className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <FaFacebookF size={14} className="text-white" />
            </span>
            <span className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <FaTwitter size={14} className="text-white" />
            </span>
            <span className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors">
              <FaInstagram size={14} className="text-white" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer