import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';

// Define Sequelize Connnection
const {
  POSTGRES_DATABASE,
  POSTGRES_USERNAME,
  POSTGRES_PASSWORD,
  POSTGRES_HOST,
  POSTGRES_PORT,
} = process.env;

const sequelize = new Sequelize(`postgres://${POSTGRES_USERNAME}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DATABASE}`, {
  logging: false,
});

const db = {};
// Model Import
fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== 'index.js');
  })
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

// Relationships Start
// Relationships End (Love isn't real.)

// Export
export default Object.assign({}, {
  sequelize,
  Sequelize,
}, db);
