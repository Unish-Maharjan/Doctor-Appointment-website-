const express = require("express");
const router = express.Router();

const { getDashboardStats } = require("../controllers/reportController");
const authenticate = require("../middleware/authenticate");
const adminOnly = require("../middleware/adminOnly");

router.get("/dashboard", authenticate, adminOnly, getDashboardStats);

module.exports = router;
