require('../models/event-model');
const base = require('../bin/base/repository-base');
const repParticipant = require('./participant-repository');

class eventRepository {
    constructor() {
        this._base = new base('Event');
        this._projection = '_id participant id_event title startDate endDate street neighborhood city referencePoint description eventType ownerId status'
        this._projectionA = {
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
        return await this._base._model.aggregate([{ $match: criteria }, { $project: this._projectionA }]);
    }

    async update(id, data) {
        let doadorAtualizado = await this._base.update(id, {
            nome: data.nome
        });
        return this._base._model.findById(doadorAtualizado._id, this._projection)
    }

    async getAll() {
        let ret = [];
        let events = await this._base._model.find({}, this._projection);
        events.forEach(element => {
            let retAux = {}
            retAux.id = element.id_event;
            retAux.title = element.title;
            retAux.startDate = element.startDate;
            retAux.endDate = element.endDate;
            retAux.street = element.street;
            retAux.neighborhood = element.neighborhood;
            retAux.city = element.city;
            retAux.referencePoint = element.referencePoint;
            retAux.description = element.description;
            retAux.eventType = element.eventType;
            retAux.ownerId = element.ownerId;
            retAux.status = element.status;
            retAux.participant = [];
            element.participant.forEach(e => {
                participantObject = participant.getById(e);
                retAux.participant.push(participantObject);
            })
            ret.push(retAux);
        });
        return ret;
    }

    async getById(id) {
        return await this._base._model.findById(id, this._projection);
    }

    async delete(id) {
        return await this._base.delete(id);
    }
}

module.exports = eventRepository;