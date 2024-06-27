import 'dotenv/config';
import * as Joi from 'joi';

export const envVarsSchema = Joi.object({
  PORT: Joi.string().required(),
  PRODUCTS_MICROSERVICE_HOST: Joi.string().required(),
  PRODUCTS_MICROSERVICE_PORT: Joi.string().required(),
}).unknown(true);

const { error, value: envVars } = envVarsSchema.validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

export const envs = {
  port: envVars.PORT,
  productsMicroservice: {
    host: envVars.PRODUCTS_MICROSERVICE_HOST,
    port: envVars.PRODUCTS_MICROSERVICE_PORT,
  },
};
