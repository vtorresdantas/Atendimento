const repository = require("../repositories/Registro-Atendimento-repository");
const ValidationContract = require('../util/validator');

exports.getAll = async (req, res, next) => {
    const data = await repository.get();

    if (!data || data.length === 0)
        return res.status(204).send();

    res.status(200).send(data);
}

exports.post = async (req, res, next) => {
    let contract = new ValidationContract();

    // Adicione suas regras de validação aqui
    // Por exemplo:
    contract.isRequired(req.body.nome, 'O nome é obrigatório');
    contract.isRequired(req.body.email, 'O email é obrigatório');
    // Adicione outras regras conforme necessário

    try {
        if (!contract.isValid()) {
            console.log('Erro de validação:', contract.errors); // Adicione esta linha para exibir os erros no console
            return res.status(400).send({
                message: "Erro ao cadastrar as informações. Favor validar"
            });
        }

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
    const idRegistro = req.params.idRegistro; // na rota daremos o apelido deste id

    await repository.update(idRegistro, req.body);

    // Enviar email informando que sofreu uma alteração

    res.status(200).send("Atualizado com sucesso!");
};

exports.delete = async (req, res, next) => {
    const idRegistro = req.params.idRegistro; // na rota daremos o apelido deste id
    await repository.delete(idRegistro); // Deletando um registro pelo id
    res.status(200).send('Removido com sucesso!');
}

exports.getById = async (req, res, next) => {
    const idRegistro = req.params.idRegistro;
    const data = await repository.getById(idRegistro);

    if (!data)
        return res.status(404).send();

    res.status(200).send(data);
}