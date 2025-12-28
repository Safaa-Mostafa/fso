import Joi from "joi";

export const CreateCategoryDto = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .required()
    .messages({
      "string.empty": "Category name is required",
      "string.min": "Category name must be at least 2 characters",
      "string.max": "Category name cannot exceed 50 characters",
    }),
  description: Joi.string()
    .max(200)
    .optional()
    .allow("")
    .messages({
      "string.max": "Description cannot exceed 200 characters",
    }),
  isActive: Joi.boolean().optional(),
  parent: Joi.string()
    .hex()
    .length(24)
    .optional()
    .allow(null)
    .messages({
      "string.hex": "Parent must be a valid ObjectId",
    }),
});
