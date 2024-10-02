require('dotenv').config();
const { Sequelize } = require('sequelize');
const paymentsModel = require('./models/payments');
const userModel = require('./models/users');
const photosModel = require('./models/photos');

const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

// Conexión a la base de datos
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/photos`, {
  logging: false, 
  native: false, 
});

// Definir modelos
userModel(sequelize);     // Modelo de usuario
paymentsModel(sequelize); // Modelo de pagos
photosModel(sequelize);   // Modelo de fotos

// Obtener las referencias a los modelos definidos
const { user, payments, photos } = sequelize.models;

// Relaciones

// Relación de 1 a muchos de usuario a pagos
user.hasMany(payments, {
  foreignKey: 'id_user',  // Clave foránea en el modelo de pagos que apunta a user
  sourceKey: 'id_user',   // Clave primaria en el modelo de usuario
});

payments.belongsTo(user, {
  foreignKey: 'id_user',  // Clave foránea en el modelo de pagos
  targetKey: 'id_user',   // Clave primaria del modelo de usuario
});

// Relación de 1 a muchos de usuario a fotos
user.hasMany(photos, {
  foreignKey: 'id_user', // Clave foránea en el modelo de fotos
});

photos.belongsTo(user, {
  foreignKey: 'id_user',  // Clave foránea en el modelo de fotos
});

// Exportar los modelos y la conexión
module.exports = {
  user,
  payments,
  photos,
  conn: sequelize, // Exporta la conexión para usarla en otros archivos
};
