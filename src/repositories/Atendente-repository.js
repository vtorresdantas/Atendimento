const mongoose = require('mongoose');
const AtendenteModel = mongoose.model('Atendente');

exports.get = async () => {
    const result = await AtendenteModel.find({
        ativo: true
    });
    return result;
}

exports.create = async (data) => {
    let atendente = new AtendenteModel(data);
    await atendente.save();
}

exports.delete = async (idAtendente) => {
    await AtendenteModel.findByIdAndDelete(
        idAtendente, {
            $set: {
                ativo: false
            }
        })
}

exports.getById = async (idAtendente) => {
    const result = await AtendenteModel.findOne({
        idAtendente: idAtendente
        },
        "_id idAtendente idPessoa idSetor ativo"
    );
    return result;
}

exports.update = async (idAtendente, data) => {
    await AtendenteModel.findByIdAndUpdate(idAtendente, {
        $set: {
            idAtendente: data.idAtendente,
            idPessoa: data.idPessoa,
            idSetor: data.idSetor,
            ativo: data.ativo
        }
    });
}
