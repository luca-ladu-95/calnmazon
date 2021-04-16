const { Sequelize, DataTypes } = require("sequelize");
const Prodotto = require("./Prodotto").Prodotto;
const Order = require("./Order").Order;
var sequelize = require("../connection").getConnection();

module.exports = {
  OrderProduct: sequelize.define("OrderProduct", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    qta: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    id_prodotto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Prodotto,
        key: 'id'
      }
    },
    id_ordine: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Order,
        key: 'id'
      }
    }
  }, {
      tableName: 'ordine-prodotto'
  }),
};

module.exports.OrderProduct.sync()
.then(() => {
  console.log("Table ordine-prodotto created");
})


