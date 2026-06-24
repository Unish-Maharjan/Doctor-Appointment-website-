import React from 'react'

const Banner = ({ title, image }) => {
  return (
    <>
     {/* Page banner */}
      <section className="relative">
        <div className="h-72 bg-gray-300 relative flex items-end">
          <div className="absolute inset-0 bg-[#161654]/70">
          <img src={image} alt="Banner" className="w-full h-full object-cover opacity-40" />
          </div>
          <div className="relative px-6 md:px-20 pb-8">
            <p className="text-white text-sm mb-2">Home / {title}</p>
            <h1 className="text-white text-4xl md:text-5xl font-bold">{title}</h1>
          </div>
        </div>
        <div className="h-1 w-full flex">
          <div className="w-1/2 bg-[#161654]"></div>
          <div className="w-1/2 bg-[#3EA6E0]"></div>
        </div>
      </section>
    </>
  )
}

export default Banner