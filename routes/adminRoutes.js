const express = require('express');
const router = express.Router();
const { verificarJWT } = require('../middlewares/authMiddleware');
const controller = require('../controllers/adminController');

// Middleware solo admins
const soloAdmins = (req, res, next) => {
  if (req.user.rol !== 'admin') return res.sendStatus(403);
  next();
};

router.use(verificarJWT, soloAdmins);

router.get('/usuarios', controller.listarUsuarios);
router.get('/bots', controller.listarBots);
router.get('/uso', controller.estadisticasGlobales);

module.exports = router;
