const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'clave-secreta';

const verificarJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // "Bearer token"

  if (!token) return res.sendStatus(401);

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token inválido' });
  }
};

module.exports = { verificarJWT };
