import React from 'react'
import { FaEye, FaHeart } from "react-icons/fa";
import { useGetNewsQuery } from '../services/newsApi'

const News = () => {
  const { data: news, error, isLoading } = useGetNewsQuery();

  return (
    <>
    <section id="news" className="bg-[#E7EEFC] px-4 py-20 sm:px-6 lg:px-8">
    <div className="mx-auto max-w-6xl">
        <div className="text-center">
        <p className="text-sm font-bold uppercase tracking-widest text-[#3EA6E0]">
            Better Information, Better Health
        </p>
        <h2 className="mt-2 text-3xl font-extrabold text-[#161654] sm:text-4xl">News</h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {/* News 1 */}
        {news?.slice(0, 4).map((article, index) => (
        <div className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            <div className="h-20 w-24 shrink-0 rounded-xl bg-gray-300"></div>
            <div>
            <p className="text-xs font-medium text-[#3EA6E0]">{article.date} | By {article.author}</p>
            <p className="mt-1 text-sm font-bold text-[#161654]">
                {article.title}
            </p>
            <div className="mt-2 flex items-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1"><FaEye size={12} /> 68</span>
                <span className="flex items-center gap-1"><FaHeart size={12} /> 86</span>
            </div>
            </div>
        </div>
        ))} 
        </div>

        <div className="mt-8 flex justify-center gap-2">
        <span className="h-2 w-2 rounded-full bg-[#dde9fc]"></span>
        <span className="h-2 w-6 rounded-full bg-[#161654]"></span>
        <span className="h-2 w-2 rounded-full bg-[#dde9fc]"></span>
        </div>
    </div>
    </section>
    </>
  )
}

export default News