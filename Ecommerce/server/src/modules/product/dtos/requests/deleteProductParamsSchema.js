import Joi from "joi";

export const deleteProductParamsSchema = Joi.object({
  id:  Joi.string().hex().length(24).required()
});
