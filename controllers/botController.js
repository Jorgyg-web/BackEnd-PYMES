const pool = require('../config');

const listarBots = async (req, res) => {
  const result = await pool.query('SELECT * FROM bots WHERE usuario_id = $1', [req.user.id]);
  res.json(result.rows);
};

const crearBot = async (req, res) => {
  const { nombre, tono, idioma } = req.body;
  const result = await pool.query(
    'INSERT INTO bots (nombre, usuario_id, tono, idioma) VALUES ($1, $2, $3, $4) RETURNING *',
    [nombre, req.user.id, tono, idioma]
  );
  res.json(result.rows[0]);
};

const editarBot = async (req, res) => {
  const { nombre, tono, idioma } = req.body;
  const id = req.params.id;
  const result = await pool.query(
    'UPDATE bots SET nombre = $1, tono = $2, idioma = $3 WHERE id = $4 AND usuario_id = $5 RETURNING *',
    [nombre, tono, idioma, id, req.user.id]
  );
  res.json(result.rows[0]);
};

const eliminarBot = async (req, res) => {
  const id = req.params.id;
  await pool.query('DELETE FROM bots WHERE id = $1 AND usuario_id = $2', [id, req.user.id]);
  res.sendStatus(204);
};

module.exports = { listarBots, crearBot, editarBot, eliminarBot };
