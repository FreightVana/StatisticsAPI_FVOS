require('dotenv').config();

const Joi = require('joi');

const envVarsSchema = Joi.object().keys({
	NODE_ENV: Joi.string().valid('production', 'dev', 'staging').required(),
	PORT: Joi.number().positive(),
	DATABASE_URL: Joi.string().required(),
	DATABASE_URL2: Joi.string().required(),
	DATABASE_URL3: Joi.string().required(),
	DATABASE_URL4: Joi.string().required(),
	TEST_DATABASE_URL: Joi.string().required(),
	TEST_DATABASE_URL2: Joi.string().required(),
	TEST_DATABASE_URL3: Joi.string().required(),
	TEST_DATABASE_URL4: Joi.string().required(),
	NAME: Joi.string().required(),
	TOKEN_KEY: Joi.string(),
	TEST_TOKEN: Joi.string().required(),
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
	testToken: envVars.TEST_TOKEN,
	testDatabaseURL: envVars.TEST_DATABASE_URL,
	testDatabaseURL2: envVars.TEST_DATABASE_URL2,
	testDatabaseURL3: envVars.TEST_DATABASE_URL3,
	testDatabaseURL4: envVars.TEST_DATABASE_URL4,
};
