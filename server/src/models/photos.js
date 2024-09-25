const { DataTypes } = require('sequelize');

//This is the model where we keep the payments info
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
  }, { 
    timestamps: false,
  });
};