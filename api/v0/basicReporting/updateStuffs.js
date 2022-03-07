const { v0: { basicReporting } } = require('../../../services');

const updateStuffs = async (req, res, next) => {
	try {
		await basicReporting.updateStuffs();

		return res.sendStatus(200);
	} catch (error) {
		return next(error);
	}
};

module.exports = updateStuffs;
