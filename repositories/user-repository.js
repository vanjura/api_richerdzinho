require('../models/user-model');
const md5 = require('md5')
const base = require('../bin/base/repository-base');

class userRepository {
    constructor() {
        this._base = new base('User');
        this._projection = '_id id username email sex birthdate'
    }

    async emailExiste(Email) {
        return await this._base._model.findOne({ email: Email }, this._projection)
    }

    async authenticate(Email, Senha) {
        let _hashSenha = md5(Senha);
        return await this._base._model.findOne({ email: Email, senha: _hashSenha }, this._projection);
    }

    async create(data) {
        let userCriado = await this._base.create(data);
        return this._base._model.findById(userCriado._id, this._projection)
    }

    async update(id, data) {
        let userAtualizado = await this._base.update(id, {
            username: data.username,
            password: data.password,
            bithdate: data.bithdate,
            email: data.email,
            sex: data.sex
        });
        console.log(userAtualizado);
        return this._base._model.findById(userAtualizado._id, this._projection)
    }

    async getAll() {
        return await this._base._model.find({}, this._projection);
    }

    async getById(id) {
        return await this._base._model.findOne({ id: id }, this._projection);
    }

    async delete(id) {
        return await this._base.delete(id);
    }
}

module.exports = userRepository;