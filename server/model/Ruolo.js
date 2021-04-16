const { Sequelize, DataTypes } = require("sequelize");
var sequelize = require("../connection").getConnection();

module.exports = {
  Ruolo: sequelize.define("Ruolo", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
  }, {
      tableName: 'ruolo'
  }),
};

module.exports.Ruolo.sync()
.then(() => {
  console.log("Table ruolo created");
})


