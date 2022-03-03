const { v0: { db, CustomError } } = require('../../../scripts');

const getAllActivities = async (value) => {
	try {
        const {
            direction,
            limit,
            skip,
            sort,
            displayName, // regex
            activityType, // this will have to be an $in []
            createdAt, // this will could end up being a range lookup
            // companyName
            // mcNumber
            // dotNumber
        } = value;
        
		const query = { 
            ...(displayName && { 'displayName': { $regex: displayName, $options: 'i' } }), 
            ...(activityType && { 'activityType': { $in: activityType } }), 
            ...(createdAt && { 'createdAt': { $gte: createdAt } }), 
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
