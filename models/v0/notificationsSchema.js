const mongoose = require('mongoose');

const { Schema } = mongoose;

const eventSchema = {
	author: {
		type: String,
		default: null,
	},
	eventType: {
		type: String,
		default: null,
	},
	actionType: {
		type: String,
		default: null,
	},
	oldValue: {
		type: String,
		default: null,
	},
	newValue: {
		type: String,
		default: null,
	},
	referenceFVOSID: {
		type: String,
		default: null,
	},
	referenceCollection: {
		type: String,
		default: null,
	},
};

const notificationsSchema = new Schema({
	fvosID: {
		type: String,
		default: null,
	},
	notificationID: {
		type: String,
		default: null,
	},
	read: {
		type: Boolean,
		default: false,
	},
	readAt: {
		type: Date,
		default: null,
	},
	archive: {
		type: Boolean,
		default: false,
	},
	event: eventSchema,
}, { timestamps: true });

module.exports = notificationsSchema;
