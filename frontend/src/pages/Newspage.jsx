import { FaSearch, FaCalendarAlt, FaUser, FaEye, FaHeart, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Banner from "../components/Banner";
import Contactsection from "../components/Contactsection";
import { useGetNewsQuery } from "../services/newsApi";
import { useState } from "react";

function NewsPage() {
    const { data: newsData, isLoading } = useGetNewsQuery();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const totalPages = Math.ceil((newsData?.length || 0) / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedNews = newsData?.slice(startIndex, startIndex + itemsPerPage);

    function goToPrevious() {
      if (currentPage > 1) setCurrentPage(currentPage - 1);
    }

    function goToNext() {
      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    }

    function goToPage(page) {
      setCurrentPage(page);
    }

    console.log("News data:", newsData);
  return (

    <>    
    
    <Banner title="News" image="News.jpg"/>

    <div className="min-h-screen bg-white px-4 py-12 md:px-10 lg:px-20">

      <div className="max-w-300 mx-auto flex flex-col gap-12 lg:flex-row">

        {/* Main Content */}
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
         <div className="flex flex-1 flex-col gap-14">
          <div className="flex flex-col gap-10">
            {paginatedNews?.map((article, index) => (
              <div key={article._id || index} className={`anim-fadeInUp [animation-delay:${index * 150}ms]`}>
                <div className="h-105 w-full overflow-hidden rounded-2xl bg-gray-200 
                transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <img src={article.image} alt={article.title} className="h-full w-full object-cover" />
                </div>
                <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-gray-500">
                  <span className="flex items-center gap-2"><FaCalendarAlt className="text-[#3EA6E0]" /> {article.date}</span>
                  <span className="flex items-center gap-2"><FaUser className="text-[#3EA6E0]" /> By {article.author}</span>
                  <span className="flex items-center gap-2"><FaEye className="text-gray-400" /> 68</span>
                  <span className="flex items-center gap-2"><FaHeart className="text-pink-500" /> 86</span>
                </div>
                <h2 className="mt-3 font-serif text-2xl font-bold text-[#161654] md:text-3xl">{article.title}</h2>
                <p className="mt-3 leading-relaxed text-gray-500">
                  {article.content}
                </p>
                <button className="mt-5 flex items-center gap-2 rounded-full bg-[#dde9fc] px-6 py-3 font-semibold text-[#161654] transition-colors duration-300 hover:bg-[#3EA6E0] hover:text-white">
                  Read More <FaArrowRight />
                </button>
              </div>
            ))}
          </div>
           {/* Pagination */}
      <div className="anim-fadeIn flex items-center justify-between border-t border-gray-100 pt-8">
        <button
          onClick={goToPrevious}
          disabled={currentPage === 1}
          className={`flex items-center gap-2 transition-colors duration-300 ${
            currentPage === 1 ? "cursor-not-allowed text-gray-300" : "text-[#161654] hover:text-[#3EA6E0]"
          }`}
        >
          <FaArrowLeft /> Previous Page
        </button>

        <div className="flex items-center gap-2 font-medium text-[#161654]">
          {Array.from({ length: totalPages }).map((_, i) => (
            <span
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`cursor-pointer ${
                currentPage === i + 1 ? "font-bold text-[#3EA6E0]" : "hover:text-[#3EA6E0]"
              }`}
            >
              {i + 1}
            </span>
          ))}
        </div>

        <button
          onClick={goToNext}
          disabled={currentPage === totalPages}
          className={`flex items-center gap-2 font-medium transition-all duration-300 ${
            currentPage === totalPages ? "cursor-not-allowed text-gray-300" : "text-[#3EA6E0] hover:gap-3"
          }`}
        >
          Next Page <FaArrowRight />
        </button>
      </div>
          </div>
          )}

        {/* Sidebar */}
        <div className="flex w-full flex-col gap-8 lg:w-[320px]">

          {/* Search */}
          <div className="anim-fadeIn flex overflow-hidden rounded-xl bg-[#161654]">
            <input
              type="text"
              placeholder="Search"
              className="flex-1 bg-transparent px-5 py-4 text-white placeholder-gray-300 outline-none"
            />
            <button className="flex items-center justify-center bg-[#3EA6E0] px-5">
              <FaSearch className="anim-float text-white" />
            </button>
          </div>

          {/* Recent Posts */}
          
          <div className="anim-fadeIn rounded-xl border border-gray-100 p-6 [animation-delay:150ms]">
            <h3 className="mb-5 font-serif text-2xl font-bold text-[#161654]">Recent Posts</h3>
          {newsData?.slice(0, 3).map((article) => (
            <div className="flex gap-3 border-b border-gray-100 pb-4">
              <div className="h-14 w-14 shrink-0 rounded-lg bg-gray-200"></div>
              <div>
                <p className="mb-1 text-xs font-medium text-[#3EA6E0]">{article.date}</p>
                <p className="text-sm font-semibold leading-snug text-[#161654]">{article.title}</p>
              </div>
            </div>
             ))}
          </div>
         

          {/* Categories */}
          <div className="anim-fadeIn rounded-xl border border-gray-100 p-6 [animation-delay:300ms]">
            <h3 className="mb-3 font-serif text-2xl font-bold text-[#161654]">Categories</h3>

            <div className="flex items-center justify-between border-b border-gray-100 py-3">
              <span className="text-gray-600">Surgery</span>
              <span className="anim-float flex h-6 w-6 items-center justify-center rounded-full bg-[#3EA6E0] text-xs font-bold text-white">3</span>
            </div>

            <div className="flex items-center justify-between border-b border-gray-100 py-3">
              <span className="text-gray-600">Health Care</span>
              <span className="anim-float flex h-6 w-6 items-center justify-center rounded-full bg-[#3EA6E0] text-xs font-bold text-white">5</span>
            </div>

            <div className="flex items-center justify-between border-b border-gray-100 py-3">
              <span className="text-gray-600">Medical</span>
              <span className="anim-float flex h-6 w-6 items-center justify-center rounded-full bg-[#3EA6E0] text-xs font-bold text-white">8</span>
            </div>

            <div className="flex items-center justify-between py-3">
              <span className="text-gray-600">Professional</span>
              <span className="anim-float flex h-6 w-6 items-center justify-center rounded-full bg-[#3EA6E0] text-xs font-bold text-white">10</span>
            </div>
          </div>

        </div>
      </div>
    </div>

    <Contactsection/>
    
    </>

  );
}

export default NewsPage;