import React from 'react'
import { FaEye, FaHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useGetNewsQuery } from '../services/newsApi'

const News = () => {
  const { data: news, error, isLoading } = useGetNewsQuery();

  return (
    <section id="news" className="bg-[#E7EEFC] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-widest text-[#3EA6E0]">
            Better Information, Better Health
          </p>
          <h2 className="mt-2 text-3xl font-extrabold text-[#161654] sm:text-4xl">News</h2>
        </div>

        {/* loading state - skeleton cards matching the real layout */}
        {isLoading && (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[1, 2, 3, 4].map((placeholder) => (
              <div key={placeholder} className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm animate-pulse">
                <div className="h-20 w-24 shrink-0 rounded-xl bg-gray-200"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-3 w-1/2 bg-gray-200 rounded"></div>
                  <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
                  <div className="h-3 w-1/3 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* error state */}
        {error && (
          <div className="mt-12 text-center">
            <p className="text-red-600 font-medium">
              We couldn't load the latest news right now. Please try again in a moment.
            </p>
          </div>
        )}

        {/* empty state */}
        {!isLoading && !error && news?.length === 0 && (
          <div className="mt-12 text-center">
            <p className="text-gray-500">No news articles yet — check back soon.</p>
          </div>
        )}

        {!isLoading && !error && news?.length > 0 && (
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {news.slice(0, 4).map((article) => (
              <Link
                to={`/news/${article._id}`}
                key={article._id}
                className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                {article.image ? (
                  <img
                    src={article.image}
                    alt=""
                    className="h-20 w-24 shrink-0 rounded-xl object-cover bg-gray-300"
                  />
                ) : (
                  <div className="h-20 w-24 shrink-0 rounded-xl bg-gray-300" aria-hidden="true"></div>
                )}
                <div>
                  <p className="text-xs font-medium text-[#3EA6E0]">{article.date} | By {article.author}</p>
                  <p className="mt-1 text-sm font-bold text-[#161654]">
                    {article.title}
                  </p>
                  <div className="mt-2 flex items-center gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1" aria-label={`${article.views ?? 0} views`}>
                      <FaEye size={12} aria-hidden="true" /> {article.views ?? 0}
                    </span>
                    <span className="flex items-center gap-1" aria-label={`${article.likes ?? 0} likes`}>
                      <FaHeart size={12} aria-hidden="true" /> {article.likes ?? 0}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <Link
            to="/news"
            className="bg-[#161654] text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:scale-105 hover:shadow-lg transition"
          >
            View All News
          </Link>
        </div>
      </div>
    </section>
  )
}

export default News