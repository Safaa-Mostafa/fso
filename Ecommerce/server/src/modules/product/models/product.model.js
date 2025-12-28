import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    discountPrice: {
      type: Number,
      min: 0,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

category: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Category",
  required: true,
  index: true,
},


    brand: {
      type: String,
      trim: true,
    },

    images: [
      {
        url: String,
        publicId: String,
      },
    ],

    ratingsAverage: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    ratingsCount: {
      type: Number,
      default: 0,
    },

    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
});

productSchema.set("toJSON", { virtuals: true });

productSchema.set("toObject", { virtuals: true });

productSchema.index({ price: 1 });
productSchema.index({ ratingsAverage: -1 });


export default mongoose.model("Product", productSchema);
