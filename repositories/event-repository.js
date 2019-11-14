require('../models/event-model');
const base = require('../bin/base/repository-base');
const repParticipant = require('./participant-repository');
const repUser = require('./user-repository');
const _repUser = new repUser();
const _repParticipant = new repParticipant();

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

        let event = await this._base._model.find({ id_event: id })
        let eventAtualizado = await this._base.update(event[0]._id, {
            title: data.title
        });

        let eventRet = {}
        eventRet.city = eventAtualizado.city;
        eventRet.id = eventAtualizado.id_event;
        eventRet.title = eventAtualizado.title;
        eventRet.street = eventAtualizado.street;
        eventRet.status = eventAtualizado.status;
        eventRet.endDate = eventAtualizado.endDate;
        eventRet.ownerId = eventAtualizado.ownerId;
        eventRet.startDate = eventAtualizado.startDate;
        eventRet.description = eventAtualizado.description;
        eventRet.neighborhood = eventAtualizado.neighborhood;
        eventRet.referencePoint = eventAtualizado.referencePoint;

        eventRet.participant = []

        for (const [idx, participant] of eventAtualizado.participant.entries()) {
            let participantRet = await _repUser.getById(participant);
            let participantObject = {
                id: participantRet.id,
                username: participantRet.username,
                registrationDate: new Date()
            }
            eventRet.participant.push(participantObject);
        }

        let user = await _repUser.getById(eventAtualizado.ownerId)
        eventRet.user = {}
        if (user) {
            eventRet.user.id = user.id;
            eventRet.user.sex = user.sex;
            eventRet.user.email = user.email;
            eventRet.user.username = user.username;
            eventRet.user.birthdate = user.birthdate;
        } else {
            eventRet.user.id = eventAtualizado.ownerId;
            eventRet.user.sex = 'Usuário Inexistente';
            eventRet.user.email = 'Usuário Inexistente';
            eventRet.user.username = 'Usuário Inexistente';
            eventRet.user.birthdate = 'Usuário Inexistente';
        }

        eventRet.eventType = {
            id: eventAtualizado.eventTypeId,
            name: "Evento Tipo " + eventAtualizado.eventTypeId
        };

        return eventRet
    }

    async getAll() {
        let ret = [];
        let events = await this._base._model.find({});
        for (const [idx, element] of events.entries()) {
            let retAux = {}
            retAux.city = element.city;
            retAux.id = element.id_event;
            retAux.title = element.title;
            retAux.street = element.street;
            retAux.status = element.status;
            retAux.endDate = element.endDate;
            retAux.ownerId = element.ownerId;
            retAux.startDate = element.startDate;
            retAux.description = element.description;
            retAux.neighborhood = element.neighborhood;
            retAux.referencePoint = element.referencePoint;

            retAux.participant = [];

            for (const [idx, participant] of element.participant.entries()) {
                let participantRet = await _repUser.getById(participant);
                let participantObject = {
                    id: participantRet.id,
                    username: participantRet.username,
                    registrationDate: new Date()
                }
                retAux.participant.push(participantObject);
            }

            retAux.eventType = {
                id: element.eventTypeId,
                name: "Evento Tipo " + element.eventTypeId
            };

            let user = await _repUser.getById(element.ownerId)
            retAux.user = {}
            if (user) {
                retAux.user.id = user.id;
                retAux.user.sex = user.sex;
                retAux.user.email = user.email;
                retAux.user.username = user.username;
                retAux.user.birthdate = user.birthdate;
            } else {
                retAux.user.id = element.ownerId;
                retAux.user.sex = 'Usuário Inexistente';
                retAux.user.email = 'Usuário Inexistente';
                retAux.user.username = 'Usuário Inexistente';
                retAux.user.birthdate = 'Usuário Inexistente';
            }
            ret.push(retAux);
        }
        return ret;
    }

    async getById(id) {
        let event = await this._base._model.find({ id_event: id });

        let eventRet = {}
        eventRet.city = event[0].city;
        eventRet.id = event[0].id_event;
        eventRet.title = event[0].title;
        eventRet.street = event[0].street;
        eventRet.status = event[0].status;
        eventRet.endDate = event[0].endDate;
        eventRet.ownerId = event[0].ownerId;
        eventRet.startDate = event[0].startDate;
        eventRet.description = event[0].description;
        eventRet.neighborhood = event[0].neighborhood;
        eventRet.referencePoint = event[0].referencePoint;

        eventRet.participant = []

        for (const [idx, participant] of event[0].participant.entries()) {
            let participantRet = await _repUser.getById(participant);
            let participantObject = {
                id: participantRet.id,
                username: participantRet.username,
                registrationDate: new Date()
            }
            eventRet.participant.push(participantObject);
        }

        let user = await _repUser.getById(event[0].ownerId)
        eventRet.user = {}
        if (user) {
            eventRet.user.id = user.id;
            eventRet.user.sex = user.sex;
            eventRet.user.email = user.email;
            eventRet.user.username = user.username;
            eventRet.user.birthdate = user.birthdate;
        } else {
            eventRet.user.id = event[0].ownerId;
            eventRet.user.sex = 'Usuário Inexistente';
            eventRet.user.email = 'Usuário Inexistente';
            eventRet.user.username = 'Usuário Inexistente';
            eventRet.user.birthdate = 'Usuário Inexistente';
        }

        eventRet.eventType = {
            id: event[0].eventTypeId,
            name: "Evento Tipo " + event[0].eventTypeId
        };

        return eventRet
    }

    async delete(id) {
        let event = await this._base._model.find({ id_event: id });
        return await this._base.delete(event[0]._id);
    }
}

module.exports = eventRepository;