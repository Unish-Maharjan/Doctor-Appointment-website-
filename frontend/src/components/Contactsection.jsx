import { FaPhoneAlt, FaMapMarkerAlt, FaEnvelope, FaClock } from "react-icons/fa";

function Contactsection() {
  return (
    <section id="contact" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-[#3EA6E0]">Get In Touch</p>
          <h2 className="mt-2 text-3xl font-extrabold text-[#161654] sm:text-4xl">Contact</h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl bg-[#E7EEFC] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <FaPhoneAlt className="h-6 w-6 text-[#3EA6E0]" aria-hidden="true" />
            <p className="mt-4 text-sm font-bold text-[#161654]">EMERGENCY</p>
            <a
              href="tel:+9779841399247"
              className="mt-1 block text-xs text-gray-500 hover:text-[#3EA6E0] focus:outline-none focus:underline transition-colors"
            >
              (977) 984-1399-247
            </a>
            <a
              href="tel:+9779863035989"
              className="block text-xs text-gray-500 hover:text-[#3EA6E0] focus:outline-none focus:underline transition-colors"
            >
              (977) 9863035989
            </a>
          </div>

          <div className="rounded-2xl bg-[#161654] p-6 text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <FaMapMarkerAlt className="h-6 w-6 text-[#3EA6E0]" aria-hidden="true" />
            <p className="mt-4 text-sm font-bold">LOCATION</p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Kirtipur+Kathmandu+Nepal"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block text-xs text-blue-100 hover:text-white focus:outline-none focus:underline transition-colors"
            >
              Kirtipur, Kathmandu
              <br />
              Nepal
            </a>
          </div>

          <div className="rounded-2xl bg-[#E7EEFC] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <FaEnvelope className="h-6 w-6 text-[#3EA6E0]" aria-hidden="true" />
            <p className="mt-4 text-sm font-bold text-[#161654]">EMAIL</p>
            <a
              href="mailto:uniqueunish93@gmail.com"
              className="mt-1 block text-xs text-gray-500 hover:text-[#3EA6E0] focus:outline-none focus:underline transition-colors break-all"
            >
              uniqueunish93@gmail.com
            </a>
            <a
              href="mailto:unishmaharjan567@gmail.com"
              className="block text-xs text-gray-500 hover:text-[#3EA6E0] focus:outline-none focus:underline transition-colors break-all"
            >
              unishmaharjan567@gmail.com
            </a>
          </div>

          <div className="rounded-2xl bg-[#E7EEFC] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <FaClock className="h-6 w-6 text-[#3EA6E0]" aria-hidden="true" />
            <p className="mt-4 text-sm font-bold text-[#161654]">WORKING HOURS</p>
            <p className="mt-1 text-xs text-gray-500">Mon-Sat 09:00-20:00</p>
            <p className="text-xs text-gray-500">Sunday Emergency only</p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Contactsection;