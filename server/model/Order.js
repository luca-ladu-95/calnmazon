const { Sequelize, DataTypes } = require("sequelize");
const User = require("./User").User;
var sequelize = require("../connection").getConnection();

module.exports = {
  Order: sequelize.define("Order", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    dataOrdine: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numOrd: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: 'id'
      }
    }
  }, {
      tableName: 'order'
  }),
};

module.exports.Order.sync()
.then(() => {
  console.log("Table order created");
})


