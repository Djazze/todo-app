const sequelize = require('./db');

// Sync all models with the database
async function syncModels() {
  try {
    await sequelize.sync();
    console.log('Models synchronized successfully');
  } catch (error) {
    console.error('Error synchronizing models:', error);
  }
}

module.exports = syncModels;
