const { v0: { db, CustomError } } = require('../../../scripts');

const getAllActivities = async ({ direction, limit, skip, sort }) => {
	try {
		const query = { 
            // ...(fvosID && { fvosID }), 
        };

        const sortSpecification = {
            ...(sort && { [sort]: direction && direction === 'ascending' ? 1 : -1 }),
        };

		const result = await db.Activities.aggregate([
            { $match: query },
            {
                $facet: {
                    paginatedResults: [{ $sort: sortSpecification }, { $skip: skip * limit }, { $limit: limit }],
                    resultStats: [{ $count: 'queryResultCount' }]
                }
            }
        ]);

        const totalCount = await db.Activities.count();

        return { result, totalCount }
	} catch (error) {
        console.log(error);
		throw new CustomError('TestError')
	}
};

module.exports = getAllActivities;
