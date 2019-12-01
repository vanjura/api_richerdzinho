'use strict'

const axios = require('axios');
const repository = require('../repositories/participant-repository');
const validation = require('../bin/helpers/validation');
const controllerBase = require('../bin/base/controller-base');
const _rep = new repository();
const variables = require('../bin/config/variables');
const repUser = require('../repositories/user-repository');
const _repUser = new repUser();
const repEvent = require('../repositories/event-repository');
const _repEvent = new repEvent();

function participantController() {

}

participantController.prototype.post = async (req, res) => {
    let _validationContract = new validation();
    _validationContract.isRequired(req.body.userId, 'O campo userId é obrigatório');
    _validationContract.isRequired(req.body.eventoId, 'O campo eventoId é obrigatório');

    await controllerBase.post(_rep, _validationContract, req, res);

};

participantController.prototype.get = async (req, res) => {
    controllerBase.getById(_rep, req, res);
};

participantController.prototype.delete = async (req, res) => {
    controllerBase.delete(_rep, req, res);
};

module.exports = participantController;