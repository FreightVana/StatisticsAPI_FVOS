// libraries
const mongoose = require('mongoose');
// custom libraries
const { logger } = require('../../src/config/logging');

const { databaseURL, databaseURL2, databaseURL3, databaseURL4 } = require('../../src/config/config');

// db models
const { 
    v0: { 
        activitySchema,
        notificationsSchema,
        ratingsSchema,
        usersSchema,
        widgetSchema,
        contactSchema,
        phoneAssocSchema,
        infoSchema,
        usageScoreSchema,
        inspectionSchema,
        wishListSchema,
        notesSchema,
        offersSchema,
        historicalLoadsSchema,
    } 
} = require('../../models');

// models and connection function
const connOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

// connection and model object
const connObj = {
	// db
    Activities: null, // done
    Notifications: null, // done
    Ratings: null, // done
    Users: null, // done
    Widgets: null, // done
    Info: null,
    Inspections: null,
    Notes: null,
    Offers: null,
    Historical_Loads: null,
    Ratings: null,
    Usages: null,
    Wish_Lists: null,
    Contacts: null, // done
    PhoneAssoc: null, // done
	conn: null,
    conn2: null,
    conn3: null,
    conn4: null,
};

const gracefulExit = () => {
	mongoose.connection.close(() => {
		logger.info('Mongoose default connection with DB is disconnected through app termination');
		process.exit(0);
	});
};

const connect = async () => {
	try {
        // connect to db
        const db = mongoose.createConnection(databaseURL, connOptions);
        const db2 = mongoose.createConnection(databaseURL2, connOptions); // needs to include db in the env "/FVOS"
        const db3 = mongoose.createConnection(databaseURL3, connOptions); // needs to include db in the env "/FVOS"
        const db4 = mongoose.createConnection(databaseURL4, connOptions); // needs to include db in the env "/FVOS"
        // connect to db
        connObj.conn = db;
        connObj.conn2 = db2;
        connObj.conn3 = db3;
        connObj.conn4 = db4;
        db.once('open', () => logger.info('connected to DB'));
        db2.once('open', () => logger.info('connected to DB'));
        db3.once('open', () => logger.info('connected to DB'));
        db4.once('open', () => logger.info('connected to DB'));
        
        // collections 1
        connObj.Activities = db.model('activities', activitySchema);
        connObj.Notifications = db.model('notifications', notificationsSchema);
        connObj.Users = db.model('users', usersSchema);
        connObj.Widgets = db.model('widgets', widgetSchema);
        // collections 2
        connObj.Info = db2.model('infos', infoSchema);
        connObj.Inspections = db2.model('inspections', inspectionSchema);
        connObj.Notes = db2.model('notes', notesSchema);
        connObj.Ratings = db2.model('ratings', ratingsSchema);
        connObj.Usages = db2.model('usages', usageScoreSchema);
        connObj.Wish_Lists = db2.model('wish_lists', wishListSchema);
        // collections 3
        connObj.Contacts = db3.model('contacts', contactSchema);
        connObj.PhoneAssoc = db3.model('phone_number_associations', phoneAssocSchema);
        // collections 4
        connObj.Offers = db4.model('offers', offersSchema);
        connObj.Historical_Loads = db4.model('historical_loads', historicalLoadsSchema);
		// If the Node process ends, close the Mongoose connection
		process
			.on('SIGINT', gracefulExit)
			.on('SIGTERM', gracefulExit);

	} catch (error) {
		logger.error(error);
	}
};

connObj.connect = connect;

module.exports = connObj;
