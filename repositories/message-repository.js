require('../models/message-model');
const base = require('../bin/base/repository-base');
const repUser = require('./user-repository');
const repEvent = require('./event-repository');
const repParticipant = require('./participant-repository');
const _repUser = new repUser();
const _repEvent = new repEvent();
const _repParticipant = new repParticipant();

class messageRepository {
    constructor() {
        this._base = new base('Message');
        this._projection = '_id participant id_event title startDate endDate street neighborhood city referencePoint description eventType ownerId status'
        this._projectionA = {
            "id": "$id_event"
        };
    }

    async create(data) {
        await this._base._model.create(data);
        return;
    }

    async update(id, data) {
        let message = await this._base._model.findOne({ id_message: id })
        let messageAtualizada = await this._base.update(message._id, {
            message: data.message,
        });

        let messageRet = {
            id: messageAtualizada.id_message,
            message: messageAtualizada.message,
            messageDate: messageAtualizada.messageDate,
            participantId: messageAtualizada.participantId,
        };

        return messageRet
    }

    async getById(id) {
        let event = await _repEvent.getById(id);
        let participants = event.participant;
        let messageRet = []
        for (const participant of participants) {
            let part = await _repParticipant.getById(participant.id)
            if (part) {
                let messages = await this._base._model.find({ participantId: participant.id })
                if (messages) {
                    for (const message of messages) {
                        let user = await _repUser.getById(part.userId)
                        let objectMessage = {
                            id: message.id_message,
                            userId: user.id,
                            username: user.username,
                            messageDate: message.messageDate,
                            message: message.message
                        }
                        console.log("objectMessage", objectMessage)
                        messageRet.push(objectMessage)
                    }
                }
            }
        };

        return messageRet
    }

    async delete(id) {
        let message = await this._base._model.findOne({ id_message: id })
        return await this._base.delete(message._id);
    }


}

module.exports = messageRepository;