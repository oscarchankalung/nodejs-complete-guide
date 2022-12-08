const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node-complete",
  password: "ddJZgjRLy987x7n23.2_",
});

module.exports = pool.promise();
