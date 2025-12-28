import Joi from "joi";

export const GetCategoriesQueryDto = Joi.object({
  search: Joi.string().trim().optional().allow(""),
  isActive: Joi.boolean().optional(),
  parent: Joi.string().hex().length(24).optional().allow(null),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
});