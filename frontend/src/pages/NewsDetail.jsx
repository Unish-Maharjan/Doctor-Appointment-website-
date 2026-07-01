import { Link, useParams } from "react-router-dom";
import { FaCalendarAlt, FaUserEdit, FaArrowLeft } from "react-icons/fa";
import { useGetNewsQuery } from "../services/newsApi";
import Banner from "../components/Banner";



function NewsDetail() {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetNewsQuery();
  const newsList = data || [];

  const article = newsList.find((item) => item._id === id);

  if (isLoading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-gray-500">Loading article...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-red-500">Could not load this article. Check your backend is running.</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center">
        <p className="text-gray-500">This article doesn't exist or may have been removed.</p>
        <Link
          to="/news"
          className="flex items-center gap-2 font-semibold text-[#3EA6E0] hover:underline"
        >
          <FaArrowLeft /> Back to News
        </Link>
      </div>
    );
  }

  return (
    <>
      <Banner title={article.title} image="news.jpg" />

      <article className="mx-auto max-w-3xl px-4 py-16 md:px-0">
        <Link
          to="/news"
          className="anim-fadeIn mb-8 flex items-center gap-2 text-sm font-semibold text-[#3EA6E0] hover:underline"
        >
          <FaArrowLeft /> Back to News
        </Link>

        <div className="anim-fadeInUp">
          <div className="mb-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500">
            <span className="flex items-center gap-2">
              <FaCalendarAlt className="text-[#3EA6E0]" />
              {article.date}
            </span>
            {article.author && (
              <span className="flex items-center gap-2">
                <FaUserEdit className="text-[#3EA6E0]" />
                {article.author}
              </span>
            )}
          </div>

          <h1 className="font-serif text-3xl font-bold leading-tight text-[#161654] md:text-4xl">
            {article.title}
          </h1>

          {article.image && (
            <img
              src={article.image}
              alt={article.title}
              className="mt-8 w-full rounded-2xl object-cover"
            />
          )}

          <div className="prose prose-lg mt-8 max-w-none whitespace-pre-line leading-relaxed text-gray-600">
            {article.content}
          </div>
        </div>
      </article>
    </>
  );
}

export default NewsDetail;