const app = require('../app');
const util = require('util');

const { port, databaseURL, databaseURL2, databaseURL3} = require('../src/config/config');
const { logger } = require('../src/config/logging');

const { connObj, connObj2, connObj3 } = require('../scripts/v0');



const normalizePort = (val) => {
	const portNum = parseInt(val, 10);
	if (Number.isNaN(portNum)) return val;
	if (portNum >= 0) return portNum;
	return false;
};

let server;

const runServer = async (database1, database2, database3, portNumber) => {
	try {
        console.log(util.inspect(connObj, { depth: 20 }));
		// await db.connObj.connect(database1, database2, database3, 'connection1');
		// await db2.connect(database1, database2, database3, 'connection2');
		// await db3.connect(database1, database2, database3, 'connection3');
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
		runServer(databaseURL, databaseURL2, databaseURL3, normalizePort(port));
	} catch (error) {
		logger.error(error);
	}
}

module.exports = {
	app,
	runServer,
	closeServer,
};
