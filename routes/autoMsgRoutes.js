const express = require('express');
const router = express.Router();
const { verificarJWT } = require('../middlewares/authMiddleware');
const controller = require('../controllers/autoMsgController');

router.use(verificarJWT);

// obtener todos los mensajes de un bot
router.get('/:botId', controller.listarMensajesAuto);

// crear o actualizar mensaje de un tipo
router.post('/:botId', controller.guardarMensajeAuto);

module.exports = router;
