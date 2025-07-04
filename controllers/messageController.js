const pool = require('../config');

const listarMensajes = async (req, res) => {
  const { botId } = req.params;
  const result = await pool.query(
    'SELECT * FROM mensajes WHERE bot_id = $1 ORDER BY timestamp DESC',
    [botId]
  );
  res.json(result.rows);
};

module.exports = { listarMensajes };
