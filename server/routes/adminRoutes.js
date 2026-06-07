const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

const {
  getDashboardStats,
  getUsers,
  deleteUser
} = require("../controllers/adminController");

router.get("/stats", auth, getDashboardStats);
router.get("/users", auth, getUsers);
router.delete("/users/:id", auth, deleteUser);

module.exports = router;