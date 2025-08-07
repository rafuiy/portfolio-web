const sequelize = require('../config/database');

// Import semua model
const Project = require('./projects');
const Techstack = require('./techStacks');
const DetailedProject = require('./detailedProject');

// Relasi Project ↔ DetailedProject
Project.hasMany(DetailedProject, {
  foreignKey: 'project_id',
  as: 'details',
  onDelete: 'CASCADE',
});
DetailedProject.belongsTo(Project, {
  foreignKey: 'project_id',
  as: 'project',
});

// Relasi Project ↔ Techstack (many-to-many)
Project.belongsToMany(Techstack, {
  through: 'project_techstacks',
  foreignKey: 'project_id',
  otherKey: 'techstack_id',
  as: 'techstacks',
});
Techstack.belongsToMany(Project, {
  through: 'project_techstacks',
  foreignKey: 'techstack_id',
  otherKey: 'project_id',
  as: 'projects',
});

module.exports = {
  sequelize,
  Project,
  Techstack,
  DetailedProject
};
