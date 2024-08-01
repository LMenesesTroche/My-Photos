const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
//This is the model in wich we save the data from the temperaments
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Temperaments', {
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement:true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
  },{timestamps: false});
};