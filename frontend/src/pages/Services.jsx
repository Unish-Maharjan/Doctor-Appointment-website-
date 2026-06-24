import React from 'react'
import { FaLink, FaArrowRight } from "react-icons/fa";
import Contactsection from '../components/Contactsection';
import Banner from '../components/Banner';

const Services = () => {
  return (
    <>

        {/* Banner Section */}
        <Banner title="Services" image="Services.jpg" />

        <section className="bg-gray-50 py-20">
            
            <div className="mx-auto max-w-6xl px-4">
        
                {/* Header */}
                <div className="mb-12 text-center">
                <p className="anim-fadeInUp text-sm font-bold uppercase tracking-widest text-sky-500">
                    Better Information, Better Health
                </p>
        
                <h2 className="anim-fadeInUp mt-2 text-4xl font-bold text-[#161654] [animation-delay:100ms]">
                    Our Services
                </h2>
                </div>
        
                {/* Cards */}
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        
                {/* Card 1 - Free Checkup */}
                <div className="anim-fadeInUp overflow-hidden rounded-lg bg-white transition-all duration-300 [animation-delay:0ms] hover:-translate-y-2 hover:shadow-xl">
                    <div className="relative">
                    <img src="/service.jpg" alt="" className="h-64 w-full object-cover" />
                    <div className="anim-float absolute bottom-4 right-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#161654]">
                        <FaLink className="text-white" />
                    </div>
                    </div>
                    <div className="p-6">
                    <h3 className="text-3xl font-semibold text-[#161654]">Free Checkup</h3>
                    <p className="mt-3 text-gray-600">Get a full health screening from our team at no cost to you.</p>
                    <a href="#" className="mt-4 inline-flex items-center gap-2 font-semibold text-sky-500 transition-all hover:gap-3">
                        Learn More
                        <FaArrowRight size={12} />
                    </a>
                    </div>
                </div>
        
                {/* Card 2 - Online Consultation */}
                <div className="anim-fadeInUp overflow-hidden rounded-lg bg-white transition-all duration-300 [animation-delay:80ms] hover:-translate-y-2 hover:shadow-xl">
                    <div className="relative">
                    <img src="/service.jpg" alt="" className="h-64 w-full object-cover" />
                    <div className="anim-float absolute bottom-4 right-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#161654]">
                        <FaLink className="text-white" />
                    </div>
                    </div>
                    <div className="p-6">
                    <h3 className="text-3xl font-semibold text-[#161654]">Online Consultation</h3>
                    <p className="mt-3 text-gray-600">Speak with a doctor from home and skip the waiting room.</p>
                    <a href="#" className="mt-4 inline-flex items-center gap-2 font-semibold text-sky-500 transition-all hover:gap-3">
                        Learn More
                        <FaArrowRight size={12} />
                    </a>
                    </div>
                </div>
        
                {/* Card 3 - Surgery & Operations */}
                <div className="anim-fadeInUp overflow-hidden rounded-lg bg-white transition-all duration-300 [animation-delay:160ms] hover:-translate-y-2 hover:shadow-xl">
                    <div className="relative">
                    <img src="/service.jpg" alt="" className="h-64 w-full object-cover" />
                    <div className="anim-float absolute bottom-4 right-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#161654]">
                        <FaLink className="text-white" />
                    </div>
                    </div>
                    <div className="p-6">
                    <h3 className="text-3xl font-semibold text-[#161654]">Surgery & Operations</h3>
                    <p className="mt-3 text-gray-600">Skilled surgeons and modern equipment for safe outcomes.</p>
                    <a href="#" className="mt-4 inline-flex items-center gap-2 font-semibold text-sky-500 transition-all hover:gap-3">
                        Learn More
                        <FaArrowRight size={12} />
                    </a>
                    </div>
                </div>
        
                {/* Card 4 - Health Care */}
                <div className="anim-fadeInUp overflow-hidden rounded-lg bg-white transition-all duration-300 [animation-delay:240ms] hover:-translate-y-2 hover:shadow-xl">
                    <div className="relative">
                    <img src="/service.jpg" alt="" className="h-64 w-full object-cover" />
                    <div className="anim-float absolute bottom-4 right-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#161654]">
                        <FaLink className="text-white" />
                    </div>
                    </div>
                    <div className="p-6">
                    <h3 className="text-3xl font-semibold text-[#161654]">Health Care</h3>
                    <p className="mt-3 text-gray-600">Ongoing care plans built around your everyday wellbeing.</p>
                    <a href="#" className="mt-4 inline-flex items-center gap-2 font-semibold text-sky-500 transition-all hover:gap-3">
                        Learn More
                        <FaArrowRight size={12} />
                    </a>
                    </div>
                </div>
        
                {/* Card 5 - Lab & Diagnostics */}
                <div className="anim-fadeInUp overflow-hidden rounded-lg bg-white transition-all duration-300 [animation-delay:320ms] hover:-translate-y-2 hover:shadow-xl">
                    <div className="relative">
                    <img src="/service.jpg" alt="" className="h-64 w-full object-cover" />
                    <div className="anim-float absolute bottom-4 right-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#161654]">
                        <FaLink className="text-white" />
                    </div>
                    </div>
                    <div className="p-6">
                    <h3 className="text-3xl font-semibold text-[#161654]">Lab & Diagnostics</h3>
                    <p className="mt-3 text-gray-600">Fast, accurate testing with results you can rely on.</p>
                    <a href="#" className="mt-4 inline-flex items-center gap-2 font-semibold text-sky-500 transition-all hover:gap-3">
                        Learn More
                        <FaArrowRight size={12} />
                    </a>
                    </div>
                </div>
        
                {/* Card 6 - Emergency Care */}
                <div className="anim-fadeInUp overflow-hidden rounded-lg bg-white transition-all duration-300 [animation-delay:400ms] hover:-translate-y-2 hover:shadow-xl">
                    <div className="relative">
                    <img src="/service.jpg" alt="" className="h-64 w-full object-cover" />
                    <div className="anim-float absolute bottom-4 right-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#161654]">
                        <FaLink className="text-white" />
                    </div>
                    </div>
                    <div className="p-6">
                    <h3 className="text-3xl font-semibold text-[#161654]">Emergency Care</h3>
                    <p className="mt-3 text-gray-600">Around-the-clock response when every minute counts.</p>
                    <a href="#" className="mt-4 inline-flex items-center gap-2 font-semibold text-sky-500 transition-all hover:gap-3">
                        Learn More
                        <FaArrowRight size={12} />
                    </a>
                    </div>
                </div>
        
                </div>
            </div>

        </section>

        {/* Contact Section */}
        <Contactsection/>
    </>
  )
}

export default Services