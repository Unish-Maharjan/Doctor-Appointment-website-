import { useState, useEffect } from "react";
import { FaQuoteRight, FaCheckCircle, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Doctors from "../components/Doctors";
import Contactsection from "../components/Contactsection";
import News from "../components/News";
import Banner from "../components/Banner";

export default function About() {
  // testimonials - inline array, easy to edit or hook up to an API later
  const testimonials = [
    {
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque felis vitae tortor augue. Velit nascetur Consequat faucibus porttitor enim et.",
      name: "John Doe",
    },
    {
      quote:
        "Consequat faucibus porttitor enim et velit nascetur proin massa in. Convallis felis vitae tortor augue quisque placerat scelerisque tortor ornare.",
      name: "Jane Smith",
    },
    {
      quote:
        "Quisque placerat scelerisque tortor ornare ornare convallis felis vitae tortor augue velit nascetur proin massa in consequat faucibus.",
      name: "Ram Sharma",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // auto-advance every 6 seconds, but stop if the user is hovering or focused inside
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, testimonials.length]);

  const goToPrev = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const features = [
    "A Passion for Healing",
    "5-Star Care",
    "All our best",
    "Believe in Us",
    "Always Caring",
    "A Legacy of Excellence",
  ];

  return (
    <div>
      {/* Banner */}
      <Banner title="About Us" image="Aboutus.png" />

      {/* Welcome section */}
      <section className="px-6 md:px-20 py-16 flex flex-col md:flex-row gap-10 items-center">
        <div
          className="w-full md:w-1/2 h-96 bg-gray-200 rounded"
          role="img"
          aria-label="Hospital staff caring for a patient"
        ></div>

        <div className="w-full md:w-1/2">
          <p className="text-[#3EA6E0] font-semibold text-sm mb-2">WELCOME TO HOSPITAL NAME</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#1B2363] mb-6">
            Best Care for Your Good Health
          </h2>

          <ul className="grid grid-cols-2 gap-3 mb-6 list-none">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <FaCheckCircle className="text-[#3EA6E0] shrink-0" aria-hidden="true" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>

          <p className="text-gray-600 mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat
            scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare
            ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in.
            Consequat faucibus porttitor enim et.
          </p>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat
            scelerisque. Convallis felis vitae tortor augue. Velit nascetur proin massa in.
          </p>
        </div>
      </section>

      {/* Quote / testimonial carousel */}
      <section
        className="relative bg-[#1B2363] py-20 px-6 text-center overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
        aria-roledescription="carousel"
        aria-label="Patient testimonials"
      >
        <div className="absolute inset-0 bg-gray-400 opacity-20"></div>

        <div className="relative max-w-2xl mx-auto">
          <FaQuoteRight className="text-white mx-auto mb-6" size={40} aria-hidden="true" />

          <blockquote className="text-white text-lg md:text-xl mb-8">
            <p>{testimonials[activeIndex].quote}</p>
          </blockquote>

          <div className="w-12 h-px bg-white mx-auto mb-4"></div>
          <cite className="text-white font-medium mb-6 block not-italic">
            {testimonials[activeIndex].name}
          </cite>

          {/* prev / next controls, keyboard accessible */}
          <div className="flex items-center justify-center gap-6 mb-4">
            <button
              type="button"
              onClick={goToPrev}
              aria-label="Previous testimonial"
              className="text-white/70 hover:text-white transition-colors p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white"
            >
              <FaChevronLeft />
            </button>

            {/* dots - visually small but with a large tap target for mobile */}
            <div className="flex gap-2">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.name}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Go to testimonial from ${testimonial.name}`}
                  aria-current={index === activeIndex ? "true" : "false"}
                  className="w-11 h-11 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white rounded-full"
                >
                  <span
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === activeIndex ? "bg-[#3EA6E0]" : "bg-white/40"
                    }`}
                  ></span>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={goToNext}
              aria-label="Next testimonial"
              className="text-white/70 hover:text-white transition-colors p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </section>

      <Doctors />
      <News />
      <Contactsection />
    </div>
  );
}