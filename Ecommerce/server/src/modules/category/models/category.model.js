import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Category name is required"],
        unique: true,
        trim: true,
        minlength: [2, "Category name must be at least 2 characters"],
        maxlength: [50, "Category name cannot exceed 50 characters"]
    },
    description: {
        type: String,
        trim: true,
        maxlength: [200, "Description cannot exceed 200 characters"]
    },
    isActive: {
        type: Boolean,
        default: true
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        default: null
    }
}, {
    timestamps: true
});

categorySchema.methods.active = function () {
    this.isActive = true;
    return this.save();
}

categorySchema.methods.deactivate  = function () {
    this.isActive = false;
    return this.save();
}

categorySchema.statics.getSubcategories = function (parentId) {
    return this.find({
        parent: parentId
    });
};
const CategoryModel = mongoose.model("Category", categorySchema);


export default CategoryModel;
