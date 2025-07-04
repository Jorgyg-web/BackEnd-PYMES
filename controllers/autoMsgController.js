const pool = require('../config');

const listarMensajesAuto = async (req, res) => {
  const result = await pool.query(
    'SELECT tipo, contenido FROM mensajes_auto WHERE bot_id = $1',
    [req.params.botId]
  );
  res.json(result.rows);
};

const guardarMensajeAuto = async (req, res) => {
  const { tipo, contenido } = req.body;
  const { botId } = req.params;

  const existe = await pool.query(
    'SELECT * FROM mensajes_auto WHERE bot_id = $1 AND tipo = $2',
    [botId, tipo]
  );

  if (existe.rowCount > 0) {
    const r = await pool.query(
      'UPDATE mensajes_auto SET contenido = $1 WHERE bot_id = $2 AND tipo = $3 RETURNING *',
      [contenido, botId, tipo]
    );
    res.json(r.rows[0]);
  } else {
    const r = await pool.query(
      'INSERT INTO mensajes_auto (bot_id, tipo, contenido) VALUES ($1, $2, $3) RETURNING *',
      [botId, tipo, contenido]
    );
    res.json(r.rows[0]);
  }
};

module.exports = { listarMensajesAuto, guardarMensajeAuto };
