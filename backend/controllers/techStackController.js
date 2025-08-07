const Techstack = require('../models/techStacks');

exports.getAllTechstacks = async (req, res) => {
  try {
    const techstacks = await Techstack.findAll({ order: [['createdAt', 'DESC']] });
    res.json(techstacks);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data techstack', error: error.message });
  }
};

exports.createTechstack = async (req, res) => {
  try {
    const { name } = req.body;
    const tech_image = req.file ? `/uploads/techstacks/${req.file.filename}` : null;

    const newTech = await Techstack.create({ name, tech_image });
    res.status(201).json(newTech);
  } catch (error) {
    res.status(500).json({ message: 'Gagal menambahkan techstack', error: error.message });
  }
};

exports.updateTechstack = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const techstack = await Techstack.findByPk(id);

    if (!techstack) return res.status(404).json({ message: 'Data tidak ditemukan' });

    const tech_image = req.file ? `/uploads/techstacks/${req.file.filename}` : techstack.tech_image;

    await techstack.update({ name, tech_image });
    res.json(techstack);
  } catch (error) {
    res.status(500).json({ message: 'Gagal memperbarui techstack', error: error.message });
  }
};

exports.deleteTechstack = async (req, res) => {
  try {
    const { id } = req.params;
    const tech = await Techstack.findByPk(id);
    if (!tech) return res.status(404).json({ message: 'Data tidak ditemukan' });

    await tech.destroy();
    res.json({ message: 'Berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: 'Gagal menghapus techstack', error: error.message });
  }
};
