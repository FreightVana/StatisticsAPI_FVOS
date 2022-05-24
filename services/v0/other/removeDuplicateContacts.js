const { v0: { db, CustomError } } = require('../../../scripts');

function getAllIndexes(arr, val) {
    var indexes = [], i;
    for(i = 0; i < arr.length; i++)
        if (arr[i] === val)
            indexes.push(i);
    return indexes;
}

const removeDuplicateContacts = async () => {
	try {
		const contacts = await db.Contacts.find({});
		const contacts2D = contacts.map(contact => {
            const newObj = JSON.parse(JSON.stringify(contact));
            delete newObj['_id'];
            delete newObj['createdAt'];
            delete newObj['updatedAt'];
            delete newObj['author'];
            delete newObj['lastModifiedBy'];
            delete newObj['fvosID'];
            for (let index = 0; index < newObj.associations.length; index++) {
                const association = newObj.associations[index];
                delete association['_id'];
            }
            for (let index = 0; index < newObj.addresses.length; index++) {
                const address = newObj.addresses[index];
                delete address['_id'];
            }
            for (let index = 0; index < newObj.phoneNumbers.length; index++) {
                const phoneNumber = newObj.phoneNumbers[index];
                delete phoneNumber['_id'];
            }
            for (let index = 0; index < newObj.emailAddresses.length; index++) {
                const emailAddress = newObj.emailAddresses[index];
                delete emailAddress['_id'];
            }
            return JSON.stringify(newObj);
        });

        const OGIDs = [];
        const deletedIDs = [];

        for (let index = 0; index < contacts2D.length; index++) {
            const contact = contacts2D[index];
            const dupIndexes = getAllIndexes(contacts2D, contact);
            if (dupIndexes.length > 1) {
                const OGID = contacts[dupIndexes[0]]._id;
                if (!deletedIDs.includes(OGID)) OGIDs.push(JSON.stringify(OGID).replace(/["]/g, ''));
                for (let index = 1; index < dupIndexes.length; index++) {
                    const dup = dupIndexes[index];
                    if (!deletedIDs.includes(JSON.stringify(contacts[dup]._id).replace(/["]/g, ''))) {
                        const deleteID = JSON.stringify(contacts[dup]._id).replace(/["]/g, '');
                        deletedIDs.push(JSON.stringify(deleteID).replace(/["]/g, ''));
                    }
                }
            }
        }
        
        await db.Contacts.deleteMany({ _id: { $in: deletedIDs } });

        return;
	} catch (error) {
        console.log(error);
		throw new CustomError('TestError')
	}
};

module.exports = removeDuplicateContacts;
