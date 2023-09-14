const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schema = new Schema({
    idRegistro :{
        type: Number,
        required: true
    },
    texto :{
        type: String,
        required: true
    },
    ticket :{
        type: Number,
        required: true
    },
    ativo: {
        type: Boolean,
        required: true,
        default: true
    }
});

module.exports = mongoose.model('RegistroAtendimento', schema)