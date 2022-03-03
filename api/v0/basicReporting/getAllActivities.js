const { v0: { validators: { activityAllValidator } } } = require('../../../scripts');
const { v0: { basicReporting } } = require('../../../services');

const getAllActivities = async (req, res, next) => {
	try {
        const {
			value,
			error,
		} = activityAllValidator.validate(req.query);
		if (error) throw error;

		const { result, totalCount } = await basicReporting.getAllActivities(value);

		return res.status(200).json({
            results: result[0].paginatedResults,
            queryCount: result[0].resultStats[0].queryResultCount,
            totalDocuments: totalCount
        });
	} catch (error) {
		return next(error);
	}
};

module.exports = getAllActivities;
