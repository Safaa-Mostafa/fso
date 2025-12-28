import Joi from "joi";

export const getProductsQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(10),
  search: Joi.string().trim().allow(""),
  category: Joi.string().trim().optional(),
  brand: Joi.string().trim().optional(),
  orderBy: Joi.string()
    .valid("name", "price", "ratingsAverage", "createdAt")
    .default("createdAt"),
  orderDirection: Joi.string().valid("asc", "desc").default("desc"),
  minPrice: Joi.number().min(0).optional(),
  maxPrice: Joi.number().min(0).optional(),
});