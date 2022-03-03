const router = require('express').Router();

const { auth } = require('../scripts/v0');

const { basicReporting } = require('./v0');

// ROUTES
router.get('/reporting/basic/activities', auth, basicReporting.getAllActivities);

module.exports = router;
