const { DataTypes} = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('genre', {
    id:{
          type: DataTypes.UUID,
          allowNull: false,
            unique: true,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        defaultValue: "Genero_Misteriosa"
    },
    image_background:{
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLQkBymVn7C_GtrCNZiog_8P7sK0NADOPxHQ&usqp=CAU'
    }
  }, {
    timestamps: false
    /*timestamps: true,
    createdAt: false,
    updatedAt: 'actualizado'*/
  });
};

