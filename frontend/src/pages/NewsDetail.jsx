import { Link, useParams } from "react-router-dom";
import { FaCalendarAlt, FaUserEdit, FaArrowLeft, FaExclamationCircle } from "react-icons/fa";
import { useGetNewsByIdQuery } from "../services/newsApi";
import Banner from "../components/Banner";

function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date)) return dateString;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function NewsDetail() {
  const { id } = useParams();
  const { data: article, isLoading, isError } = useGetNewsByIdQuery(id);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16 md:px-0">
        <div className="animate-pulse space-y-6">
          <div className="h-4 w-32 bg-[#E7EEFC] rounded"></div>
          <div className="h-4 w-48 bg-[#E7EEFC] rounded"></div>
          <div className="h-10 w-full bg-[#E7EEFC] rounded"></div>
          <div className="h-64 w-full bg-[#E7EEFC] rounded-2xl"></div>
          <div className="space-y-3">
            <div className="h-4 w-full bg-[#E7EEFC] rounded"></div>
            <div className="h-4 w-full bg-[#E7EEFC] rounded"></div>
            <div className="h-4 w-2/3 bg-[#E7EEFC] rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center px-4">
        <FaExclamationCircle className="text-red-400 text-3xl" />
        <div>
          <p className="text-red-500 font-medium">Could not load this article.</p>
          <p className="text-gray-400 text-sm mt-1">Check your backend is running.</p>
        </div>
        <Link
          to="/news"
          className="flex items-center gap-2 font-semibold text-[#3EA6E0] hover:underline"
        >
          <FaArrowLeft /> Back to News
        </Link>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-center px-4">
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
              {formatDate(article.date)}
            </span>
            {article.author && (
              <span className="flex items-center gap-2">
                <FaUserEdit className="text-[#3EA6E0]" />
                {article.author}
              </span>
            )}
          </div>

          {article.image && (
            <img
              src={article.image}
              alt={article.title}
              className="mt-2 w-full rounded-2xl object-cover"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          )}

          {article.content ? (
            <div className="prose prose-lg mt-8 max-w-none whitespace-pre-line leading-relaxed text-gray-600">
              {article.content}
            </div>
          ) : (
            <p className="mt-8 text-gray-400 italic">No content available for this article.</p>
          )}
        </div>
      </article>
    </>
  );
}

export default NewsDetail;