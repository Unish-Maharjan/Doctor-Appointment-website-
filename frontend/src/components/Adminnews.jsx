import { useState } from "react";
import { createPortal } from "react-dom";
import { FaPlus, FaTimes } from "react-icons/fa";

import {
  useGetNewsQuery,
  useAddNewsMutation,
  useUpdateNewsMutation,
  useDeleteNewsMutation,
} from "../services/newsApi";

const AdminNews = () => {
  const { data, isLoading, isError } = useGetNewsQuery();
  const newsList = data || [];

  const [addNews] = useAddNewsMutation();
  const [updateNews] = useUpdateNewsMutation();
  const [deleteNews] = useDeleteNewsMutation();

  const [showModal, setShowModal] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);

  // these match the newsModel fields exactly: title, content, image, date, author
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [date, setDate] = useState("");
  const [author, setAuthor] = useState("");

  function openAdd() {
    setEditingArticle(null);
    setTitle("");
    setContent("");
    setImage("");
    setDate("");
    setAuthor("");
    setShowModal(true);
  }

  function openEdit(article) {
    setEditingArticle(article);
    setTitle(article.title);
    setContent(article.content);
    setImage(article.image || "");
    setDate(article.date || "");
    setAuthor(article.author || "");
    setShowModal(true);
  }

  async function handleSubmit() {
    // title, content and date are required by the backend
    if (!title || !content || !date) return;

    const newsData = { title, content, image, date, author };

    if (editingArticle) {
      await updateNews({ id: editingArticle._id, ...newsData });
    } else {
      await addNews(newsData);
    }
    setShowModal(false);
  }

  async function handleDelete(id) {
    await deleteNews(id);
  }

  if (isLoading) {
    return <p className="text-gray-500">Loading news...</p>;
  }

  if (isError) {
    return <p className="text-red-500">Could not load news. Check your backend is running.</p>;
  }

  return (
    <div className="anim-fadeIn">
      <div className="flex justify-end mb-6">
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-[#3EA6E0] hover:bg-[#161654] text-white font-semibold px-5 py-3 rounded-xl transition-colors"
        >
          <FaPlus /> Add Article
        </button>
      </div>

      {newsList.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center text-gray-500">
          No articles yet. Click "Add Article" to create one.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsList.map((article) => (
            <div key={article._id} className="bg-white rounded-2xl shadow-sm overflow-hidden anim-fadeInUp">
              {article.image ? (
                <img src={article.image} alt={article.title} className="w-full h-40 object-cover" />
              ) : (
                <div className="w-full h-40 bg-gray-200" />
              )}
              <div className="p-5">
                <h3 className="font-bold text-[#161654] mb-2">{article.title}</h3>
                <p className="text-sm text-gray-500 mb-1 line-clamp-3">{article.content}</p>
                <p className="text-xs text-gray-400 mb-4">
                  {article.date} {article.author ? `· ${article.author}` : ""}
                </p>
                <div className="flex gap-4">
                  <button onClick={() => openEdit(article)} className="text-[#3EA6E0] text-sm font-medium">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(article._id)}
                    className="text-red-400 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <Modal title={editingArticle ? "Edit Article" : "Add Article"} onClose={() => setShowModal(false)}>
          <Field label="Title">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-[#dde9fc] focus:outline-none focus:border-[#3EA6E0]"
            />
          </Field>

          <Field label="Content">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              className="w-full px-4 py-3 rounded-xl border border-[#dde9fc] focus:outline-none focus:border-[#3EA6E0] resize-none"
            />
          </Field>

          <Field label="Image URL">
            <input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder=""
              className="w-full px-4 py-3 rounded-xl border border-[#dde9fc] focus:outline-none focus:border-[#3EA6E0]"
            />
          </Field>

          <Field label="Date">
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="e.g. 2026-07-01"
              className="w-full px-4 py-3 rounded-xl border border-[#dde9fc] focus:outline-none focus:border-[#3EA6E0]"
            />
          </Field>

          <Field label="Author">
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Admin"
              className="w-full px-4 py-3 rounded-xl border border-[#dde9fc] focus:outline-none focus:border-[#3EA6E0]"
            />
          </Field>

          <ModalButtons onCancel={() => setShowModal(false)} onSave={handleSubmit} />
        </Modal>
      )}
    </div>
  );
};



function Modal({ title, onClose, children }) {

  return createPortal(
    <div
      className="fixed inset-0 bg-[#161654]/60 flex items-center justify-center p-4 anim-fadeIn"
      style={{ zIndex: 2147483647 }}
    >
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 anim-fadeInUp">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-lg font-bold text-[#161654]">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-[#161654]">
            <FaTimes />
          </button>
        </div>
        <div className="space-y-4">{children}</div>
      </div>
    </div>,
    document.body
  );
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#161654] mb-2">{label}</label>
      {children}
    </div>
  );
}

function ModalButtons({ onCancel, onSave }) {
  return (
    <div className="flex justify-end gap-3 pt-2">
      <button onClick={onCancel} className="px-5 py-3 rounded-xl font-semibold text-gray-500 hover:bg-gray-100">
        Cancel
      </button>
      <button
        onClick={onSave}
        className="px-5 py-3 rounded-xl font-semibold bg-[#3EA6E0] hover:bg-[#161654] text-white transition-colors"
      >
        Save
      </button>
    </div>
  );
}

export default AdminNews;