import mongoose from "mongoose";
const sellerSchema = new mongoose.Schema({
    shopName: String,
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    rating: {
        type: Number,
        default: 0
    },
    totalSales: {
        type: Number,
        default: 0
    },
}, {
    timestamps: true
});
const SellerModel = mongoose.model("Seller", sellerSchema);
export default SellerModel