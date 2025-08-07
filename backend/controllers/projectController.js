const {Project, Techstack }= require('../models');

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: [{ model: Techstack, as: 'techstacks' }],
      order: [['createdAt', 'DESC']],
    });
    res.json(projects);
  } catch (error) {
    console.error('❌ Error getAllProjects:', error); // tambahkan ini
    res.status(500).json({ message: 'Gagal mengambil project', error: error.message });
  }
};


exports.getProjectById = async (req, res) => {
  const project = await Project.findByPk(req.params.id, {
    include: [{ model: Techstack, as: 'techstacks' }],
  });
  if (!project) return res.status(404).json({ message: 'Project tidak ditemukan' });
  res.json(project);
};

exports.createProject = async (req, res) => {
  try {
    const { title, project_instance, preview_description, link_project, techstack_ids } = req.body;
    const project_icon = req.file ? `/uploads/projects/${req.file.filename}` : null;

    const newProject = await Project.create({
      title,
      project_instance,
      preview_description,
      project_icon,
      link_project
    });

    // Set techstacks jika ada
    if (techstack_ids) {
      const ids = Array.isArray(techstack_ids) ? techstack_ids : JSON.parse(techstack_ids);
      await newProject.setTechstacks(ids);
    }

    const result = await Project.findByPk(newProject.id, {
      include: [{ model: Techstack, as: 'techstacks' }],
    });

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal membuat project', error: error.message });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, project_instance, preview_description, techstack_ids } = req.body;

    const project = await Project.findByPk(id);
    if (!project) return res.status(404).json({ message: 'Project tidak ditemukan' });

    const project_icon = req.file ? `/uploads/projects/${req.file.filename}` : project.project_icon;

    await project.update({
      title,
      project_instance,
      preview_description,
      project_icon,
    });

    // Update techstack relasi
    if (techstack_ids) {
      const ids = Array.isArray(techstack_ids) ? techstack_ids : JSON.parse(techstack_ids);
      await project.setTechstacks(ids);
    }

    const result = await Project.findByPk(id, {
      include: [{ model: Techstack, as: 'techstacks' }],
    });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal memperbarui project', error: error.message });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByPk(id);
    if (!project) return res.status(404).json({ message: 'Project tidak ditemukan' });

    await project.destroy();
    res.json({ message: 'Berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus project', error: error.message });
  }
};
