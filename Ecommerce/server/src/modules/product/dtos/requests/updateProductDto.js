import Joi from "joi";

export const updateProductSchema = Joi.object({
  name: Joi.string().min(3).optional(),
  slug: Joi.string().lowercase().trim().optional(),
  description: Joi.string().min(3).optional(),
  price: Joi.number().min(0).optional(),
  discountPrice: Joi.number().min(0).optional(),
  stock: Joi.number().min(0).optional(),
  category: Joi.string().min(2).optional(),
  brand: Joi.string().trim().optional(),
  images: Joi.array()
    .items(
      Joi.object({
        url: Joi.string().uri().required(),
        publicId: Joi.string().required(),
      })
    )
    .optional(),
  ratingsAverage: Joi.number().min(0).max(5).optional(),
  ratingsCount: Joi.number().min(0).optional(),
  seller: Joi.string().hex().length(24).optional(),
  isActive: Joi.boolean().optional(),
});
