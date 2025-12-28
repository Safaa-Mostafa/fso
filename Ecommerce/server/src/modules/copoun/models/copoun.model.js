import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true
    },

    discountType: {
        type: String,
        enum: ["percentage", "fixed"], 
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    minimumCartValue: {
        type: Number,
        default: 0
    },

    usageLimit: {
        type: Number,
        default: 1 
    },

    usedCount: {
        type: Number,
        default: 0
    },

    expiresAt: {
        type: Date,
        required: true
    },

    isActive: {
        type: Boolean,
        default: true
    },

    allowedUsers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]

}, { timestamps: true });

export default mongoose.model("Coupon", couponSchema);
