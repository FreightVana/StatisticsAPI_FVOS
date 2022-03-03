const mongoose = require('mongoose');

const { Schema } = mongoose;

const activitySchema = new Schema({
	displayName: {
		type: String,
		default: null,
	},
	email: {
		type: String,
		default: null,
	},
	activityType: {
		type: String,
		default: null,
	},
	activityReferenceType: {
		type: String,
		default: null,
	},
	activityReferenceID: {
		type: String,
		default: null,
	},
	oldValue: {
		type: Schema.Types.Mixed,
		default: null,
	},
	newValue: {
		type: Schema.Types.Mixed,
		default: null,
	}
}, { timestamps: true });

module.exports = activitySchema;
