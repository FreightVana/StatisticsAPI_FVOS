const { v0: { detailedReporting } } = require('../../../services');

const topActiveUsers = async (req, res, next) => {
	try {
		const { result } = await detailedReporting.topActiveUsers();

		return res.status(200).json(result);
	} catch (error) {
		return next(error);
	}
};

module.exports = topActiveUsers;
