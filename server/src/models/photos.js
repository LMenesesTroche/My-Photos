const { DataTypes } = require('sequelize');

// Definir el modelo 'photos'
// Modelo 'photos'
module.exports = (sequelize) => {
  sequelize.define('photos', {
    id_photos: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    lowUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    highUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Cambiar 'userId' a 'id_user' para que coincida con la relación
    id_user: {
      type: DataTypes.STRING,
      allowNull: false, // No puede ser nulo
    },
  }, { 
    timestamps: false,
  });
};

