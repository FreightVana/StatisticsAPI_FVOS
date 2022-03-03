const mongoose = require('mongoose');

const { Schema } = mongoose;

const associationSchema = new Schema({
    refType: {
        type: String,
        default: null
    },
    refValue: {
        type: String,
        default: null
    },
    name: {
        type: String,
        default: null
    },
}, { timestamps: true });

const phoneAssociationSchema = new Schema({
    phoneNumber: {
        type: String,
        default: null
    },
    associations: [
        associationSchema
    ]
    
}, { timestamps: true });

module.exports = phoneAssociationSchema;
