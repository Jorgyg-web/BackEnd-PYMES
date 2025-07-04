const express = require('express');
const router = express.Router();
const { verificarJWT } = require('../middlewares/authMiddleware');
const controller = require('../controllers/chatController');

router.use(verificarJWT);
router.post('/:botId', controller.responder);

module.exports = router;
