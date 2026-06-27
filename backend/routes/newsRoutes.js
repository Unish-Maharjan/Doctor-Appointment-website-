const express = require("express");
const router = express.Router();

const {
  getAllNews,
  getNewsById,
  addNews,
  updateNews,
  deleteNews,
} = require("../controllers/newsController");

const authenticate = require("../middleware/authenticate");
const adminOnly = require("../middleware/adminOnly");

router.get("/", getAllNews);
router.get("/:id", getNewsById);

router.post("/", authenticate, adminOnly, addNews);
router.put("/:id", authenticate, adminOnly, updateNews);
router.delete("/:id", authenticate, adminOnly, deleteNews);

module.exports = router;
