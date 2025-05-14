const fs = require('fs');
const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  multipleStatements: true,
});

const initSQL = fs.readFileSync('./sql/init.sql', 'utf8');

connection.query(initSQL, (err, result) => {
  if (err) throw err;
  console.log("Database and tables created");
  connection.end();
});
