const mongoose = require('mongoose');

const { Schema } = mongoose;

const recentSearchesSchema = new Schema({
    favorites: {
		type: String,
	},
    mcNumber: {
		type: String,
	},
    dotNumber: {
		type: String,
	},
    doingBusinessAsName: {
		type: String,
	},
    legalName: {
		type: String,
	},
    companyName: {
		type: String,
	},
    domiciledState: {
		type: String,
	},
    domiciledZip: {
		type: String,
	},
    safetyRating: {
		type: String,
	},
    ranking: {
		type: String,
	},
    // should these be date?
    firstLoadTimestamp: {
		type: String,
	},
    fiftiethLoadTimestamp: {
		type: String,
	},
    lastLoadTimestamp: {
		type: String,
	},
    truckCount: {
		type: String,
	},
    owner: {
		type: String,
	},
    fvosID: {
		type: String,
	},
    sort: {
		type: String,
	},
    direction: {
		type: String,
	},
    firstLoad: {
		type: String,
	},
    fiftiethLoad: {
		type: String,
	},
    onboarded: {
		type: Boolean,
	},
    // tags: {
    //     type: Array,
    // },
    matches: {
        type: Number, 
        default: 0
    },
}, { timestamps: true })

const carrierRMSchema = {
	favorites: {
		type: Array,
		default: null,
	},
	savedSearches: {
        type: Array,
        default: null
    },
	recentSearches: [  recentSearchesSchema ],
	salesSearches: {
		type: Array,
		default: null,
	},
};

const notificationsSchema = {
	// there will be a bunch of catergories here that still need to be determined
	// this is at least a placeholder
	alerts: {
		type: Boolean,
		default: false,
	},
};

const preferencesSchema = {
	notifications: notificationsSchema,
};

const usersSchema = new Schema({
    fvosID: {
		type: String,
		default: null,
	},
	displayName: {
		type: String,
		default: null,
	},
	firstName: {
		type: String,
		default: null,
	},
	lastName: {
		type: String,
		default: null,
	},
	email: {
		type: String,
		default: null,
	},
	groups: {
		type: Array,
		default: null,
	},
	phoneNumber: {
		type: String,
		default: null,
	},
	department: {
		type: String,
		default: null,
	},
	manager: {
		type: String,
		default: null,
	},
	carrierRM: carrierRMSchema,
	preferences: preferencesSchema,
}, { timestamps: true });

module.exports = usersSchema;
