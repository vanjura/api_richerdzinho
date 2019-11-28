'use strict'

const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const schema = mongoose.Schema;

const participantModel = new schema({
    userId: {type: Number},
    eventId : {type: Number},
    subscriptionDate: {type: Date }
}, { versionKey: false });


participantModel.plugin(AutoIncrement, { inc_field: 'participantId' });

module.exports = mongoose.model('Participant', participantModel)