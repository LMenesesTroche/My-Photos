const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('payments', {
    id_payments: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    id_user: {
      type: DataTypes.STRING,  // Should match the type in 'user' model
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    invoice: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, { 
    timestamps: false,
  });
};
