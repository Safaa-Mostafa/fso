import config from "../../../utils/config.js";
import RefreshToken from "../models/refreshToken.model.js";
import User from "../models/user.model.js";
import ApiError from "../../../utils/ApiError.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const generateAccessToken = (user) => {
  return jwt.sign(
    { sub: user._id, role: user.role },
    config.JWT_SECRET,
    { expiresIn: config.ACCESS_TOKEN_EXPIRES }
  );
};

const generateRefreshToken = async (user, ipAddress) => {
  const token = crypto.randomBytes(40).toString("hex");
  const expires = new Date(Date.now() + config.REFRESH_TOKEN_DAYS * 24 * 60 * 60 * 1000);

  const refreshToken = new RefreshToken({
    user: user._id,
    token,
    expires,
    createdByIp: ipAddress
  });

  await refreshToken.save();
  return token;
};

export const registerUser = async (data) => {
  const existing = await User.findOne({ email: data.email });
  if (existing) throw ApiError.badRequest("Email already registered");

  const user = await User.create(data);
  return user;
};

export const loginUser = async (email, password, ip) => {
  const user = await User.findOne({ email });
  if (!user) throw ApiError.badRequest("Invalid Email Or Password");

  const passwordIdentical = await user.isPasswordMatch(password);
  if (!passwordIdentical) throw ApiError.unauthorized("Invalid Email Or Password");

  const accessToken = generateAccessToken(user);
  const refreshToken = await generateRefreshToken(user, ip);

  return { accessToken, refreshToken };
};

export const refreshToken = async (token, ip) => {
  const tokenDoc = await RefreshToken.findOne({ token });
  if (!tokenDoc || tokenDoc.expires < new Date() || tokenDoc.revoked) {
    throw ApiError.unauthorized("Invalid Refresh Token");
  }

  const user = await User.findById(tokenDoc.user);
  const newAccessToken = generateAccessToken(user);
  const newRefreshToken = await generateRefreshToken(user, ip);

  tokenDoc.revoked = new Date();
  tokenDoc.revokedByIp = ip;
  tokenDoc.replacedByToken = newRefreshToken;
  await tokenDoc.save();

  return { accessToken: newAccessToken, refreshToken: newRefreshToken };
};

const authService = {
  registerUser,
  loginUser,
  refreshToken
};

export default authService;
