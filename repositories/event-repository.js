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

    async createParticipant(data) {
        let event = await this._base._model.find({ id_event: data.eventoId })
        if (event.length > 0) {
            let userCadastrado = await this._base._model.find({ id_event: data.eventoId, participant: data.userId })
            if (userCadastrado.length > 0) {
                return false;
            } else {
                return await this._base.push(event[0]._id, { participant: data.userId });
            }
        } else {
            return false;
        }
    }

    async emailExiste(Email) {
        return await this._base._model.findOne({ email: Email }, this._projection)
    }

    async authenticate(Email, Senha) {
        let _hashSenha = md5(Senha);
        return await this._base._model.findOne({ email: Email, senha: _hashSenha }, this._projection);
    }

    async create(data) {
        await this._base._model.create(data);
        return;
    }

    async update(id, data) {

        let event = await this._base._model.find({ id_event: id })
        let eventAtualizado = await this._base.update(event[0]._id, {
            title: data.title,
            city: data.city,
            startDate: data.startDate,
            endDate: data.endDate,
            street: data.street,
            neighborhood: data.neighborhood,
            referencePoint: data.referencePoint,
            description: data.description,
            eventTypeId: data.eventTypeId,
            status: data.status
        });

        let eventRet = {}
        eventRet.city = eventAtualizado.city;
        eventRet.id = eventAtualizado.id_event;
        eventRet.title = eventAtualizado.title;
        eventRet.street = eventAtualizado.street;
        eventRet.status = eventAtualizado.status;
        eventRet.endDate = eventAtualizado.endDate;
        eventRet.startDate = eventAtualizado.startDate;
        eventRet.description = eventAtualizado.description;
        eventRet.neighborhood = eventAtualizado.neighborhood;
        eventRet.referencePoint = eventAtualizado.referencePoint;

        eventRet.participant = []

        let participants = await _repParticipant.getByEvent(id);
        if(participants){
            participants.forEach(async participant => {
                let auxUser = {};
                let user = await _repUser.getById(participant.userId)
                auxUser.id = participant.id;
                auxUser.username = user.username;
                auxUser.registrationDate = participant.registrationDate;
                eventRet.participant.push(auxUser);
            });
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

            let participants = await _repParticipant.getByEvent(element.id_event);
            if(participants){
                participants.forEach(async participant => {
                    let auxUser = {};
                    let user = await _repUser.getById(participant.userId)
                    auxUser.id = participant.id;
                    auxUser.username = user.username;
                    auxUser.registrationDate = participant.registrationDate;
                    retAux.participant.push(auxUser);
                });
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
        let eventRet = {};

        if (event.length > 0) {
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


            let participants = await _repParticipant.getByEvent(event[0].id_event);
            if(participants){
                participants.forEach(async participant => {
                    let auxUser = {};
                    let user = await _repUser.getById(participant.userId)
                    auxUser.id = participant.id;
                    auxUser.username = user.username;
                    auxUser.registrationDate = participant.registrationDate;
                    eventRet.participant.push(auxUser);
                });
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
                eventRet.user.birthdate = '1700-01-01';
            }

            eventRet.eventType = {
                id: event[0].eventTypeId,
                name: "Evento Tipo " + event[0].eventTypeId
            };
        } else {
            return null;
        }

        return eventRet
    }

    async delete(id) {
        let event = await this._base._model.find({ id_event: id });
        return await this._base.delete(event[0]._id);
    }

    async search(filter) {
        let ret = [];
        let events = await this._base._model.find({
            startDate: {
                $gte: new Date(filter.start_date),
                $lte: new Date(filter.end_date),
            },
            eventTypeId: filter.event_type
        });

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

            let participants = await _repParticipant.getByEvent(element.id_event);
            if(participants){
                participants.forEach(async participant => {
                    let auxUser = {};
                    let user = await _repUser.getById(participant.userId)
                    auxUser.id = participant.id;
                    auxUser.username = user.username;
                    auxUser.registrationDate = participant.registrationDate;
                    retAux.participant.push(auxUser);
                });
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
}

module.exports = eventRepository;