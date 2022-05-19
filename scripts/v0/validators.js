const Joi = require('joi');

const activityAllValidator = Joi.object().keys({
    direction: Joi.string().allow('', null),
	sort: Joi.string().allow('', null),
	limit: Joi.number().required(),
	skip: Joi.number().required(),
    //
    parentCode: Joi.string().allow('', null),
    displayName: Joi.string().allow('', null),
    email: Joi.string().allow('', null),
    activityType: Joi.array().optional(),
    createdAt: Joi.string().allow('', null),
    companyName: Joi.string().allow('', null),
    mcNumber: Joi.string().allow('', null),
    dotNumber: Joi.string().allow('', null),
    eventStart: Joi.string().allow('', null),
    eventEnd: Joi.string().allow('', null),
});

module.exports = {
	activityAllValidator,
};
