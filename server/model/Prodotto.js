const { Sequelize, DataTypes } = require("sequelize");
const Categoria = require("./Categoria").Categoria;
var sequelize = require("../connection").getConnection();

module.exports = {
  Prodotto: sequelize.define("Prodotto", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descrizione: {
      type: DataTypes.STRING,
      allowNull: false
    },
    prezzo: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    src: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_categoria: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Categoria,
        key: 'id'
      }
    }
  }, {
      tableName: 'prodotto'
  }),
};

module.exports.Prodotto.sync()
.then(() => {
  console.log("Table prodotto created");
})


