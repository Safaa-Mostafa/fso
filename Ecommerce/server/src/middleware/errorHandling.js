import { sendError } from "../utils/apiResponse.js";
import { HttpStatus } from "../utils/httpStatus.js";
import logger from "../utils/logger.js";

const errorHandling = (err, req, res, next) => {
  logger.error(err);

  let statusCode = err.status || err.statusCode || HttpStatus.INTERNAL_SERVER_ERROR;
  let message = err.message || "Internal Server Error";
  if (err.name === "CastError") {
    statusCode = HttpStatus.BAD_REQUEST;
    message = "Malformatted ID";
  } else if (err.name === "ValidationError") {
    statusCode = HttpStatus.BAD_REQUEST;
    message = err.message;
  } else if (err.name === "MongoServerError" && err.code === 11000) {
    statusCode = HttpStatus.BAD_REQUEST;
    const field = Object.keys(err.keyValue)[0];
    message = `Duplicate value for field \`${field}\``;
  } else if (err.name === "JsonWebTokenError") {
    statusCode = HttpStatus.UNAUTHORIZED;
    message = "Invalid token";
  } else if (err.name === "TokenExpiredError") {
    statusCode = HttpStatus.UNAUTHORIZED;
    message = "Token expired";
  }

  sendError(res, message, statusCode);
};

export default errorHandling;
