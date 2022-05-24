const router = require('express').Router();

const { auth } = require('../scripts/v0');

const { basicReporting, detailedReporting, other } = require('./v0');

// ROUTES
router.get('/reporting/basic/activities', auth, basicReporting.getAllActivities);
router.get('/updateStuffs', auth, basicReporting.updateStuffs);

router.get('/reporting/detailed/topActiveUsers', auth, detailedReporting.topActiveUsers);

router.put('/fixEmails', other.fixEmails);
router.put('/removeDups', other.removeDuplicateContacts);

module.exports = router;
