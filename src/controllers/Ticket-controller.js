const Atendente = require("../models/Atendente");
const repository = require("../repositories/Ticket-repository")
const ValidationContract = require('../util/validator')

exports.getAll = async (req, res, next) => {
    const data = await repository.get();

    if (data == null)
        res.status(204).send();

    res.status(200).send(data);
}

exports.post = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.isRequired(req.body.idAtendente, 'O id do atendente é obrigatório.');

    try {
        if (!contract.isValid()) {
            res.status(400).send({
                message: "Erro ao cadastrar as informações. Favor validar"
            });
            return;
        }

        // Aqui você busca o atendente pelo idAtendente na sua base de dados
        const atendente = await Atendente.findById(req.body.idAtendente);

        if (!atendente) {
            res.status(404).send({
                message: "Atendente não encontrado."
            });
            return;
        }

        // Agora você pode prosseguir com a criação do ticket, usando req.body.idAtendente se necessário.

        await repository.create(req.body);

        res.status(200).send("Criado com sucesso!");
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: "Erro no servidor, favor contactar o administrador"
        });
    }
}

exports.update = async (req, res, next) => {
    const idTicket = req.params.idTicket; //na rota daremos o apelido deste id

    await repository.update(idTicket, res.body);

    //Enviar email informando que sofreu uma alteração

    res.status(200).send("Atualizado com sucesso!")
};

exports.delete = async (req, res, next) => {
    const idTicket = req.params.idTicket; //na rota daremos o apelido deste id
    await repository.delete(idTicket); //Deletando um produto pelo id
    res.status(200).send('Removido com sucesso!')
}

exports.getById = async (req, res, next) => {

    const idTicket = req.params.idTicket;
    const data = await repository.getById(idTicket);

    if (data == null)
        res.status(404).send()

    res.status(200).send(data);
}