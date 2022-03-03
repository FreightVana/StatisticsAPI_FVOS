const Joi = require('joi');

const activityAllValidator = Joi.object().keys({
	direction: Joi.string().required(),
	limit: Joi.number().required(),
	skip: Joi.number().required(),
	sort: Joi.string().required(),
    //
    displayName: Joi.string().allow('', null),
    activityType: Joi.array().optional(),
    createdAt: Joi.string().allow('', null),
    companyName: Joi.string().allow('', null),
    mcNumber: Joi.string().allow('', null),
    dotNumber: Joi.string().allow('', null),
});

module.exports = {
	activityAllValidator,
};
