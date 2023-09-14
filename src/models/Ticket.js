const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schema = new Schema({
    idTicket :{
        type: String,
        required: true
    },
    idAtendente :{
        type: String,
        required: true
    },
    idCliente: {
        type: String,
        required: true,
    },
    titulo :{
        type: String,
        required: true
    },
    telefone: {
        type: String,
        required: true,
    },
    ativo: {
        type: Boolean,
        required: true,
        default: true
    }
});

module.exports = mongoose.model('Ticket', schema)