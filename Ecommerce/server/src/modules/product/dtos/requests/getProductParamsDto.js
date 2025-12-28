import Joi from "joi";

export const getProductParamsSchema = Joi.object({
  id: Joi.string().hex().length(24).required()
});
