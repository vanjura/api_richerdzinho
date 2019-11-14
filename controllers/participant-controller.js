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

    let user = await _repUser.getById(req.body.userId);
    if (user) {
        let event = await _repEvent.getById(req.body.eventoId);
        if (event) {
            await _rep.create(req.body, _repEvent);
        } else {
            res.status(400).send().end();
        }
    } else {
        res.status(400).send().end();
    }

};

// participantController.prototype.put = async (req, res) => {
//     let _validationContract = new validation();

//     _validationContract.isRequired(req.params.id, 'O ID de edição é obrigatório.');
//     _validationContract.isRequired(req.body.email, 'O campo e-mail é obrigatório.');
//     _validationContract.isEmail(req.body.email, 'O email informado é inválido.');
//     _validationContract.isRequired(req.body.nome, 'O campo nome é obrigatório.');
//     _validationContract.isRequired(req.body.tipo, 'O tipo de usuário que está tentando criar é inválido.');

//     let usuarioExiste = await _rep.emailExiste(req.body.email);
//     if (usuarioExiste){
//         _validationContract.isTrue(
//             usuarioExiste.nome != undefined && 
//             usuarioExiste._id != req.params.id, 
//             `Já existe o email ${req.body.email} cadastrado em nossa base`)
//     }

//     controllerBase.put(_rep, _validationContract, req, res);

// };

participantController.prototype.get = async (req, res) => {
    controllerBase.get(_rep, req, res);
};

// participantController.prototype.getById = async (req, res) => {
//     controllerBase.getById(_rep, req, res);
// };

// participantController.prototype.delete = async (req, res) => {
//     controllerBase.delete(_rep, req, res);
// };

// participantController.prototype.autenticar = async (req, res) => {
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

module.exports = participantController;