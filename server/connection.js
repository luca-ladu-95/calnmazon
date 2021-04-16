const { Sequelize } = require("sequelize");
module.exports = {
  getConnection: function () {
    return new Sequelize("clanmazon", "root", "admin", {
      host: "localhost",
      dialect: "mysql",
      define: {
        timestamps: false,
      },
    });
  },
};
