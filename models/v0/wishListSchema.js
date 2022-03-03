const mongoose = require('mongoose');

const { Schema } = mongoose;

const stopsSchema = {
	objectID: Schema.Types.ObjectId,
	city: {
		type: String,
		default: null,
	},
	state: {
		type: String,
		default: null,
	},
	sequence: {
		type: String,
		default: null,
	},
    loadType: {
        type: String,
        default: null,
    },
};

const crmSchema = new Schema({
    fvosID: {
        type: String,
		default: null,
	},
    targetRate: {
        type: String,
        default: null,
    },
    startDate: {
        type: String,
        default: null,
    },
    origin: {
        type: Object,
        default: null,
    },
    destination: {
        type: Object,
        default: null,
    },
	volume: {
		type: Object,
		default: null,
	},
    commitment: {
        type: Object,
        default: null,
    },
	equipment: {
        type: String,
		default: null,
	},
    transit: {
        type: String,
        default: null,
    },
    dropTrailer: {
        type: Boolean,
        default: null,
    },
	commodity: {
		type: String,
		default: null,
	},
	cargoValue: {
		type: Number,
		default: null,
	},
	author: {
		type: String,
		default: null,
	},
}, { timestamps: true });

module.exports = crmSchema;
