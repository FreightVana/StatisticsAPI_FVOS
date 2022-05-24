const { v0: { other } } = require('../../../services');

const fixEmails = async (req, res, next) => {
	try {
		await other.fixEmails();

		return res.sendStatus(200);
	} catch (error) {
		return next(error);
	}
};

module.exports = fixEmails;
