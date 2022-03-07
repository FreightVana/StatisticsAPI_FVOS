const { v0: { db, CustomError } } = require('../../../scripts');
const util = require('util');
const getAllActivities = async (value) => {
	try {
        const {
            direction,
            limit,
            skip,
            sort,
            displayName, // regex
            email,
            activityType, // this will have to be an $in []
            createdAt, // this will could end up being a range lookup
            companyName,
            mcNumber,
            dotNumber,
        } = value;
        
		const query = { 
            ...(displayName && { 'displayName': { $regex: displayName, $options: 'i' } }), 
            ...(email && { 'email': email }),
            ...(activityType && { 'activityType': { $in: activityType } }), 
            ...(createdAt && { 'createdAt': { $gte: createdAt } }),
            ...(companyName && { $or: [ { 'metaObj.legalName': { $regex: companyName, $options: 'i' } }, { 'metaObj.doingBusinessAsName': { $regex: companyName, $options: 'i' } } ] }),
            ...(mcNumber && { 'metaObj.mcNumber': { $regex: mcNumber } }),
            ...(dotNumber && { 'metaObj.dotNumber': { $regex: dotNumber } }),
        };

        let $facet = {
            paginatedResults: [{ $skip: skip * limit }, { $limit: limit }],
            resultStats: [{ $count: 'queryResultCount' }]
        }

        const sortKeys = {
            displayName: 'displayName',
            email: 'email',
            activityType: 'activityType',
            createdAt: 'createdAt',
            companyName: 'metaObj.companyName',
            mcNumber: 'metaObj.mcNumber',
            dotNumber: 'metaObj.dotNumber',
        }

        if (sort) $facet.paginatedResults = [{ $sort: { [sortKeys[sort]]: direction && direction === 'ascending' ? 1 : -1 } }, { $skip: skip * limit }, { $limit: limit }]

        console.log('facet: ', util.inspect($facet, { depth: 12 }));

		const result = await db.Activities.aggregate([
            { $match: query },
            { $facet }
        ]);

        const totalCount = await db.Activities.count();

        console.log('result: ', result);
        console.log('totalCount: ', totalCount);

        return { result, totalCount }
        // return
	} catch (error) {
        console.log(error);
		throw new CustomError('TestError')
	}
};

module.exports = getAllActivities;
