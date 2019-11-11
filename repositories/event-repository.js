require('../models/event-model');
const base = require('../bin/base/repository-base');

class eventRepository {
    constructor() {
        this._base = new base('Event');
        this._projection = {
            "id": "$id_event"
        };
    }

    async emailExiste(Email) {
        return await this._base._model.findOne({ email: Email }, this._projection)
    }

    async authenticate(Email, Senha) {
        let _hashSenha = md5(Senha);
        return await this._base._model.findOne({ email: Email, senha: _hashSenha }, this._projection);
    }

    async create(data) {
        let doadorCriado = await this._base.create(data);
        var criteria = {
            _id: doadorCriado._id
        }
        var query = this._base._model.aggregate([{ $match: criteria }, { $project: this._projection }]);
        console.log(query)
        return query;
    }

    async update(id, data) {
        let doadorAtualizado = await this._base.update(id, {
            nome: data.nome
        });
        return this._base._model.findById(doadorAtualizado._id, this._projection)
    }

    async getAll() {
        return await this._base._model.find({}, this._projection);
    }

    async getById(id) {
        return await this._base._model.findById(id, this._projection);
    }

    async delete(id) {
        return await this._base.delete(id);
    }
}

module.exports = eventRepository;