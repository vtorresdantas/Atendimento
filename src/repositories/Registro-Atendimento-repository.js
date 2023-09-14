const mongoose = require('mongoose');
const RegistroAtendimento = mongoose.model('RegistroAtendimento');

exports.get = async () => {
    const result = await RegistroAtendimento.find({
        ativo: true
    });
    return result;
}

exports.create = async (data) => {
    let registroAtendimento = new RegistroAtendimento(data);
    await registroAtendimento.save();
}

exports.delete = async (idRegistro) => {
    await RegistroAtendimento.findByIdAndDelete(idRegistro, {
        $set: {
            ativo: false
        }
    });
}

exports.getById = async (idRegistro) => {
    const result = await RegistroAtendimento.findOne({
        idRegistro: idRegistro
    }, "_id idRegistro texto ticket ativo");

    return result;
}

exports.update = async (idRegistro, data) => {
    await RegistroAtendimento.findByIdAndUpdate(idRegistro, {
        $set: {
            idRegistro: data.idRegistro,
            texto: data.texto,
            ticket: data.ticket,
            ativo: data.ativo
        }
    });
}
