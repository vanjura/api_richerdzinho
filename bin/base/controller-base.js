exports.post = async (repository, validationContract, req, res) => {
    try {

        let data = req.body;
        console.log("POST - Recebido:", data);

        if (!validationContract.isValid()) {
            console.log("Detectado erro:", validationContract.errors())
            res.status(400).send().end();
            return;
        }

        let resultado = await repository.create(data);
        console.log("Sucesso, retornou:", resultado);
        res.status(200).send(resultado);

    } catch (err) {

        console.log('Post error: ', err);
        res.status(400).send({ message: 'Erro no processamento', error: err });

    }
};

exports.put = async (repository, validationContract, req, res) => {
    try {

        let data = req.body;
        console.log("PUT Request:",data)

        if (!validationContract.isValid()) {
            console.log("PUT ERRO - Resposta:", validationContract.errors())
            res.status(400).send({
                message: 'Existem dados inválidos na sua requisição.',
                validation: validationContract.errors()
            }).end();
            return;
        }
        
        let resultado = await repository.update(data.id, data);
        if(resultado){
            console.log("PUT OK - Resposta:", resultado)
            res.status(200).send(resultado);
        }else{
            console.log("PUT ERRO - Resposta:", "Não existe retorno para a pesquisa")
            res.status(400).send(resultado);
        }

    } catch (err) {

        console.log('Put error: ', err);
        res.status(400).send({ message: 'Erro no processamento', error: err });

    }
};

exports.get = async (repository, req, res) => {
    console.log("GET Request: GET ALL")
    try {
        let data = await repository.getAll()
        console.log("GET Response:", data);
        res.status(200).send(data);
    } catch (err) {
        console.log("GET Response: Problema no processamento", err)
        res.status(400).send({ message: 'Erro no processamento', error: err });
    }
};

exports.search = async (repository, req, res) => {
    console.log("SEARCH Request:", req.query)
    try {
        let data = await repository.search(req.query)
        console.log("GET Response:", data);
        res.status(200).send(data);
    } catch (err) {
        console.log("GET Response: Erro no processamento");
        res.status(400).send({ message: 'Erro no processamento', error: err });
    }
};

exports.getById = async (repository, req, res) => {
    try {
        console.log("GET Request:", req.params)
        let id = req.params.id
        if (id) {
            let data = await repository.getById(id)
            if (data) {
                console.log("GET Response:", data)
                res.status(200).send(data);
            } else {
                console.log("GET Response:", 'Não há dados.')
                res.status(400).send({ message: 'Não há dados.' });
            }
        } else {
            console.log("GET Response:", 'Usuário não encontrado.')
            res.status(400).send({ message: 'Usuário não encontrado.' });
        }
    } catch (err) {
        console.log('GET Response: ', err);
        res.status(400).send({ message: 'Erro no processamento', error: err });
    }
};

exports.delete = async (repository, req, res) => {
    try {
        console.log("DELETE - Recebido:", req.params)
        let id = req.params.id
        if (id) {
            let data = await repository.delete(id);
            console.log("DELETE OK - Enviado:", 'Registro excluído com sucesso.')
            res.status(200).send({ message: 'Registro excluído com sucesso.' });
        } else {
            console.log("DELETE ERRO - Enviado:", 'O parâmetro id precisa ser informado.')
            res.status(400).send({ message: 'O parâmetro id precisa ser informado.' });
        }
    } catch (err) {
        console.log("DELETE ERRO - Enviado: Dado não encontrado com o id requisitado.")
        res.status(400).send({ message: 'Erro no processamento', error: err });
    }
};