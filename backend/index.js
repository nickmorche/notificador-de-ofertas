const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ Conectado ao MONGODB"))
    .catch(err => console.error("Erro ao conectar: ", err));

app.use('/api/ofertas', require('./routes/ofertas'));

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});