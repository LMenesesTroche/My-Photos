const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');//This is for to make a unique id
//This is the model in wich we save the data from the dogs
module.exports = (sequelize) => {
  sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(), // Genera un UUID automáticamente al crear un nuevo registro
      primaryKey: true,
    },
    gmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, { timestamps: false });

  // Gancho para generar el UUID antes de crear un nuevo registro
  sequelize.models.User.beforeCreate((User, options) => {
    User.id = uuidv4(); // Asigna un UUID generado automáticamente al campo 'id'
  });
};
