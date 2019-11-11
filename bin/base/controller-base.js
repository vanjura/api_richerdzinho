exports.post = async (repository, validationContract, req, res) => {
    try {

        let data = req.body;

        if (!validationContract.isValid()) {
            res.status(400).send({
                message: 'Existem dados inválidos na sua requisição.',
                validation: validationContract.errors()
            }).end();
            return;
        }

        let resultado = await repository.create(data);
        res.status(200).send(resultado[0]);

    } catch (err) {

        console.log('Post error: ', err);
        res.status(400).send({ message: 'Erro no processamento', error: err });

    }
};

exports.put = async (repository, validationContract, req, res) => {
    try {

        let data = req.body;
        let oldData = await repository.getById(req.body.id);

        if (!oldData) {
            res.status(404).send({
                message: 'User não encontrado.'
            }).end();
            return;
        }

        if (!data.sex) {
            data.sex = oldData.sex;
        }

        if (!data.birthdate) {
            data.birthdate = oldData.birthdate;
        }
        
        if (!validationContract.isValid()) {
            res.status(405).send({
                message: 'Existem dados inválidos na sua requisição.',
                validation: validationContract.errors()
            }).end();
            return;
        }
        
        let resultado = await repository.update(oldData._id, data);
        res.status(200).send(resultado);

    } catch (err) {

        console.log('Put error: ', err);
        res.status(500).send({ message: 'Erro no processamento', error: err });

    }
};

exports.get = async (repository, req, res) => {
    try {
        let data = await repository.getAll()
        res.status(200).send(data);
    } catch (err) {
        console.log('Get error: ', err);
        res.status(500).send({ message: 'Erro no processamento', error: err });
    }
};

exports.getById = async (repository, req, res) => {
    try {
        let id = req.params.id
        if (id) {
            let data = await repository.getById(id)
            if (data) {
                res.status(200).send(data);
            } else {
                res.status(404).send({ message: 'Não há dados.' });
            }
        } else {
            res.status(404).send({ message: 'Usuário não encontrado.' });
        }
    } catch (err) {
        console.log('Get error: ', err);
        res.status(400).send({ message: 'Erro no processamento', error: err });
    }
};

exports.delete = async (repository, req, res) => {
    try {
        let id = req.params.id
        if (id) {
            let data = await repository.delete(id);
            res.status(200).send({ message: 'Registro excluído com sucesso.' });
        } else {
            res.status(400).send({ message: 'O parâmetro id precisa ser informado.' });
        }
    } catch (err) {
        console.log('Delete error: ', err);
        res.status(404).send({ message: 'Erro no processamento', error: err });
    }
};