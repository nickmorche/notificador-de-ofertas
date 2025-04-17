const express = require('express');
const router = express.Router();
const Oferta = require('../models/Oferta');

// Criar uma nova oferta
router.post('/', async (req, res) => {
    try {
        const novaOferta = await Oferta.create(req.body);
        res.status(201).json(novaOferta);
    } catch (err) {
        res.status(400).json({erro: err.message });
    }
});

// Listar todas as ofertas
router.get('/', async (req, res) => {
    try {
        const ofertas = await Oferta.find().sort({ createdAt: -1 });
        res.json(ofertas);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

module.exports = router;