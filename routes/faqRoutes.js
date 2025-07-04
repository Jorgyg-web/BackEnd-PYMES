const express = require('express');
const router = express.Router();
const { verificarJWT } = require('../middlewares/authMiddleware');
const controller = require('../controllers/faqController');

router.use(verificarJWT);

router.get('/:botId', controller.listarFaqs);
router.post('/:botId', controller.crearFaq);
router.put('/:id', controller.editarFaq);
router.delete('/:id', controller.eliminarFaq);

module.exports = router;
