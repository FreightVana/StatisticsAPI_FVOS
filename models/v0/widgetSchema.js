const mongoose = require('mongoose');

const { Schema } = mongoose;

const widgetSchema = new Schema({
	name: {
		type: String,
		default: null,
	},
	type: {
		type: String,
		default: null,
	},
	label: {
		type: String,
		default: null,
	},
	icon: {
		type: String,
		default: null,
	},
	dataType: {
		type: String,
		default: null,
	},
	small: {
		type: Boolean,
		default: false,
	},
	medium: {
		type: Boolean,
		default: false,
	},
	large: {
		type: Boolean,
		default: false,
	},
});

module.exports = widgetSchema;
