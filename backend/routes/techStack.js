const express = require("express");
const router = express.Router();
const {
  getAllTechstacks,
  createTechstack,
  updateTechstack,
  deleteTechstack
} = require("../controllers/techStackController");

const authenticateToken = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminOnlyMiddleware");
const upload = require("../middleware/uploadTechstacksImage");

// GET bebas akses
router.get("/", getAllTechstacks);

// POST, PUT, DELETE hanya admin
router.post("/", authenticateToken, adminOnly, upload.single('tech_image'), createTechstack);
router.put("/:id", authenticateToken, adminOnly, upload.single('tech_image'), updateTechstack);
router.delete("/:id", authenticateToken, adminOnly, deleteTechstack);

module.exports = router;
