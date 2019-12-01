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

participantController.prototype.get = async (req, res) => {
    let arr = [];
    for (let index = 1; index < 6; index++) {
        arr.push({
            name: "Evento Tipo " + index,
            id: index
        })
    }
    res.status(200).send(arr);
};

module.exports = participantController;