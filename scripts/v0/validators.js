const Joi = require('joi');

const activityAllValidator = Joi.object().keys({
	direction: Joi.string().required(),
	limit: Joi.number().required(),
	skip: Joi.number().required(),
	sort: Joi.string().required(),
});

module.exports = {
	activityAllValidator,
};
