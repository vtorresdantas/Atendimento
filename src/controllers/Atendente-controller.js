const repository = require("../repositories/Atendente-repository")
const ValidationContract = require('../util/validator')

exports.getAll = async (req, res, next) => {
    const data = await repository.get();

    if (data == null)
        res.status(204).send();

    res.status(200).send(data);
}

exports.post = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.isRequired(req.body.idPessoa, 'A pessoa é obrigatória.');
    contract.isRequired(req.body.idSetor, 'O setor é obrigatório.');

    const apiPessoas = 'http://localhost:3000/pessoas/' + req.body.idPessoa;
    const apiSetor = 'http://localhost:3000/departamento/' + req.body.idSetor;

    try {
        if (!contract.isValid()) {
            res.status(400).send({
                message: "Erro ao cadastrar as informações. Favor validar"
            });
            return;
        }

        const pessoaResponse = await fetch(apiPessoas);
        const setorResponse = await fetch(apiSetor);

        if (!pessoaResponse.ok || !setorResponse.ok) {
            throw new Error('Erro ao buscar os dados da API');
        }

        const pessoaData = await pessoaResponse.json();
        const setorData = await setorResponse.json();

        // Manipule os dados da resposta conforme necessário

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
    const idAtendente = req.params.idAtendente; //na rota daremos o apelido deste id

    await repository.update(idAtendente, res.body);

    //Enviar email informando que sofreu uma alteração

    res.status(200).send("Atualizado com sucesso!")
};

exports.delete = async (req, res, next) => {
    const idAtendente = req.params.idAtendente;
    await repository.delete(idAtendente);
    res.status(200).send('Removido com sucesso!')
}


exports.getById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await repository.getById(id);

        if (data == null) {
            res.status(404).send();
            return; // Use 'return' para sair da função após enviar a resposta.
        }

        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({
            message: "Erro no servidor, favor contactar o administrador."
        });
    }
}