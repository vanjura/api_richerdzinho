'use strict'

const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const schema = mongoose.Schema;

const participantModel = new schema({
    username: { type: String },
    subscriptionDate: { type: Date }
}, { versionKey: false });


participantModel.plugin(AutoIncrement, { inc_field: 'id_participant' });

module.exports = mongoose.model('Participant', participantModel)