require('../models/user-model');
const md5 = require('md5')
const base = require('../bin/base/repository-base');

class userRepository {
    constructor() {
        this._base = new base('User');
        this._projection = 'id username email sex birthdate password'
    }

    async emailExiste(Email) {
        return await this._base._model.findOne({ email: Email }, this._projection)
    }

    async authenticate(Email, Senha) {
        return await this._base._model.findOne({ email: Email, password: Senha }, this._projection);
    }

    async create(data) {
        let userCriado = await this._base.create(data);
        console.log(userCriado)
        return this._base._model.findById(userCriado._id, this._projection)
    }

    async update(idUser, data) {
        let userAtualizado = await this._base._model.update({id: idUser}, {
            username: data.username,
            password: data.password,
            birthdate: data.birthdate,
            email: data.email,
            sex: data.sex
        });
        console.log("idUser",idUser)
        return this._base._model.findOne({id: idUser})
    }

    async getAll() {
        return await this._base._model.find({}, this._projection);
    }

    async getById(id) {
        return await this._base._model.findOne({ id: id }, this._projection);
    }

    async delete(id) {
        var data = await this._base._model.findOne({ id: id }, this._projection);
        return await this._base.delete(data._id);
    }
}

module.exports = userRepository;