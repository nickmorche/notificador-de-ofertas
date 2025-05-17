const mongoose = require('mongoose')

const ofertaSchema = new mongoose.Schema({
    produto: String,
    url: String,
    palavraChave: String,
    marca: String,
    status: {
        type: String,
        enum: ['ativa', 'inativa'],
        default: 'ativa'
    },
    deletedAt: Date,
}, {
    timestamps: true
})

module.exports = mongoose.model('Oferta', ofertaSchema);