const express = require('express');
const router = express.Router();
const { verificarJWT } = require('../middlewares/authMiddleware');
const controller = require('../controllers/messageController');

router.use(verificarJWT);
router.get('/:botId', controller.listarMensajes);

module.exports = router;
