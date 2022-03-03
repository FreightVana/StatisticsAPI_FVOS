const mongoose = require('mongoose');

const { Schema } = mongoose;

const locationSchema = new Schema({
    city: {
        type: String,
        default: null,
    },
    state: {
        type: String,
        default: null,
    },
    zipCode: {
        type: String,
        default: null,
    },
    drop: {
        type: Boolean,
        default: null,
    }
});

const offersSchema = new Schema({
    author: {
		type: String,
		default: null,
	},
	mcNumber: {
		type: String,
		default: null,
	},
    dotNumber: {
		type: String,
		default: null,
	},
    fvosID: {
		type: String,
		default: null,
	},
    customer: {
		type: String,
		default: null,
	},
    eventName: {
		type: String,
		default: null,
	},
    orderNumber: {
		type: String,
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
    origin: locationSchema,
    destination: locationSchema,
    rate: {
        // linehaul: '',
        // fuelSurcharge: '',
        allIn: {
            type: String,
            default: null,
        },
    },
    capacity: {
        value: {
            type: Boolean,
            default: null,
        },
        volume: {
            type: String,
            default: null,
        },
        effectiveDate: {
            type: String,
            default: null,
        },
        expirationDate: {
            type: String,
            default: null,
        },
    },
    hazmat: {
        type: Boolean,
        default: null,
    },
    driverUnload: {
        type: Boolean,
        default: null,
    },
    roundTrip: {
        type: Boolean,
        default: null,
    },
    cargoValue: {
        type: String,
        default: null,
    },
    notes: {
        type: String,
        default: null,
    },
}, { timestamps: true });

module.exports = offersSchema;
