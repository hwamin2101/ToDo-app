const db = require('../config/db.js');

exports.findByEmail = async (email) => {
  const [rows] = await db.query('SELECT * FROM user WHERE email = ?', [email]);
  return rows[0];
};

exports.create = async (name, email, password) => {
  const [result] = await db.query('INSERT INTO user (name, email, password) VALUES (?, ?, ?)', [
    name,
    email,
    password,
  ]);
  return result;
};
