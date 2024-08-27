const { DataTypes } = require('sequelize');
// Este es el modelo donde se guardan los datos de los usuarios
module.exports = (sequelize) => {
  sequelize.define('Users', {
    auth0Id: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    photos:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
    }
  }, { 
    timestamps: false,
  });
};