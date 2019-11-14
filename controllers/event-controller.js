'use strict'

const axios = require('axios');
const repository = require('../repositories/event-repository');
const validation = require('../bin/helpers/validation');
const controllerBase = require('../bin/base/controller-base');
const _rep = new repository();
const repUser = require('../repositories/user-repository');
const _repUser = new repUser();
//const md5 = require('md5');
//const jwt = require('jsonwebtoken');
const variables = require('../bin/config/variables');

function eventController() {

}

eventController.prototype.postParticipant = async (req, res) => {
    let _validationContract = new validation();
    _validationContract.isRequired(req.body.userId, 'O campo userId é obrigatório');
    _validationContract.isRequired(req.body.eventoId, 'O campo eventoId é obrigatório');

    let user = await _repUser.getById(req.body.userId);
    if (user) {
        let ret = await _rep.createParticipant(req.body)
        if (ret){
            res.status(200).send().end();
        }else{
            res.status(400).send().end();
        }
    } else {
        res.status(400).send().end();
    }

};

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

eventController.prototype.search = async (req, res) => {
    controllerBase.search(_rep, req, res);
};

eventController.prototype.getById = async (req, res) => {
    controllerBase.getById(_rep, req, res);
};

eventController.prototype.delete = async (req, res) => {
    controllerBase.delete(_rep, req, res);
};

module.exports = eventController;