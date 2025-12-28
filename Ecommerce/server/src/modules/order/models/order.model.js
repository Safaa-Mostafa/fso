import mongoose  from "mongoose";
const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },

    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        qty: Number,
        price: Number,
    }],

    shippingAddress: {},
    paymentMethod: {
        type: String,
        enum: ["COD", "Card"]
    },

    status: {
        type: String,
        enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
        default: "Pending"
    },

    totalPrice: Number,
}, {
    timestamps: true
});

const OrderModel = mongoose.model("Order", orderSchema);
export default OrderModel;