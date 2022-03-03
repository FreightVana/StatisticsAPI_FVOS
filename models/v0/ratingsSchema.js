const mongoose = require('mongoose');

const { Schema } = mongoose;

const ratingsSchema = new Schema({
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
	reviewContent: {
		type: String,
		default: null,
	},
	tags: {
		type: Array,
		default: null,
	},
}, { timestamps: true });

module.exports = ratingsSchema;
