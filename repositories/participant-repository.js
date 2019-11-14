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

    async create(data, repEvent) {
        console.log(repEvent)

        await repEvent._model.update(
            { id_event: data.eventoId },
            { $push: { participant: data.userId } }
        )
        // let doadorCriado = await this._base.create(data);
        // var criteria = {
        //     _id: doadorCriado._id
        // }
        // return await this._base._model.aggregate([{ $match: criteria }, { $project: this._projectionA }]);
    }

    async update(id, data) {
        let doadorAtualizado = await this._base.update(id, {
            nome: data.nome
        });
        return this._base._model.findById(doadorAtualizado._id, this._projection)
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
        return await this._base._model.findById(id, this._projection);
    }

    async delete(id) {
        return await this._base.delete(id);
    }
}

module.exports = participantRepository;