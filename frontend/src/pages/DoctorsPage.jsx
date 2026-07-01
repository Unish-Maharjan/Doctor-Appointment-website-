import { Link } from 'react-router-dom'
import News from '../components/News'
import Banner from '../components/Banner'
import Contactsection from '../components/Contactsection'
import { FaQuoteRight, FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa'
import { useGetDoctorsQuery } from '../services/doctorApi'

const DoctorsPage = () => {
  const { data: doctors, isLoading } = useGetDoctorsQuery();
  return (
    <>
  <Banner title="Doctors" image="Aboutus.png" />

      <section id="doctors" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-widest text-[#3EA6E0]">Trusted Care</p>
            <h2 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#161654]">Our Doctors</h2>
          </div>

          {isLoading ? (
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="rounded-2xl overflow-hidden shadow-md animate-pulse">
                <div className="h-64 bg-gray-300"></div>
                <div className="px-5 py-4 bg-[#E7EEFC] space-y-2">
                  <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
                  <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
                  <div className="mt-3 flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                    <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                    <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                  </div>
                </div>
                <div className="w-full h-11 bg-gray-300"></div>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-md animate-pulse">
                <div className="h-64 bg-gray-300"></div>
                <div className="px-5 py-4 bg-[#E7EEFC] space-y-2">
                  <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
                  <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
                  <div className="mt-3 flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                    <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                    <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                  </div>
                </div>
                <div className="w-full h-11 bg-gray-300"></div>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-md animate-pulse">
                <div className="h-64 bg-gray-300"></div>
                <div className="px-5 py-4 bg-[#E7EEFC] space-y-2">
                  <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
                  <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
                  <div className="mt-3 flex gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                    <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                    <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                  </div>
                </div>
                <div className="w-full h-11 bg-gray-300"></div>
              </div>
            </div>
          ) : (
            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {doctors?.map((doctor) => (
                <div key={doctor._id} className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
                  <Link to={`/doctors/${doctor._id}`} className="h-64 bg-gray-300 flex items-center justify-center overflow-hidden">
                    <img src={doctor.photo} alt={doctor.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </Link>

                  <div className="px-5 py-4 bg-[#E7EEFC]">
                    <p className="text-[16px] font-semibold">{doctor.name}</p>
                    <p className="text-lg font-bold text-[#161654]">{doctor.specialization}</p>

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

                  <Link
                    to={`/doctors/${doctor._id}`}
                    className="block w-full py-3 text-center text-sm font-semibold text-white bg-[#161654] hover:bg-[#1B2363] transition-colors"
                  >
                    View Profile
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

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

export default DoctorsPage;