import Joi from 'joi';

export const registerSchema = {
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  phone: Joi.string().optional(),
  role: Joi.string().optional(),
  addresses: Joi.string().optional()
}