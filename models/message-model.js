'use strict'

const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const schema = mongoose.Schema;

const messageModel = new schema({
    message: { type: String, required: true },
    messageDate: { type: Date, required: true },
    participantId: { type: Number, required: true },
}, { versionKey: false });


messageModel.plugin(AutoIncrement, { inc_field: 'id_message' });

module.exports = mongoose.model('Message', messageModel)