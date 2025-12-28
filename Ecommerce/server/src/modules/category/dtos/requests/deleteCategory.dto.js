import Joi from "joi";

export const deleteCategoryParamsDto = Joi.object({
  id: Joi.string()
    .hex()
    .length(24)
    .required()
    .messages({
      "string.hex": "Invalid category id",
      "any.required": "Category id is required",
    }),
});
