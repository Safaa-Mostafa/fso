import ApiError from "../utils/ApiError.js";
import logger from "../utils/logger.js";

export const validateBody = (schema) => (req, res, next) => {
  if (!schema) return next();

  const { error, value } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return next(ApiError.badRequest(error.details.map(d => d.message).join(", ")));
  }
  req.body = value;
  next();
};


export const validateParams = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.params, { abortEarly: false });
  if (error) return next(ApiError.badRequest(error.details.map(d => d.message).join(", ")));
  req.params = value;
  next();
};