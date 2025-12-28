import Joi from "joi";
export const createProductSchema = Joi.object({
  name: Joi.string().min(3).required(),
  slug: Joi.string().lowercase().trim().optional(),
  description: Joi.string().min(3).required(),
  price: Joi.number().min(0).required(),
  discountPrice: Joi.number().min(0).optional(),
  stock: Joi.number().min(0).default(0),
  category: Joi.string().min(2).required(),
  brand: Joi.string().trim().optional(),
  images: Joi.array()
    .items(
      Joi.object({
        url: Joi.string().uri().required(),
        publicId: Joi.optional(),
      })
    )
    .optional(),
  ratingsAverage: Joi.number().min(0).max(5).optional(),
  ratingsCount: Joi.number().min(0).optional(),
  seller: Joi.string().hex().length(24).optional(),
  isActive: Joi.boolean().default(true),
});
