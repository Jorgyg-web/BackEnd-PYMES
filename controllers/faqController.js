const pool = require('../config');

const listarFaqs = async (req, res) => {
  const botId = req.params.botId;
  const result = await pool.query('SELECT * FROM faqs WHERE bot_id = $1', [botId]);
  res.json(result.rows);
};

const crearFaq = async (req, res) => {
  const { pregunta, respuesta } = req.body;
  const result = await pool.query(
    'INSERT INTO faqs (bot_id, pregunta, respuesta) VALUES ($1, $2, $3) RETURNING *',
    [req.params.botId, pregunta, respuesta]
  );
  res.json(result.rows[0]);
};

const editarFaq = async (req, res) => {
  const { pregunta, respuesta } = req.body;
  const result = await pool.query(
    'UPDATE faqs SET pregunta = $1, respuesta = $2 WHERE id = $3 RETURNING *',
    [pregunta, respuesta, req.params.id]
  );
  res.json(result.rows[0]);
};

const eliminarFaq = async (req, res) => {
  await pool.query('DELETE FROM faqs WHERE id = $1', [req.params.id]);
  res.sendStatus(204);
};

module.exports = { listarFaqs, crearFaq, editarFaq, eliminarFaq };
