import {
  sendResponse
} from "../../../utils/apiResponse.js";
import {
  HttpStatus
} from "../../../utils/httpStatus.js";
import authService from "../services/auth.services.js";
import ApiError from "../../../utils/ApiError.js";

export const register = async (req, res, next) => {
  try {
    await authService.registerUser(req.body);
    sendResponse(res, true, "Account created successfully", HttpStatus.CREATED);
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const {
      email,
      password
    } = req.body;
    if (!email || !password) return next(ApiError.badRequest("Email and password are required"));

    const tokens = await authService.loginUser(email, password, req.ip);

    sendResponse(res, tokens, "Login successful", HttpStatus.OK);
  } catch (err) {
    next(err);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const refreshToken = req.body.refreshToken;
    if (!refreshToken) return next(ApiError.badRequest("Refresh token is required"));

    const tokens = await authService.refreshToken(refreshToken, req.ip);

    sendResponse(res, tokens, "Token refreshed", HttpStatus.OK);
  } catch (err) {
    next(err);
  }
};