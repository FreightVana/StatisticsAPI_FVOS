const mongoose = require('mongoose');

const { Schema } = mongoose;

const ownerSchema = new Schema({
	displayName: {
		type: String,
		default: null,
	},
	email: {
		type: String,
		default: null,
	},
}, { timestamps: true });

const usageSchema = new Schema({
	milestones: {
		firstLoad: {
			completedAt: {
				type: Date,
				default: null,
			},
		},
		fiftiethLoad: {
			completedAt: {
				type: Date,
				default: null,
			},
		},
	},
	lastLoad: {
		type: Date,
		default: null,
	},
}, { timestamps: true });

const censusSchema = new Schema({
	fmcsaID: {
		type: Number,
		default: null,
	},
	status: {
		type: String,
		default: null,
	},
	entityType: {
		type: String,
		default: null,
	},
	dotNumber: {
		type: String,
		default: null,
	},
	dotNumberRevoked: {
		type: String,
		default: null,
	},
	doingBusinessAsName: {
		type: String,
		default: null,
	},
	legalName: {
		type: String,
		default: null,
	},
	domicileAddress: {
		type: String,
		default: null,
	},
	domicileCity: {
		type: String,
		default: null,
	},
	domicileST: {
		type: String,
		default: null,
	},
	domicileZIP: {
		type: String,
		default: null,
	},
	domicileCounty: {
		type: String,
		default: null,
	},
	domicileCountry: {
		type: String,
		default: null,
	},
	phone1: {
		type: String,
		default: null,
	}, // where is this?
	phone2: {
		type: String,
		default: null,
	},
	emailAddress: {
		type: String,
		default: null,
	},
	mailingAddress: {
		type: String,
		default: null,
	},
	mailingCity: {
		type: String,
		default: null,
	},
	mailingST: {
		type: String,
		default: null,
	},
	mailingZIP: {
		type: String,
		default: null,
	}, // where is this?
	mailingCountry: {
		type: String,
		default: null,
	},
	companyRep1: {
		type: String,
		default: null,
	},
	companyRep2: {
		type: String,
		default: null,
	},
	mcNumber: {
		type: String,
		default: null,
	},
	mxNumber: {
		type: String,
		default: null,
	},
	ffNumber: {
		type: String,
		default: null,
	},
	classification: {
		type: String,
		default: null,
	},
	interstateActivity: {
		type: String,
		default: null,
	},
	intrastateHazmatActivity: {
		type: String,
		default: null,
	},
	instrastateActivity: {
		type: String,
		default: null,
	},
	transportsHazmat: {
		type: String,
		default: null,
	},
	ownedTrucks: {
		type: Number,
		default: null,
	},
	ownedTractors: {
		type: Number,
		default: null,
	},
	ownedTrailers: {
		type: Number,
		default: null,
	},
	leasedTrucks: {
		type: Number,
		default: null,
	},
	leasedTractors: {
		type: Number,
		default: null,
	},
	leasedTrailers: {
		type: Number,
		default: null,
	}, // where is this?
	tripLeasedTrucks: {
		type: Number,
		default: null,
	},
	tripLeasedTractors: {
		type: Number,
		default: null,
	},
	tripLeasedTrailers: {
		type: Number,
		default: null,
	},
	totalTrucks: {
		type: Number,
		default: null,
	},
	totalPowerUnits: {
		type: Number,
		default: null,
	},
	totalDrivers: {
		type: Number,
		default: null,
	},
	reportedMiles: {
		type: String,
		default: null,
	},
	reportedMilesDate: {
		type: Number,
		default: null,
	},
	safetyRating: {
		type: String,
		default: null,
	},
	safetyRatingDate: {
		type: Number,
		default: null,
	},
	generalFreight: {
		type: String,
		default: null,
	},
	householdGoods: {
		type: String,
		default: null,
	},
	metals: {
		type: String,
		default: null,
	},
	motorVehicles: {
		type: String,
		default: null,
	},
	driveawayTowaway: {
		type: String,
		default: null,
	},
	logsPolesLumber: {
		type: String,
		default: null,
	},
	buildingMaterial: {
		type: String,
		default: null,
	},
	mobileHomes: {
		type: String,
		default: null,
	},
	machineryLargeObjects: {
		type: String,
		default: null,
	},
	freshProduce: {
		type: String,
		default: null,
	},
	liquidsGases: {
		type: String,
		default: null,
	},
	intermodalContainers: {
		type: String,
		default: null,
	},
	passengers: {
		type: String,
		default: null,
	},
	oilfieldEquipment: {
		type: String,
		default: null,
	},
	livestock: {
		type: String,
		default: null,
	},
	grainFeedHay: {
		type: String,
		default: null,
	},
	coal: {
		type: String,
		default: null,
	},
	meat: {
		type: String,
		default: null,
	},
	garbage: {
		type: String,
		default: null,
	},
	usMail: {
		type: String,
		default: null,
	},
	chemicals: {
		type: String,
		default: null,
	},
	dryBulk: {
		type: String,
		default: null,
	},
	refrigeratedFood: {
		type: String,
		default: null,
	},
	beverages: {
		type: String,
		default: null,
	},
	paperProducts: {
		type: String,
		default: null,
	},
	utility: {
		type: String,
		default: null,
	},
	farmSupplies: {
		type: String,
		default: null,
	},
	construction: {
		type: String,
		default: null,
	},
	waterWell: {
		type: String,
		default: null,
	},
	otherCargo: {
		type: String,
		default: null,
	},
}, { timestamps: true });

const infoSchema = new Schema({
	fvosID: {
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
	tags: {
		type: Array,
		default: null,
	},
	ranking: {
		type: Number,
		default: null,
	},
	historicalPhoneNumbers: {
		type: Array,
		default: [],
	},
	fmcsa: {
		physicalAddress: {
			type: String,
			default: null,
		},
		updatedAt: {
			type: Date,
			default: null,
		},
		updatedBy: {
			type: String,
			default: null,
		},
	},
	census: censusSchema,
	customFields: {
		type: Array,
		default: [],
	},
	owner: ownerSchema,
	usage: usageSchema,
	onboarding: {
		onboarded: {
			type: Boolean,
			default: false,
		},
	},
}, { timestamps: true, collection: 'info' });

module.exports = infoSchema;
