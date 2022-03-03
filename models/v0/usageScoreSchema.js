const mongoose = require('mongoose');

const { Schema } = mongoose;

const usageScoreSchema = new Schema({
	mcNumber: {
		type: String,
		default: null,
	},
	milestones: {
		firstLoad: {
			type: String,
			default: null,
		},
		fiftiethLoad: {
			type: String,
			default: null,
		},
	},
	lastLoad: {
		type: Date,
		default: null,
	},
	fvOSID: {
		type: String,
		default: null,
	},
}, { timestamps: true });

module.exports = usageScoreSchema;
