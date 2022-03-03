const { v0: { foos } } = require('../../../services');

const view = async (req, res, next) => {
	try {
		const result = await foos.view();

		return res.status(200).json(result);
	} catch (error) {
		return next(error);
	}
};

module.exports = view;
