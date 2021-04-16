const { Sequelize, DataTypes } = require("sequelize");
var sequelize = require("../connection").getConnection();

module.exports = {
  Categoria: sequelize.define("Categoria", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
      tableName: 'categoria'
  }),
};

module.exports.Categoria.sync()
.then(() => {
  console.log("Table categoria created");
})


