// index.js
const express = require('express');
const router = express.Router();

// Import routes
const authRoutes = require('./auth');
const experienceRoutes = require('./experience');
const techStackRoutes = require('./techStack');
const projectRoutes = require('./project');

// Public routes
router.use('/auth', authRoutes);

// Public Read (GET tidak perlu middleware)
router.use('/admin/experience', experienceRoutes);
router.use('/admin/tech-stack', techStackRoutes);
router.use('/admin/projects', projectRoutes);

module.exports = router;
