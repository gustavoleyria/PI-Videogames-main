const { DataTypes, Sequelize } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      primaryKey: true,
     defaultValue: DataTypes.UUIDV4
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false
    },
    description:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    release_date:{
      type: DataTypes.DATEONLY,
      defaultValue: DataTypes.NOW
    },
    rating:{
      type: DataTypes.FLOAT
    },
    background_image:{
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'https://cdn.pixabay.com/photo/2016/07/30/21/03/mario-1558012__340.jpg'
    },
    /*platforms :{
      type: DataTypes.STRING,
      allowNull: false
    }*/
  }, {
    timestamps: false
    /*timestamps: true,
    createdAt: false,
    updatedAt: 'actualizado'*/
  });
};
