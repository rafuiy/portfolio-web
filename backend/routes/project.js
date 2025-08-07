const express = require("express");
const router = express.Router();

const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} = require("../controllers/projectController");

const authenticateToken = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminOnlyMiddleware");
const upload = require("../middleware/uploadProjectImage");

// ✅ GET public
router.get("/", getAllProjects);
router.get("/:id", getProjectById);

// ✅ POST, PUT, DELETE (admin only)
router.post("/", authenticateToken, adminOnly, upload.single('project_icon'), createProject);
router.put("/:id", authenticateToken, adminOnly, upload.single('project_icon'), updateProject);
router.delete("/:id", authenticateToken, adminOnly, deleteProject);

module.exports = router;
