const pool = require('../config');

const listarUsuarios = async (req, res) => {
  const result = await pool.query('SELECT id, email, nombre, rol, created_at FROM users');
  res.json(result.rows);
};

const listarBots = async (req, res) => {
  const result = await pool.query(`
    SELECT b.*, u.email 
    FROM bots b 
    JOIN users u ON b.usuario_id = u.id
    ORDER BY b.created_at DESC
  `);
  res.json(result.rows);
};

const estadisticasGlobales = async (req, res) => {
  const totalMensajes = await pool.query('SELECT COUNT(*) FROM mensajes');
  const totalIA = await pool.query("SELECT COUNT(*) FROM mensajes WHERE fuente = 'ia'");
  const totalFAQ = await pool.query("SELECT COUNT(*) FROM mensajes WHERE fuente = 'faq'");
  const totalBots = await pool.query('SELECT COUNT(*) FROM bots');
  const totalUsuarios = await pool.query('SELECT COUNT(*) FROM users');

  res.json({
    totalMensajes: Number(totalMensajes.rows[0].count),
    totalIA: Number(totalIA.rows[0].count),
    totalFAQ: Number(totalFAQ.rows[0].count),
    totalBots: Number(totalBots.rows[0].count),
    totalUsuarios: Number(totalUsuarios.rows[0].count)
  });
};

module.exports = { listarUsuarios, listarBots, estadisticasGlobales };
