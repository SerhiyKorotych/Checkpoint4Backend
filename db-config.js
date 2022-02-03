require("dotenv").config();
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost", // address of the server
  port: 4000, // port of the DB server (mysql), not to be confused with the nodeJS server PORT !
  user: "root",
  password: "Sesewwe1",
  database: "movies",
});

module.exports = connection;
