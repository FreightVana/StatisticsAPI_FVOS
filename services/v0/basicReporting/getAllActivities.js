const { v0: { db, CustomError } } = require('../../../scripts');
const util = require('util');
const getAllActivities = async (value) => {
	try {
        const {
            direction,
            limit,
            skip,
            sort,
            parentCode,
            displayName,
            email,
            activityType,
            companyName,
            mcNumber,
            dotNumber,
            eventStart,
            eventEnd,
        } = value;

		const query = { 
            ...(parentCode && { 'metaObj.parentCode': { $regex: parentCode, $options: 'i' } }), 
            ...(displayName && { 'displayName': { $regex: displayName, $options: 'i' } }), 
            ...(email && { 'email': email }),
            ...(activityType && { 'activityType': { $in: activityType } }), 
            ...(eventStart && !eventEnd && { 'createdAt': { $gte: new Date(eventStart) } }),
            ...(eventEnd && !eventStart && { 'createdAt': { $lte: new Date(eventEnd) } }),
            ...(eventEnd && eventStart && { 'createdAt': { $gte: new Date(eventStart), $lte: new Date(eventEnd) } }),
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
            companyName: 'metaObj.legalName',
            mcNumber: 'metaObj.mcNumber',
            dotNumber: 'metaObj.dotNumber',
        }

        if (sort) $facet.paginatedResults = [{ $sort: { [sortKeys[sort]]: direction && direction === 'ascending' ? 1 : -1 } }, { $skip: skip * limit }, { $limit: limit }]

		const result = await db.Activities.aggregate([
            { $match: query },
            { $facet }
        ]);

        const totalCount = await db.Activities.count();

        return { result, totalCount }
        // return
	} catch (error) {
        console.log(error);
		throw new CustomError('TestError')
	}
};

module.exports = getAllActivities;
