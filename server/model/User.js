const { Sequelize, DataTypes } = require("sequelize");
const Ruolo = require("./Ruolo").Ruolo;
var sequelize = require("../connection").getConnection();

module.exports = {
  User: sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cognome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_ruolo: {
      type: DataTypes.INTEGER,
      references: {
        model: Ruolo,
        key: 'id'
      }
    }
  }, {
      tableName: 'user'
  }),
};

module.exports.User.sync()
.then(() => {
  console.log("Table user created");
})


