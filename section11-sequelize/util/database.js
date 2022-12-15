const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "node-complete",
  "root",
  "ddJZgjRLy987x7n23.2_",
  { dialect: "mysql", host: "localhost" },
);

module.exports = sequelize;
