import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaPaperPlane, FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState(null) // null | 'success' | 'error'

  function handleSubscribe(e) {
    e.preventDefault()

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    if (!isValidEmail) {
      setStatus('error')
      return
    }

    // TODO: wire this up to the real newsletter signup endpoint once it exists
    setStatus('success')
    setEmail('')
  }

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
              <Link to="/appointment" className="hover:text-white transition-colors">Appointment</Link>
              <Link to="/doctors" className="hover:text-white transition-colors">Doctors</Link>
              <Link to="/services" className="hover:text-white transition-colors">Services</Link>
              <Link to="/about" className="hover:text-white transition-colors">About Us</Link>
            </div>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-white">Contact Us</p>
            <div className="mt-4 flex flex-col gap-2 text-sm text-blue-100/70">
              <p>
                Call: <a href="tel:+9779841399247" className="hover:text-white transition-colors">(977) 9841399247</a>
              </p>
              <p>
                Email: <a href="mailto:uniqueunish93@gmail.com" className="hover:text-white transition-colors">uniqueunish93@gmail.com</a>
              </p>
              <p>Address: 0123 Kirtipur, Nepal</p>
            </div>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-white">Newsletter</p>
            <p className="mt-4 text-sm text-blue-100/70">
              Subscribe to get the latest health tips and clinic updates.
            </p>
            <form onSubmit={handleSubscribe} noValidate>
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <div className="mt-4 flex items-center bg-white/10 rounded-full pl-4 overflow-hidden">
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setStatus(null) }}
                  placeholder="Enter your email address"
                  className="w-full bg-transparent py-3 text-sm text-white placeholder:text-blue-100/50 outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="m-1 w-10 h-10 shrink-0 rounded-full bg-[#3EA6E0] flex items-center justify-center hover:scale-110 transition-transform"
                >
                  <FaPaperPlane size={14} className="text-white" />
                </button>
              </div>
              {status === 'success' && (
                <p className="mt-2 text-xs text-green-400">Thanks for subscribing!</p>
              )}
              {status === 'error' && (
                <p className="mt-2 text-xs text-red-400">Please enter a valid email address.</p>
              )}
            </form>
          </div>
        </div>

        <div className="mt-12 py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-100/60">
          <p>© 2026 Hospital&apos;s name. All Rights Reserved by PNTEC-LTD</p>
          <div className="flex gap-3">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Facebook page"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <FaFacebookF size={14} className="text-white" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Twitter page"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <FaTwitter size={14} className="text-white" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit our Instagram page"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <FaInstagram size={14} className="text-white" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer