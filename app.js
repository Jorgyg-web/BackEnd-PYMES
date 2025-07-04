const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));

// Rutas
// Ejemplo: app.use('/api/bots', require('./routes/botRoutes'));

app.get('/', (req, res) => {
  res.send('PymeBot backend funcionando');
});

const authRoutes = require("./routes/authRoutes");
app.use("/api", authRoutes);

const botRoutes = require("./routes/botRoutes");
app.use("/api/bots", botRoutes);

const faqRoutes = require("./routes/faqRoutes");
app.use("/api/faqs", faqRoutes);

// Escuchar después de definir todo
app.listen(port, () => {
  console.log(`Servidor backend escuchando en http://localhost:${port}`);
});


