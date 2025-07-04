const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'clave-secreta';

const generarToken = (usuario) => {
  return jwt.sign({ id: usuario.id, rol: usuario.rol }, SECRET, { expiresIn: '7d' });
};

const verificarToken = (token) => {
  return jwt.verify(token, SECRET);
};

module.exports = { generarToken, verificarToken };
