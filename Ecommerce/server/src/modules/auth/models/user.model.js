import mongoose from "mongoose";
import bcrypt from 'bcrypt';
const addressSchema = new mongoose.Schema({
    fullName: {
        type: String,
        trim: true,
        required: true
    },
    phone: {
        type: String,
        trim: true,
        required: true
    },
    country: {
        type: String,
        trim: true,
        required: true
    },
    street: {
        type: String,
        trim: true,
        required: true
    },
    building: {
        type: String,
        trim: true,
        required: true
    },
    isDefault: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["user", "seller", "admin"],
        default: "user"
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    addresses: [addressSchema],

    cart: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        qty: {
            type: Number,
            default: 1
        }
    }],

    wishlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
    passwordResetToken: String,
    passwordResetExpires: Date,
    emailVerifyToken: String,
    emailVerifyExpires: Date,

}, {
    timestamps: true
});

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return ;
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.isPasswordMatch = function (password) {
    return bcrypt.compare(password, this.password);
};

const UserModel = mongoose.model("User", userSchema);
export default UserModel