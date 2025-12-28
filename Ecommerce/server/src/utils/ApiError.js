import { HttpStatus } from "./httpStatus.js";

class ApiError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }

    static badRequest(msg) {
        return new ApiError(HttpStatus.BAD_REQUEST, msg);
    }

    static unauthorized(msg) {
        return new ApiError(HttpStatus.UNAUTHORIZED, msg);
    }

    static forbidden(msg) {
        return new ApiError(HttpStatus.FORBIDDEN, msg);
    }   

    static notFound(msg) {
        return new ApiError(HttpStatus.NOT_FOUND, msg);
    }

    static internal(msg) {
        return new ApiError(HttpStatus.INTERNAL_SERVER_ERROR, msg);
    }
}

export default ApiError;