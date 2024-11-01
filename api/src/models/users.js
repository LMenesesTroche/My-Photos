const { DataTypes, BOOLEAN } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('user', {
    id_user: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
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
    hasPaid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    hasBeenBlocked:{
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  }, { 
    timestamps: false,
  });
};
