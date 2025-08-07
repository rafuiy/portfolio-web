// routes/experienceRoutes.js
const express = require("express");
const router = express.Router();
const {
  getAllExperiences,
  createExperience,
  updateExperience,
  deleteExperience
} = require("../controllers/experienceController");

const authenticateToken = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminOnlyMiddleware");

// ✅ GET bebas akses
router.get("/", getAllExperiences);

// ✅ POST, PUT, DELETE hanya untuk admin
router.post("/", authenticateToken, adminOnly, createExperience);
router.put("/:id", authenticateToken, adminOnly, updateExperience);
router.delete("/:id", authenticateToken, adminOnly, deleteExperience);

module.exports = router;
