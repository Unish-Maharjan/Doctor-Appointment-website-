const express = require("express");
const router = express.Router();

const {
  getStaffRoles,
  createStaff,
  getAllStaff,
  getStaffById,
  updateStaff,
  deleteStaff,
} = require("../controllers/staffController");

const authenticate = require("../middleware/authenticate");
const adminOnly = require("../middleware/adminOnly");

router.get("/roles", authenticate, adminOnly, getStaffRoles);
router.get("/", authenticate, adminOnly, getAllStaff);
router.get("/:id", authenticate, adminOnly, getStaffById);
router.post("/", authenticate, adminOnly, createStaff);
router.put("/:id", authenticate, adminOnly, updateStaff);
router.delete("/:id", authenticate, adminOnly, deleteStaff);

module.exports = router;
