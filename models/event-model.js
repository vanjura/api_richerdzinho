'use strict'

const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const schema = mongoose.Schema;

const eventModel = new schema({
    title: {type: String, required: true} ,
    startDate: {type: Date, required: true},
    endDate: {type: Date, required: true},
    street: {type: String, required: true},
    neighborhood: {type: String, required: true},
    city: {type: String, required: true},
    referencePoint: {type: String},
    description: {type: String},
    eventType: {type: Number, required: true},
    ownerId: {type: Number} ,
    status: {type: Boolean}
}, { versionKey: false });

eventModel.plugin(AutoIncrement, { inc_field: 'id_event' });

module.exports = mongoose.model('Event', eventModel)