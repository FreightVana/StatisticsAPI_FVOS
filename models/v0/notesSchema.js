const mongoose = require('mongoose');

const { Schema } = mongoose;

const notesSchema = new Schema({
	fvosID: {
		type: String,
		default: null,
	},
	author: {
		type: String,
		default: null,
	},
	authorEmail: {
		type: String,
		default: null,
	},
	noteContent: {
		type: String,
		default: null,
	},
	noteType: {
		type: String,
		default: null,
	},
}, { timestamps: true });

module.exports = notesSchema;
