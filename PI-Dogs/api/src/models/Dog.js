const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Dog",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        unique: true
      },
      image: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      age: {
        type: DataTypes.STRING,
      },
      maxHeight: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      minHeight: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      // Peso
      maxWeight: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      minWeight: {
        type: DataTypes.STRING,
        // allowNull: false,
      },
      dataBaseDog: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    { timestamps: false }
  );
};
