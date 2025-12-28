import mongoose from "mongoose";
const refreshTokenSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    token: {
        type: String,
        required: true
    },
    expires: {
        type: Date,
        required: true
    },
    createdByIp: {
        type: String,
        required: true
    },
    revoked: Date,
    revokedByIp: String,
    replacedByToken: String
}, {
    timestamps: true
});
const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);
export default RefreshToken;