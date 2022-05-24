const { v0: { other } } = require('../../../services');

const removeDuplicateContacts = async (req, res, next) => {
	try {
		await other.removeDuplicateContacts();

		return res.sendStatus(200);
	} catch (error) {
		return next(error);
	}
};

module.exports = removeDuplicateContacts;
