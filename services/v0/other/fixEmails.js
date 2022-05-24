const { v0: { db, CustomError } } = require('../../../scripts');

const fixEmails = async () => {
	try {
		const actvitities = await db.Activities.find({ email: 'ops@freightvana.io' });

        for (let index = 0; index < actvitities.length; index++) {
            const userObj = await db.Users.findOne({ displayName: act.displayName });
            if (userObj) {
                await db.Activities.findOneAndUpdate({ _id: act._id }, { email: userObj.email });
            }
        }

        return;
        // return
	} catch (error) {
        console.log(error);
		throw new CustomError('TestError')
	}
};

module.exports = fixEmails;
