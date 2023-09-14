const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const schema = new Schema({
    idAtendente :{
        type: String,
        required: true
    },
    idPessoa :{
        type: String,
        required: true
    },
    idSetor :{
        type: String,
        required: true
    },
    ativo: {
        type: Boolean,
        required: true,
        default: true
    }
});

module.exports = mongoose.model('Atendente', schema)