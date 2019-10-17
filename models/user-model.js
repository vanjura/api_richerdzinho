'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userModel = new schema({
    email: { trim: true, index: true, unique: true, required: true, type: String },
    username: {required: true, type: String},
    password : { required: true, type: String },
    birthdate: { default: Date.now, type: Date },
    sex: {type: String},
}, { versionKey: false });

module.exports = mongoose.model('User', userModel)