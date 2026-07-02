import { Link } from "react-router-dom";

function Banner({ title, image }) {
  return (
    <section className="relative">
      <div className="h-56 md:h-72 relative flex items-end bg-gray-300 overflow-hidden">
        {image && (
          <img
            src={image}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#161654]/90 via-[#161654]/50 to-[#161654]/20"></div>

        <div className="relative px-6 md:px-20 pb-8 w-full">
          <nav aria-label="breadcrumb">
            <p className="text-[#dde9fc] text-sm mb-2">
              <Link to="/" className="hover:text-white hover:underline transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="text-white">{title}</span>
            </p>
          </nav>
          <h1 className="text-white text-3xl md:text-5xl font-bold leading-tight">{title}</h1>
        </div>
      </div>

      <div className="h-1 w-full flex">
        <div className="w-1/2 bg-[#161654]"></div>
        <div className="w-1/2 bg-[#3EA6E0]"></div>
      </div>
    </section>
  );
}

export default Banner;