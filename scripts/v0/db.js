// libraries
const mongoose = require('mongoose');
// custom libraries
const { logger } = require('../../src/config/logging');

// db models
const { v0: { fooSchema } } = require('../../models');

// models and connection function
const connOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
};

// connection and model object
const connObj = {
	// db
    Activities: null,
    Notifications: null,
    Ratings: null,
    Users: null,
    Widgets: null,
	conn: null,
};

const connObj2 = {
	// db2
    C411: null,
    FMCSAS: null,
    Info: null,
    Inspections: null,
    Notes: null,
    Offers: null,
    Ratings: null,
    Usages: null,
    Wish_Lists: null,
	conn: null,
};

const connObj3 = {
	// db3
    Contacts: null,
    PhoneAssoc: null,
	conn: null,
};

let runConnectConfirm;

const gracefulExit = () => {
	mongoose.connection.close(() => {
		logger.info('Mongoose default connection with DB is disconnected through app termination');
		process.exit(0);
	});
};

const connect = async (databaseUrl, databaseUrl2, databaseUrl3, runConnection) => {
	try {
        runConnectConfirm = runConnection;

		if (runConnection === 'connection1') {
            // connect to db
            const db = mongoose.createConnection(databaseUrl, connOptions);
            connObj.conn = db;
            db.once('open', () => logger.info('connected to DB'));
            
            // collections
            connObj.Activities = db.model('foos', fooSchema);
            connObj.Notifications = db.model('foos', fooSchema);
            connObj.Ratings = db.model('foos', fooSchema);
            connObj.Users = db.model('foos', fooSchema);
            connObj.Widgets = db.model('foos', fooSchema);

        }
        
		if (runConnection === 'connection2') {
            // connect to db
            const db2 = mongoose.createConnection(databaseUrl2, connOptions); // needs to include db in the env "/FVOS"
            connObj2.conn = db2;
            db2.once('open', () => logger.info('connected to DB'));

            // collections
            connObj2.C411 = db2.model('foos', fooSchema);
            connObj2.FMCSAS = db2.model('foos', fooSchema);
            connObj2.Info = db2.model('foos', fooSchema);
            connObj2.Inspections = db2.model('foos', fooSchema);
            connObj2.Notes = db2.model('foos', fooSchema);
            connObj2.Offers = db2.model('foos', fooSchema);
            connObj2.Ratings = db2.model('foos', fooSchema);
            connObj2.Usages = db2.model('foos', fooSchema);
            connObj2.Wish_Lists = db2.model('foos', fooSchema);
        }
        
		if (runConnection === 'connection3') {
            // connect to db
            const db3 = mongoose.createConnection(databaseUrl2, connOptions); // needs to include db in the env "/FVOS"
            connObj3.conn = db3;
            db3.once('open', () => logger.info('connected to DB'));

            // collections
            connObj3.Contacts = db3.model('foos', fooSchema);
            connObj3.PhoneAssoc = db3.model('foos', fooSchema);
        }

		// If the Node process ends, close the Mongoose connection
		process
			.on('SIGINT', gracefulExit)
			.on('SIGTERM', gracefulExit);

	} catch (error) {
		logger.error(error);
	}
};
if (runConnectConfirm === 'connection1') {
    connObj.connect = connect;
}
if (runConnectConfirm === 'connection2') {
    connObj2.connect = connect;
}
if (runConnectConfirm === 'connection3') {
    connObj3.connect = connect;
}

module.exports = { connObj, connObj2, connObj3 };
