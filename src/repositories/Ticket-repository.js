const mongoose = require('mongoose')
const Ticket = mongoose.model('Ticket')


exports.get = async () => {
    const result = await Ticket.find({
        ativo: true
    });
    return result;
}

exports.create = async (data) => {
    console.log(data);
    let ticket = Ticket(data);
    await ticket.save();

}

exports.delete = async (idTicket) => {
    await Ticket.findByIdAndDelete(
        idTicket, {
            $set: {
                ativo: false
            }
        })
}

exports.getById = async (idTicket) => {
    const result = await Ticket.findOne({
            _idTicket: idTicket
        },
        "_id idTicket idAtendente idCliente titulo telefone ativo"
    );

    return result;


}

exports.update = async (idTicket, data) => {
    await Ticket.findByIdAndUpdate(idTicket, {
        $set: {
            idTicket: data.idTicket,
            idAtendente: data.idAtendente,
            idCliente: data.idCliente,
            titulo: data.titulo,
            telefone: data.telefone,
            ativo: data.ativo
        }
    })
}