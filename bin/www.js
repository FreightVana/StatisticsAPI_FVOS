const app = require('../app');

const {
	databaseURL,
	databaseURL2,
	databaseURL3,
	databaseURL4,
	port,
} = require('../src/config/config');
const { logger } = require('../src/config/logging');

const { db } = require('../scripts/v0');

const normalizePort = (val) => {
	const portNum = parseInt(val, 10);
	if (Number.isNaN(portNum)) return val;
	if (portNum >= 0) return portNum;
	return false;
};

let server;

const runServer = async (dbArray, portNumber) => {
	try {
        await db.connect(dbArray);
		server = app.listen(portNumber, () => {
			logger.info(`Server listening on port ${portNumber}`);
		});

		return server;
	} catch (error) {
		return logger.error(error);
	}
};

const closeServer = () => {
	try {
		return server.close();
	} catch (error) {
		return logger.error(error);
	}
};

if (require.main === module) {
	try {
		runServer([databaseURL, databaseURL2, databaseURL3, databaseURL4], normalizePort(port));
	} catch (error) {
		logger.error(error);
	}
}

module.exports = {
	app,
	runServer,
	closeServer,
};
