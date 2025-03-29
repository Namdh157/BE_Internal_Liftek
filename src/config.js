const Joi = require('joi');
require('dotenv').config();
const jwt = require('./../token/jsonwebtoken');

// define validation for all the env vars
const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string().trim()
    .allow(['development', 'production', 'test', 'provision'])
    .default('development'),
  PORT: Joi.number()
    .default(4040),
  MONGOOSE_DEBUG: Joi.boolean()
    .when('NODE_ENV', {
      is: Joi.string().trim().equal('development'),
      then: Joi.boolean().default(true),
      otherwise: Joi.boolean().default(false)
    }),
  MONGO_HOST: Joi.string().required()
    .description('Mongo DB host url'),
  MONGO_USERNAME: Joi.string()
    .default(''),
  MONGO_PASSWORD: Joi.string()
    .default('')
}).unknown()
  .required();

const { error, value: envVars } = Joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongooseDebug: envVars.MONGOOSE_DEBUG,
  jwtSecret: envVars.JWT_SECRET,
  mongo: {
    host: envVars.MONGO_HOST,
    user: envVars.MONGO_USERNAME,
    // pass: envVars.MONGO_PASSWORD
    pass: jwt.verify(envVars.MONGO_PASSWORD)
  },
  angenda: {
    host: envVars.ANGENDA_HOST,
  }
};

module.exports = config;
