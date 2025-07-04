const { Pool } = require('pg');
const pool = new Pool(); // Usa config.js si prefieres

const crearUsuario = async ({ email, passwordHash, nombre, rol }) => {
  const result = await pool.query(
    `INSERT INTO users (email, password_hash, nombre, rol) VALUES ($1, $2, $3, $4) RETURNING *`,
    [email, passwordHash, nombre, rol]
  );
  return result.rows[0];
};

const buscarUsuarioPorEmail = async (email) => {
  const result = await pool.query(
    `SELECT * FROM users WHERE email = $1`,
    [email]
  );
  return result.rows[0];
};

module.exports = { crearUsuario, buscarUsuarioPorEmail };
