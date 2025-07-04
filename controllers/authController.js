const bcrypt = require("bcrypt");
const db = require("../config");


const registroUsuario = async (req, res) => {
  const { email, password, nombre } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query(
      "INSERT INTO users (email, password_hash, nombre) VALUES ($1, $2, $3) RETURNING *",
      [email, hashedPassword, nombre]
    );
    res.status(201).json({ user: result.rows[0] });
  } catch (err) {
    console.error("Error al registrar:", err.code, err.message);
    if (err.code === '23505') {
      return res.status(409).json({ message: "El correo ya está registrado" });
    }
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const loginUsuario = async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    // Aquí podrías generar un token JWT, por simplicidad solo devolvemos el usuario
    res.json({ user });
  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).json({ message: "Error en login" });
  }
};

module.exports = { registroUsuario, loginUsuario };
