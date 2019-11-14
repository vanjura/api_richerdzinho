'use strict'

const axios = require('axios');
const repository = require('../repositories/event-repository');
const validation = require('../bin/helpers/validation');
const controllerBase = require('../bin/base/controller-base');
const _rep = new repository();
//const md5 = require('md5');
//const jwt = require('jsonwebtoken');
const variables = require('../bin/config/variables');

function eventController() {

}

eventController.prototype.post = async (req, res) => {
    let _validationContract = new validation();
    _validationContract.isRequired(req.body.title, 'O campo título é obrigatório');
    _validationContract.isRequired(req.body.startDate, 'O campo Data de Início é obrigatório');
    _validationContract.isRequired(req.body.endDate, 'O campo Data de Fim é obrigatório');
    _validationContract.isRequired(req.body.street, 'O campo Rua é obrigatório');
    _validationContract.isRequired(req.body.neighborhood, 'O campo Bairro é obrigatório');
    _validationContract.isRequired(req.body.city, 'O campo Cidade é obrigatório');
    _validationContract.isRequired(req.body.eventTypeId, 'O campo Tipo de Evento é obrigatório');
    
    await controllerBase.post(_rep, _validationContract, req, res);
};

eventController.prototype.put = async (req, res) => {
    let _validationContract = new validation();

    _validationContract.isRequired(req.body.title, 'O campo título é obrigatório');
    _validationContract.isRequired(req.body.startDate, 'O campo Data de Início é obrigatório');
    _validationContract.isRequired(req.body.endDate, 'O campo Data de Fim é obrigatório');
    _validationContract.isRequired(req.body.street, 'O campo Rua é obrigatório');
    _validationContract.isRequired(req.body.neighborhood, 'O campo Bairro é obrigatório');
    _validationContract.isRequired(req.body.city, 'O campo Cidade é obrigatório');
    _validationContract.isRequired(req.body.eventTypeId, 'O campo Tipo de Evento é obrigatório');

    // let usuarioExiste = await _rep.emailExiste(req.body.email);
    // if (usuarioExiste){
    //     _validationContract.isTrue(
    //         usuarioExiste.nome != undefined && 
    //         usuarioExiste._id != req.params.id, 
    //         `Já existe o email ${req.body.email} cadastrado em nossa base`)
    // }

    controllerBase.put(_rep, _validationContract, req, res);
    
};

eventController.prototype.get = async (req, res) => {
    controllerBase.get(_rep, req, res);
};

eventController.prototype.getById = async (req, res) => {
    controllerBase.getById(_rep, req, res);
};

eventController.prototype.delete = async (req, res) => {
    controllerBase.delete(_rep, req, res);
};

// eventController.prototype.autenticar = async (req, res) => {
//     let _validationContract = new validation();

//     _validationContract.isRequired(req.body.email, 'O campo e-mail é obrigatório.');
//     _validationContract.isEmail(req.body.email, 'O email deve ser válido.');
//     _validationContract.isRequired(req.body.senha, 'O campo senha é obrigatório.');

//     if(!_validationContract.isValid()){
//         res.status(400).send({message: 'Falha no login.', validation: _validationContract.errors() });
//         return
//     }

//     let usuarioEncontrado = await _rep.authenticate(req.body.email, req.body.senha);
//     if(usuarioEncontrado){
//         res.status(200).send({
//             usuario: usuarioEncontrado,
//             token: jwt.sign({ user:usuarioEncontrado }, variables.Security.secretKey)
//         }) 
//     }else{
//         res.status(404).send({message: 'Usuário e senha informados inválidos.' })
//     }
// }

module.exports = eventController;