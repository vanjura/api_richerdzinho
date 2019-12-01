'use strict'

const axios = require('axios');
const repository = require('../repositories/message-repository');
const validation = require('../bin/helpers/validation');
const controllerBase = require('../bin/base/controller-base');
const _rep = new repository();
const repUser = require('../repositories/user-repository');
const _repUser = new repUser();
//const md5 = require('md5');
//const jwt = require('jsonwebtoken');
const variables = require('../bin/config/variables');

function MessageController() {

}

MessageController.prototype.post = async (req, res) => {
    console.log(req.body)
    let data = req.body
    data.messageDate = Date.now();
    let _validationContract = new validation();
    _validationContract.isRequired(data.message, 'A chave "message" não foi informada');
    _validationContract.isRequired(data.participantId, 'A chave "participantId" não foi informada');
    
    await controllerBase.post(_rep, _validationContract, req, res);
};

MessageController.prototype.put = async (req, res) => {
    let _validationContract = new validation();

    _validationContract.isRequired(req.body.message, 'A chave "message" não foi informada');
    _validationContract.isRequired(req.body.id, 'A chave "messageDate" não foi informada');

    controllerBase.put(_rep, _validationContract, req, res);
};

MessageController.prototype.get = async (req, res) => {
    controllerBase.get(_rep, req, res);
};

MessageController.prototype.search = async (req, res) => {
    controllerBase.search(_rep, req, res);
};

MessageController.prototype.getById = async (req, res) => {
    controllerBase.getById(_rep, req, res);
};

MessageController.prototype.delete = async (req, res) => {
    controllerBase.delete(_rep, req, res);
};

module.exports = MessageController;