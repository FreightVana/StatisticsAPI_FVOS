const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({}, { strict: false, timestamps: true });

module.exports = schema;
