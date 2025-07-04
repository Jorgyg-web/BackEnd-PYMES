const { Configuration, OpenAIApi } = require('openai');
const configuration = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(configuration);

const obtenerRespuesta = async (prompt) => {
  const res = await openai.createChatCompletion({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7
  });
  return res.data.choices[0].message.content;
};

module.exports = { obtenerRespuesta };
