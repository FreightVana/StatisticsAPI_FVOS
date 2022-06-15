const { v0: { db, CustomError } } = require('../../../scripts');

const updateStuffs = async () => {
	try {
      
	    const allActivities = await db.Activities.distinct("activityReferenceID");

        const carrierDetails = [];

        for (const elem of allActivities ) {
            const detail = await db.Info
                .find({ fvosID: elem })
                .select({ mcNumber: 1, dotNumber: 1, 'census.legalName': 1, 'census.doingBusinessAsName': 1, _id: 0 })

            carrierDetails.push({ 
                fvosID: elem,
                mcNumber: detail[0].mcNumber,
                dotNumber: detail[0].dotNumber,
                legalName: detail[0].census.legalName,
                doingBusinessAsName: detail[0].census.doingBusinessAsName
            });
        }

        console.log('carrierDetails: ', carrierDetails);
        let count = 0;
        for (const carrier of carrierDetails) {
            count += 1;
            await db.Activities.updateMany(
                { activityReferenceID: carrier.fvosID },
                {
                    $set: {
                        metaObj: {
                            mcNumber: carrier.mcNumber,
                            dotNumber: carrier.dotNumber,
                            legalName: carrier.legalName,
                            doingBusinessAsName: carrier.doingBusinessAsName, 
                        }
                    }
                },
                {
                    upsert: false,
                    multi:true
                }
            );
            console.log('count: ', count, 'fvosID: ', carrier.fvosID);
        }
  
        return
	} catch (error) {
        console.log(error);
		throw new CustomError('TestError')
	}
};

module.exports = updateStuffs;
