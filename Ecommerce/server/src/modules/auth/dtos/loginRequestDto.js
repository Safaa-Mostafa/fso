import Joi from 'joi';

export const LoginUserDTO = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});