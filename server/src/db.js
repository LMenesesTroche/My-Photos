require('dotenv').config();
const { Sequelize } = require('sequelize');
const paymentsModel = require('./models/payments');
const userModel = require('./models/users');
const photosModel = require('./models/photos');

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/photos`, {
  logging: false, 
  native: false, 
});

// DB models
userModel(sequelize);
paymentsModel(sequelize);
photosModel(sequelize);

// Relaciones
const { user, payments, photos } = sequelize.models;

// Relación de 1 a muchos de usuario a pagos
user.hasMany(payments);
payments.belongsTo(user);

// Relación de 1 a muchos de usuario a fotos
user.hasMany(photos, { foreignKey: 'id_user' }); // Especifica explícitamente la clave foránea
photos.belongsTo(user, { foreignKey: 'id_user' }); // Especifica explícitamente la clave foránea

module.exports = {
  user,
  payments,
  photos,
  conn: sequelize,
};
