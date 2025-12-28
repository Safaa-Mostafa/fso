import ApiError from "../../../utils/ApiError.js";
import  CategoryModel from "../models/category.model.js";

const createCategory = async (data) => {
  const category = await CategoryModel.findOne({ name: data.name });
  if (category) {
    throw ApiError.badRequest("name must be unique"); 
  }
  return CategoryModel.create(data);
};


const categories = async () => {
  return CategoryModel.find({
    isActive: true
  });
};

const getById = async (id) => {
  const category = await CategoryModel.findById(id);
  if (!category) {
    throw ApiError.notFound("Category not exist"); 
  }
  return await CategoryModel.findById(id);
};

const update = async (id, data) => {
  const category = await CategoryModel.findById(id);
  if (!category) {
    throw ApiError.notFound("Category not exist"); 
  }
  return await CategoryModel.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true
  });
};

const deleteCategory = async (id) => {
  const category = await CategoryModel.findById(id);
  if (!category) {
    throw ApiError.notFound("Category not exist"); 
  }
  return await  CategoryModel.findByIdAndUpdate(
    id, {
      isActive: false
    }, {
      new: true
    }
  );
};

export default {
  deleteCategory,
  update,
  getById,
  categories,
  createCategory
}