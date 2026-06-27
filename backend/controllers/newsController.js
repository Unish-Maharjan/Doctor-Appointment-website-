const News = require("../models/newsModel");

async function getAllNews(req, res) {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch news", error: error.message });
  }
}

async function getNewsById(req, res) {
  try {
    const newsItem = await News.findById(req.params.id);

    if (!newsItem) {
      return res.status(404).json({ message: "News not found" });
    }

    res.status(200).json(newsItem);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch news", error: error.message });
  }
}

async function addNews(req, res) {
  try {
    const { title, content, image, date, author } = req.body;

    if (!title || !content || !date) {
      return res.status(400).json({ message: "Title, content and date are required" });
    }

    const newNews = new News({ title, content, image, date, author });
    const savedNews = await newNews.save();

    res.status(201).json(savedNews);
  } catch (error) {
    res.status(500).json({ message: "Failed to add news", error: error.message });
  }
}

async function updateNews(req, res) {
  try {
    const updatedNews = await News.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedNews) {
      return res.status(404).json({ message: "News not found" });
    }

    res.status(200).json(updatedNews);
  } catch (error) {
    res.status(500).json({ message: "Failed to update news", error: error.message });
  }
}

async function deleteNews(req, res) {
  try {
    const deletedNews = await News.findByIdAndDelete(req.params.id);

    if (!deletedNews) {
      return res.status(404).json({ message: "News not found" });
    }

    res.status(200).json({ message: "News deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete news", error: error.message });
  }
}

module.exports = {
  getAllNews,
  getNewsById,
  addNews,
  updateNews,
  deleteNews,
};
