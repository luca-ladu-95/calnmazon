const { Sequelize, DataTypes } = require("sequelize");
const User = require("./User").User;
var sequelize = require("../connection").getConnection();

module.exports = {
  MetodoPagamento: sequelize.define("MetodoPagamento", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    numero: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mese_scadenza: {
      type: DataTypes.STRING,
      allowNull: false
    },
    anno_scadenza: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    codice: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_utente: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    }
  }, {
      tableName: 'metodo_pagamento'
  }),
};

module.exports.MetodoPagamento.sync()
.then(() => {
  console.log("Table metodo_pagamento created");
})


