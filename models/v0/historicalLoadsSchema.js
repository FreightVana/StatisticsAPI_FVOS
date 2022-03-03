const mongoose = require('mongoose');

const { Schema } = mongoose;

const historicalLoadsSchema = new Schema({
	legID: {
		type: Number,
		default: null,
	},
	carrierPay: {
		type: Number,
		default: null,
	},
	deliveryDate: {
		type: Date,
		default: null,
	},
	equipment: {
		type: String,
		default: null,
	},
	lane: {
		type: String,
		default: null,
	},
	mcNumber: {
		type: String,
		default: null,
	},
});

module.exports = historicalLoadsSchema;
