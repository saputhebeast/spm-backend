import * as Joi from 'joi';

export const validationSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'stage', 'test'),
  JWT_SECRET: Joi.string().required(),
  JWT_EXPIRES_IN: Joi.string().required(),
  PORT: Joi.number().default(3000),
  DATABASE_URL: Joi.string().required(),
});
