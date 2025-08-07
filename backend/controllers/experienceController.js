const Experience = require('../models/experience');

exports.getAllExperiences = async (req, res) => {
  const experiences = await Experience.findAll();
  res.json(experiences);
};

exports.createExperience = async (req, res) => {
  const { instance, position, desc, year } = req.body;
  const newExp = await Experience.create({ instance, position, desc, year });
  res.status(201).json(newExp);
};

exports.updateExperience = async (req, res) => {
  const { id } = req.params;
  const { instance, position, desc, year } = req.body;

  const experience = await Experience.findByPk(id);
  if (!experience) return res.status(404).json({ message: 'Data tidak ditemukan' });

  await experience.update({ instance, position, desc, year });
  res.json(experience);
};

exports.deleteExperience = async (req, res) => {
  const { id } = req.params;
  const experience = await Experience.findByPk(id);
  if (!experience) return res.status(404).json({ message: 'Data tidak ditemukan' });

  await experience.destroy();
  res.json({ message: 'Berhasil dihapus' });
};
