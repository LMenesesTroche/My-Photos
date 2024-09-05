const { DataTypes } = require('sequelize');

//This is the model where we keep the payments info
module.exports = (sequelize) => {
  sequelize.define('payments', {
    id_payments: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    id_user: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, { 
    timestamps: true,
  });
};