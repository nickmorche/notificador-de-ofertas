const mongoose = require('mongoose')

const ofertaSchema = new mongoose.Schema({
    produto: String,
    url: String,
    palavraChave: String,
    frequencia: String,
    meioNotificacao: String,
    status: {
        type: String,
        enum: ['ativa', 'inativa'],
        default: 'ativa'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Oferta', ofertaSchema);