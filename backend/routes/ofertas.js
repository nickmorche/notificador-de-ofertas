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

//Deletar uma oferta
router.delete('/:id', async (req, res) => {
    try { 
        const { id } = req.params;
        const ofertaDeletada = await Oferta.findByIdAndDelete(id);
        if(!ofertaDeletada) {
            return res.status(404).json({ erro: 'Oferta não encontrada'});
        }
        res.json({ mensagem: 'Oferta deletada com sucesso' });
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

// Atualizar uma oferta
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const ofertaAtualizada = await Oferta.findByIdAndUpdate(id, req.body, { new: true });
        if (!ofertaAtualizada) {
            return res.status(404).json({ erro: 'Oferta não encontrada' });
        }
        res.json(ofertaAtualizada);
    } catch (err) {
        res.status(500).json({ erro: err.message });
    }
});

module.exports = router;