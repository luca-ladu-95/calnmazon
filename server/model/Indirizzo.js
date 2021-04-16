const { Sequelize, DataTypes } = require("sequelize");
const User = require("./User").User;
var sequelize = require("../connection").getConnection();

module.exports = {
  Indirizzo: sequelize.define("Indirizzo", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    via: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    citta: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cap: {
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
      tableName: 'indirizzo'
  }),
};

module.exports.Indirizzo.sync()
.then(() => {
  console.log("Table indirizzo created");
})


