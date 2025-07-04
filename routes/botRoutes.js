const express = require('express');
const router = express.Router();
const { verificarJWT } = require('../middlewares/authMiddleware');
const controller = require('../controllers/botController');

router.use(verificarJWT);

router.get('/', controller.listarBots);
router.post('/', controller.crearBot);
router.put('/:id', controller.editarBot);
router.delete('/:id', controller.eliminarBot);

module.exports = router;
