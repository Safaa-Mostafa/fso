import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import config from "../utils/config.js";
import UserModel from "../modules/auth/models/user.model.js";
const authenticate = async (req, res, _next) => {
    try {
        const header = req.headers.authorization;
        if (!header || !header.startsWith('Bearer '))
            return _next(ApiError.unauthorized('Unauthorized'));
        const token = header.split(' ')[1];
        const payload = jwt.verify(token, config.JWT_SECRET);
        req.user = await UserModel.findById(payload.sub).select('-password');
        if (!req.user)
            return _next(ApiError.unauthorized('user not found'));
        _next();

    } catch (err) {
        _next(ApiError.unauthorized("Invalid Token"));
    }
};

export default authenticate;