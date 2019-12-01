require('../models/participant-model');
const base = require('../bin/base/repository-base');

class participantRepository {
    constructor() {
        this._base = new base('Participant');
        this._projection = '_id id_event title startDate endDate street neighborhood city referencePoint description eventType ownerId status'
        this._projectionA = {
            "id": "$id_event"
        };
    }

    async create(data) {
        data.registrationDate = Date.now();
        await this._base.create(data);
    }

    async getAll() {
        let ret;
        let events = await this._base._model.find({}, this._projection);
        events.forEach(element => {
            console.log(element);
        });
        return await this._base._model.find({}, this._projection);
    }

    async getById(id) {
        console.log(id)

        // var participant =  await this._base._model.findById(id, this._projection);
        let participant = await this._base._model.findOne({ participantId: id });
        let ret = {};
        ret.id = participant.participantId;
        ret.userId = participant.userId;
        ret.eventoId = participant.eventoId;
        ret.registrationDate = participant.registrationDate;

        return ret;
    }

    async getByEvent(id) {
        let participants = await this._base._model.find({ eventoId: id }).sort({registrationDate:1});
        let ret = [];
        if(participants){
            participants.forEach(participant => {
                let auxRet = {};
                auxRet.id = participant.participantId;
                auxRet.userId = participant.userId;
                auxRet.eventoId = participant.eventoId;
                auxRet.registrationDate = participant.registrationDate;
                ret.push(auxRet);
            });
        }

        return ret;
    }

    async delete(id) {
        return await this._base.delete(id);
    }
}

module.exports = participantRepository;