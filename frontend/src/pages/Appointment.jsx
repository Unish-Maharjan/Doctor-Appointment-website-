import { FaChevronDown, FaPhoneAlt } from "react-icons/fa";
import Banner from "../components/Banner";
import Contactsection from "../components/Contactsection";

function Appointment() {
  return (
    <>
    <Banner title="Book an Appointment" image="Appointment.jpg" />
    <div className="min-h-screen bg-white px-4 py-16 md:px-10 lg:px-20">

      <div className="mx-auto flex max-w-295 flex-col gap-10 lg:flex-row">

        {/* Left - Form */}
        <div className="anim-fadeInUp flex-1 [animation-delay:0ms]">
          <h2 className="font-serif text-4xl font-bold text-[#161654]">Book an Appointment</h2>
          <p className="mt-4 max-w-md leading-relaxed text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim et.
          </p>

          <div className="mt-8 overflow-hidden rounded-2xl">
            <div className="grid grid-cols-2">

              <div className="border-b border-r border-white/10 bg-[#161654] px-5 py-4">
                <input type="text" placeholder="Name" className="w-full bg-transparent text-white placeholder-white outline-none" />
              </div>
              <div className="relative border-b border-white/10 bg-[#161654] px-5 py-4">
                <select className="w-full cursor-pointer appearance-none bg-transparent text-white outline-none">
                  <option className="bg-[#161654]">Gender</option>
                  <option className="bg-[#161654]">Male</option>
                  <option className="bg-[#161654]">Female</option>
                  <option className="bg-[#161654]">Other</option>
                </select>
                <FaChevronDown className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-white" />
              </div>

              <div className="border-b border-r border-white/10 bg-[#161654] px-5 py-4">
                <input type="text" placeholder="Email" className="w-full bg-transparent text-white placeholder-white outline-none" />
              </div>
              <div className="border-b border-white/10 bg-[#161654] px-5 py-4">
                <input type="text" placeholder="Phone" className="w-full bg-transparent text-white placeholder-white outline-none" />
              </div>

              <div className="relative border-b border-r border-white/10 bg-[#161654] px-5 py-4">
                <input type="text" placeholder="Date" className="w-full bg-transparent text-white placeholder-white outline-none" />
                <FaChevronDown className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-white" />
              </div>
              <div className="relative border-b border-white/10 bg-[#161654] px-5 py-4">
                <input type="text" placeholder="Time" className="w-full bg-transparent text-white placeholder-white outline-none" />
                <FaChevronDown className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-white" />
              </div>

              <div className="relative border-b border-r border-white/10 bg-[#161654] px-5 py-4">
                <select className="w-full cursor-pointer appearance-none bg-transparent text-white outline-none">
                  <option className="bg-[#161654]">Doctor</option>
                  <option className="bg-[#161654]">Dr. Sarah Lee</option>
                  <option className="bg-[#161654]">Dr. James Carter</option>
                </select>
                <FaChevronDown className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-white" />
              </div>
              <div className="relative border-b border-white/10 bg-[#161654] px-5 py-4">
                <select className="w-full cursor-pointer appearance-none bg-transparent text-white outline-none">
                  <option className="bg-[#161654]">Department</option>
                  <option className="bg-[#161654]">Surgery</option>
                  <option className="bg-[#161654]">Health Care</option>
                  <option className="bg-[#161654]">Medical</option>
                </select>
                <FaChevronDown className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-white" />
              </div>

              <div className="col-span-2 bg-[#161654] px-5 py-4">
                <textarea placeholder="Message" rows="5" className="w-full resize-none bg-transparent text-white placeholder-white outline-none"></textarea>
              </div>

            </div>

            <button className="w-full bg-[#dde9fc] py-4 font-semibold uppercase tracking-wide text-[#161654] transition-colors duration-300 hover:bg-[#3EA6E0] hover:text-white">
              Submit
            </button>
          </div>
        </div>

        {/* Right - Schedule */}
        <div className="anim-fadeInUp w-full rounded-2xl bg-[#1B2363] px-10 py-12 [animation-delay:200ms] lg:w-[420px]">
          <h2 className="font-serif text-4xl font-bold text-[#dde9fc]">Schedule hours</h2>

          <div className="mt-8 flex flex-col">
            <div className="grid grid-cols-[110px_24px_1fr] items-center border-b border-white/10 py-3">
              <span className="text-white/90">Monday</span>
              <span className="text-white/40">—</span>
              <span className="text-white/90">09:00 AM - 07:00 PM</span>
            </div>
            <div className="grid grid-cols-[110px_24px_1fr] items-center border-b border-white/10 py-3">
              <span className="text-white/90">Tuesday</span>
              <span className="text-white/40">—</span>
              <span className="text-white/90">09:00 AM - 07:00 PM</span>
            </div>
            <div className="grid grid-cols-[110px_24px_1fr] items-center border-b border-white/10 py-3">
              <span className="text-white/90">Wednesday</span>
              <span className="text-white/40">—</span>
              <span className="text-white/90">09:00 AM - 07:00 PM</span>
            </div>
            <div className="grid grid-cols-[110px_24px_1fr] items-center border-b border-white/10 py-3">
              <span className="text-white/90">Thursday</span>
              <span className="text-white/40">—</span>
              <span className="text-white/90">09:00 AM - 07:00 PM</span>
            </div>
            <div className="grid grid-cols-[110px_24px_1fr] items-center border-b border-white/10 py-3">
              <span className="text-white/90">Friday</span>
              <span className="text-white/40">—</span>
              <span className="text-white/90">09:00 AM - 07:00 PM</span>
            </div>
            <div className="grid grid-cols-[110px_24px_1fr] items-center border-b border-white/10 py-3">
              <span className="text-white/90">Saturday</span>
              <span className="text-white/40">—</span>
              <span className="text-white/90">09:00 AM - 07:00 PM</span>
            </div>
            <div className="grid grid-cols-[110px_24px_1fr] items-center py-3">
              <span className="text-white/90">Sunday</span>
              <span className="text-white/40">—</span>
              <span className="text-white/90">Closed</span>
            </div>
          </div>

          <div className="mt-8 h-px w-3/5 bg-white/20"></div>

          <div className="mt-8 flex items-center gap-4">
            <div className="anim-float flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-white/30">
              <FaPhoneAlt className="text-white" />
            </div>
            <div>
              <p className="text-lg font-bold text-white">Emergency</p>
              <p className="text-white/80">(237) 681-812-255</p>
            </div>
          </div>
        </div>

      </div>
    </div>
    <Contactsection/>
    </>
  );
}

export default Appointment;