import { FaSearch, FaCalendarAlt, FaUser, FaEye, FaHeart, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import Banner from "../components/Banner";
import Contactsection from "../components/Contactsection";

function NewsPage() {
  return (
    <>    
    
    <Banner title="News" image="News.jpg"/>

    <div className="min-h-screen bg-white px-4 py-12 md:px-10 lg:px-20">

      <div className="max-w-300 mx-auto flex flex-col gap-12 lg:flex-row">

        {/* Main Content */}
        <div className="flex flex-1 flex-col gap-14">

          {/* Article 1 */}
          <div className="anim-fadeInUp [animation-delay:0ms]">
            <div className="h-105 w-full overflow-hidden rounded-2xl bg-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"></div>
            <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-gray-500">
              <span className="flex items-center gap-2"><FaCalendarAlt className="text-[#3EA6E0]" /> Monday 05, September 2021</span>
              <span className="flex items-center gap-2"><FaUser className="text-[#3EA6E0]" /> By Author</span>
              <span className="flex items-center gap-2"><FaEye className="text-gray-400" /> 68</span>
              <span className="flex items-center gap-2"><FaHeart className="text-pink-500" /> 86</span>
            </div>
            <h2 className="mt-3 font-serif text-2xl font-bold text-[#161654] md:text-3xl">A passion for putting patients first</h2>
            <p className="mt-3 leading-relaxed text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim et....
            </p>
            <button className="mt-5 flex items-center gap-2 rounded-full bg-[#dde9fc] px-6 py-3 font-semibold text-[#161654] transition-colors duration-300 hover:bg-[#3EA6E0] hover:text-white">
              Read More <FaArrowRight />
            </button>
          </div>

          {/* Article 2 */}
          <div className="anim-fadeInUp [animation-delay:150ms]">
            <div className="h-105 w-full overflow-hidden rounded-2xl bg-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"></div>
            <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-gray-500">
              <span className="flex items-center gap-2"><FaCalendarAlt className="text-[#3EA6E0]" /> Monday 05, September 2021</span>
              <span className="flex items-center gap-2"><FaUser className="text-[#3EA6E0]" /> By Author</span>
              <span className="flex items-center gap-2"><FaEye className="text-gray-400" /> 68</span>
              <span className="flex items-center gap-2"><FaHeart className="text-pink-500" /> 86</span>
            </div>
            <h2 className="mt-3 font-serif text-2xl font-bold text-[#161654] md:text-3xl">A passion for putting patients first</h2>
            <p className="mt-3 leading-relaxed text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim et....
            </p>
            <button className="mt-5 flex items-center gap-2 rounded-full bg-[#dde9fc] px-6 py-3 font-semibold text-[#161654] transition-colors duration-300 hover:bg-[#3EA6E0] hover:text-white">
              Read More <FaArrowRight />
            </button>
          </div>

          {/* Article 3 */}
          <div className="anim-fadeInUp [animation-delay:300ms]">
            <div className="h-105 w-full overflow-hidden rounded-2xl bg-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"></div>
            <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-gray-500">
              <span className="flex items-center gap-2"><FaCalendarAlt className="text-[#3EA6E0]" /> Monday 05, September 2021</span>
              <span className="flex items-center gap-2"><FaUser className="text-[#3EA6E0]" /> By Author</span>
              <span className="flex items-center gap-2"><FaEye className="text-gray-400" /> 68</span>
              <span className="flex items-center gap-2"><FaHeart className="text-pink-500" /> 86</span>
            </div>
            <h2 className="mt-3 font-serif text-2xl font-bold text-[#161654] md:text-3xl">A passion for putting patients first</h2>
            <p className="mt-3 leading-relaxed text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim et....
            </p>
            <button className="mt-5 flex items-center gap-2 rounded-full bg-[#dde9fc] px-6 py-3 font-semibold text-[#161654] transition-colors duration-300 hover:bg-[#3EA6E0] hover:text-white">
              Read More <FaArrowRight />
            </button>
          </div>

          {/* Article 4 */}
          <div className="anim-fadeInUp [animation-delay:450ms]">
            <div className="h-105 w-full overflow-hidden rounded-2xl bg-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"></div>
            <div className="mt-5 flex flex-wrap items-center gap-5 text-sm text-gray-500">
              <span className="flex items-center gap-2"><FaCalendarAlt className="text-[#3EA6E0]" /> Monday 05, September 2021</span>
              <span className="flex items-center gap-2"><FaUser className="text-[#3EA6E0]" /> By Author</span>
              <span className="flex items-center gap-2"><FaEye className="text-gray-400" /> 68</span>
              <span className="flex items-center gap-2"><FaHeart className="text-pink-500" /> 86</span>
            </div>
            <h2 className="mt-3 font-serif text-2xl font-bold text-[#161654] md:text-3xl">A passion for putting patients first</h2>
            <p className="mt-3 leading-relaxed text-gray-500">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat scelerisque tortor ornare ornare. Quisque placerat scelerisque tortor ornare ornare Convallis felis vitae tortor augue. Velit nascetur proin massa in. Consequat faucibus porttitor enim et....
            </p>
            <button className="mt-5 flex items-center gap-2 rounded-full bg-[#dde9fc] px-6 py-3 font-semibold text-[#161654] transition-colors duration-300 hover:bg-[#3EA6E0] hover:text-white">
              Read More <FaArrowRight />
            </button>
          </div>

          {/* Pagination */}
          <div className="anim-fadeIn flex items-center justify-between border-t border-gray-100 pt-8">
            <span className="flex items-center gap-2 text-gray-300">
              <FaArrowLeft /> Previous Page
            </span>
            <div className="flex items-center gap-2 font-medium text-[#161654]">
              <span className="font-bold text-[#3EA6E0]">1</span>
              <span>-</span>
              <span>2</span>
              <span>-</span>
              <span>3</span>
              <span>-</span>
              <span>4</span>
              <span>-</span>
              <span>5</span>
            </div>
            <button className="flex items-center gap-2 font-medium text-[#3EA6E0] transition-all duration-300 hover:gap-3">
              Next Page <FaArrowRight />
            </button>
          </div>
        </div>

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

            <div className="flex gap-3 border-b border-gray-100 pb-4">
              <div className="h-14 w-14 shrink-0 rounded-lg bg-gray-200"></div>
              <div>
                <p className="mb-1 text-xs font-medium text-[#3EA6E0]">Monday 05, September 2021</p>
                <p className="text-sm font-semibold leading-snug text-[#161654]">This Article's Title goes Here, but not too long.</p>
              </div>
            </div>

            <div className="flex gap-3 border-b border-gray-100 py-4">
              <div className="h-14 w-14 shrink-0 rounded-lg bg-gray-200"></div>
              <div>
                <p className="mb-1 text-xs font-medium text-[#3EA6E0]">Monday 05, September 2021</p>
                <p className="text-sm font-semibold leading-snug text-[#161654]">This Article's Title goes Here, but not too long.</p>
              </div>
            </div>

            <div className="flex gap-3 border-b border-gray-100 py-4">
              <div className="h-14 w-14 shrink-0 rounded-lg bg-gray-200"></div>
              <div>
                <p className="mb-1 text-xs font-medium text-[#3EA6E0]">Monday 05, September 2021</p>
                <p className="text-sm font-semibold leading-snug text-[#161654]">This Article's Title goes Here, but not too long.</p>
              </div>
            </div>

            <div className="flex gap-3 border-b border-gray-100 py-4">
              <div className="h-14 w-14 shrink-0 rounded-lg bg-gray-200"></div>
              <div>
                <p className="mb-1 text-xs font-medium text-[#3EA6E0]">Monday 05, September 2021</p>
                <p className="text-sm font-semibold leading-snug text-[#161654]">This Article's Title goes Here, but not too long.</p>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <div className="h-14 w-14 shrink-0 rounded-lg bg-gray-200"></div>
              <div>
                <p className="mb-1 text-xs font-medium text-[#3EA6E0]">Monday 05, September 2021</p>
                <p className="text-sm font-semibold leading-snug text-[#161654]">This Article's Title goes Here, but not too long.</p>
              </div>
            </div>
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