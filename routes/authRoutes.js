const express = require("express");
const router = express.Router();
const auth = require("../controllers/authController");

// Registro y login
router.post("/registro", auth.registroUsuario);
router.post("/login", auth.loginUsuario);

module.exports = router;
