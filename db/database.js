// src/config/database.js
const mysql = require("mysql2/promise");

// create connection pool (recommended for production)
const pool = mysql.createPool({
  host:  "localhost",
  user:  "root",
  password:  "G4@67&*mQnY!",
  database: "db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
