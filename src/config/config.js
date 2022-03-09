require('dotenv').config();

const Joi = require('joi');

const envVarsSchema = Joi.object().keys({
	NODE_ENV: Joi.string().valid('production', 'dev', 'staging').required(),
	PORT: Joi.number().positive(),
	DATABASE_URL: Joi.string().required(),
	DATABASE_URL2: Joi.string().required(),
	DATABASE_URL3: Joi.string().required(),
	DATABASE_URL4: Joi.string().required(),
	NAME: Joi.string().required(),
	TOKEN_KEY: Joi.string(),
}).unknown();

const { value: envVars, error } = envVarsSchema.validate(process.env);

if (error) {
	throw new Error(error);
}

module.exports = {
	port: envVars.PORT || 3000,
	databaseURL: envVars.DATABASE_URL,
    databaseURL2: envVars.DATABASE_URL2,
    databaseURL3: envVars.DATABASE_URL3,
    databaseURL4: envVars.DATABASE_URL4,
	nodeEnv: envVars.NODE_ENV,
	indexName: envVars.NAME,
	tokenKey: envVars.TOKEN_KEY,
};
