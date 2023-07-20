const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id:{
      type: DataTypes.UUID,   //Garantiza unicidad de id
      defaultValue: DataTypes.UUIDV4,   //uuid aleatorio para nuevo registro en tabla intermediaria
      primaryKey: true,
      allowNull: false,
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    weight_min:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    weight_max:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    height_min:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    height_max:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    life_span:{
      type: DataTypes.STRING,
      allowNull: true
    },
    image:{
      type: DataTypes.TEXT,
      allowNull: true
    },
    createdInDB: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    }
  },
  { timestamps: false }
);
};
