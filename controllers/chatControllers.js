const pool = require('../config');
const openai = require('../services/openaiService');

const responder = async (req, res) => {
  const { pregunta } = req.body;
  const { botId } = req.params;

  // 1. Buscar coincidencia exacta en FAQs
  const faqs = await pool.query(
    'SELECT * FROM faqs WHERE bot_id = $1 AND LOWER(pregunta) = LOWER($2)',
    [botId, pregunta.trim()]
  );

  let respuesta, fuente;
  if (faqs.rowCount > 0) {
    respuesta = faqs.rows[0].respuesta;
    fuente = 'faq';
  } else {
    // 2. Consultar a OpenAI
    const botInfo = await pool.query('SELECT * FROM bots WHERE id = $1', [botId]);
    const tono = botInfo.rows[0]?.tono || 'amigable';
    const prompt = `Responde en un tono ${tono} a esta pregunta de cliente: ${pregunta}`;

    respuesta = await openai.obtenerRespuesta(prompt);
    fuente = 'ia';
  }

  // 3. Guardar el mensaje
  await pool.query(
    `INSERT INTO mensajes (bot_id, usuario_final, pregunta, respuesta, fuente) 
     VALUES ($1, $2, $3, $4, $5)`,
    [botId, req.user.id, pregunta, respuesta, fuente]
  );

  res.json({ respuesta, fuente });
};
module.exports = { responder };
