import React from 'react'
import { FaUser, FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'
import { useGetDoctorsQuery } from '../services/doctorApi'
import { Link } from 'react-router-dom'

const Doctors = () => {
  const { data: doctors, error, isLoading } = useGetDoctorsQuery();
 
  return (
    <section id="doctors" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-[#3EA6E0]">Trusted Care</p>
          <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#161654]">Our Doctors</h2>
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctors?.slice(0, 3).map((doctor) => (
          <div className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
            <div className="h-64 bg-gray-300 flex items-center justify-center overflow-hidden">
              <FaUser size={56} className="text-gray-400 group-hover:scale-110 transition-transform duration-500" />
            </div>

            <div className="px-5 py-4 bg-[#E7EEFC]">
              <p className="text-xs text-gray-500">{doctor.name}</p>
              <p className="text-lg font-bold text-[#161654]">{doctor.specialty}</p>

              <div className="mt-3 flex gap-2">
                <span className="w-8 h-8 rounded-full bg-white text-gray-500 hover:text-white flex items-center justify-center transition-colors">
                  <FaFacebookF size={14} />
                </span>
                <span className="w-8 h-8 rounded-full bg-white text-gray-500 hover:text-white flex items-center justify-center transition-colors">
                  <FaTwitter size={14} />
                </span>
                <span className="w-8 h-8 rounded-full bg-white text-gray-500 hover:text-white flex items-center justify-center transition-colors">
                  <FaInstagram size={14} />
                </span>
              </div>
            </div>

            <button className="w-full py-3 text-sm font-semibold text-white bg-[#161654] hover:bg-[#1B2363] transition-colors">
              View Profile
            </button>
          </div>
          ))}
        </div>

        <Link to="/doctors" className="bg-[#161654] text-white text-sm font-semibold px-6 py-2.5 rounded-full 
            hover:scale-105 hover:shadow-lg transition flex items-center gap-2 mx-auto mt-10 w-40" >
          
              View All Doctors
    
        </Link>
      </div>
    </section>
  )
}

export default Doctors