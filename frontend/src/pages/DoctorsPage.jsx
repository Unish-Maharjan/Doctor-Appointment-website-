import React from 'react'
import Doctors from '../components/Doctors'
import News from '../components/News'
import Banner from '../components/Banner'
import Contactsection from '../components/Contactsection'
import { FaQuoteRight } from 'react-icons/fa'

const DoctorsPage = () => {
  return (
    <>
        <Banner title="Doctors" image="Aboutus.png" />

        <Doctors/>

        {/* Quote / testimonial section */}
      <section className="relative bg-[#1B2363] py-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gray-400 opacity-20"></div>

        <div className="relative max-w-2xl mx-auto">
          <FaQuoteRight className="text-white mx-auto mb-6" size={40} />
          <p className="text-white text-lg md:text-xl mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat
            scelerisque tortor ornare ornare. Quisque placerat scelerisque felis vitae
            tortor augue. Velit nascetur Consequat faucibus porttitor enim et.
          </p>
          <div className="w-12 h-px bg-white mx-auto mb-4"></div>
          <p className="text-white font-medium mb-6">John Doe</p>

          <div className="flex justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-white"></span>
            <span className="w-2 h-2 rounded-full bg-[#3EA6E0]"></span>
            <span className="w-2 h-2 rounded-full bg-white/40"></span>
          </div>
        </div>
      </section>

      <News/>

      <Contactsection/>
    </>
  )
}

export default DoctorsPage