const { v0: { db, CustomError } } = require('../../../scripts');
const agg = require('./topActiveUsersAggs');

const topActiveUsers = async (value) => {
	try {
        // need to pass month arg as num 0-11 && type of search
        // const {
        //     month,
        // } = value;
        
		const result = await db.Activities.aggregate(agg('userThisMonth', 3));

        return { result }
        // return
	} catch (error) {
        console.log(error);
		throw new CustomError('TestError')
	}
};

module.exports = topActiveUsers;
