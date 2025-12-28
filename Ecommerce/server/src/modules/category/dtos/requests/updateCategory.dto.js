import Joi from "joi";

export const UpdateCategoryDto = Joi.object({
  name: Joi.string().min(2).max(50).optional(),
  description: Joi.string().max(200).optional().allow(""),
  isActive: Joi.boolean().optional(),
  parent: Joi.string().hex().length(24).optional().allow(null),
});
