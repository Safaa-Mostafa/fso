import { HttpStatus } from "./httpStatus.js";

export const sendResponse = (res, data = null, message = "Success", status = HttpStatus.OK) => {
  res.status(status).json({
    status,
    success: status < HttpStatus.BAD_REQUEST,
    message,
    data
  });
};

export const sendError = (res, message = "Internal Server Error", status = Number(HttpStatus.INTERNAL_SERVER_ERROR)) => {
  res.status(status).json({
    status,
    success: false,
    message,
    data: null
  });
};
