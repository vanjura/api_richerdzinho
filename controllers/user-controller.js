'use strict'

const axios = require('axios');
const repository = require('../repositories/user-repository');
const validation = require('../bin/helpers/validation');
const controllerBase = require('../bin/base/controller-base');
const _rep = new repository();
const md5 = require('md5');
const jwt = require('jsonwebtoken');
const variables = require('../bin/config/variables');

function userController() {

}

userController.prototype.post = async (req, res) => {
    let _validationContract = new validation();

    _validationContract.isRequired(req.body.email, 'O campo e-mail é obrigatório.');
    _validationContract.isEmail(req.body.email, 'O email informado é inválido.');
    _validationContract.isRequired(req.body.username, 'O campo nome é obrigatório.');
    _validationContract.isRequired(req.body.password, 'O campo senha é obrigatório.');
    
    let usuarioExiste = await _rep.emailExiste(req.body.email);
    if (usuarioExiste){
        _validationContract.isTrue(usuarioExiste.username != undefined, `Já existe o email ${req.body.email} cadastrado em nossa base`)
    }

    if(req.body.password){
        req.body.password = md5(req.body.password);
    }
    
    await controllerBase.post(_rep, _validationContract, req, res);

};

userController.prototype.put = async (req, res) => {
    let _validationContract = new validation();

    _validationContract.isRequired(req.body.id, 'O ID de edição é obrigatório.');
    _validationContract.isRequired(req.body.email, 'O campo e-mail é obrigatório.');
    _validationContract.isEmail(req.body.email, 'O email informado é inválido.');
    _validationContract.isRequired(req.body.username, 'O campo username é obrigatório.');
    _validationContract.isRequired(req.body.password, 'O campo password é obrigatório.');

    let usuarioExiste = await _rep.emailExiste(req.body.email);
    if (usuarioExiste){
        _validationContract.isTrue(
            usuarioExiste.username != undefined && 
            usuarioExiste.id != req.body.id, 
            `Já existe o email ${req.body.email} cadastrado em nossa base`)
    }

    if(req.body.password){
        req.body.password = md5(req.body.password);
    }

    controllerBase.put(_rep, _validationContract, req, res);
    
};

userController.prototype.get = async (req, res) => {
    controllerBase.get(_rep, req, res);
};

userController.prototype.getById = async (req, res) => {
    controllerBase.getById(_rep, req, res);
};

userController.prototype.delete = async (req, res) => {
    controllerBase.delete(_rep, req, res);
};

userController.prototype.autenticar = async (req, res) => {
    let _validationContract = new validation();

    _validationContract.isRequired(req.body.login, 'O campo e-mail é obrigatório.');
    _validationContract.isEmail(req.body.login, 'O email deve ser válido.');
    _validationContract.isRequired(req.body.password, 'O campo password é obrigatório.');

    if(!_validationContract.isValid()){
        res.status(400).send({message: 'Falha no login.', validation: _validationContract.errors() });
        return
    }

    let usuarioEncontrado = await _rep.authenticate(req.body.login, req.body.password);
    if(usuarioEncontrado){
        res.status(200).send(jwt.sign({ user:usuarioEncontrado }, variables.Security.secretKey))
    }else{
        res.status(404).send({message: 'Usuário e senha informados inválidos.' })
    }
}

module.exports = userController;