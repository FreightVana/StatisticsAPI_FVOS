const { v0: { db } } = require('../../../scripts');

const view = () => db.Activities.find();

module.exports = view;
