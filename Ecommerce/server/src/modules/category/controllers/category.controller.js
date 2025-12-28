import mongoose from 'mongoose';
import {
  HttpStatus
} from '../../../utils/httpStatus.js';
import categoryService from '../services/category.service.js';

const getCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.categories();
    return res.status(HttpStatus.OK).send({
      status: true,
      data: categories,
      message: "Data loaded successfully"
    });
  } catch (error) {
    next(error);
  }
};

const getCategoryById = async (req, res, next) => {
  try {
    const {
      id
    } = req.params;

    const category = await categoryService.getById(id);
    if (!category)
      return res.status(HttpStatus.NOT_FOUND).send({
        status: true,
        data: null,
        message: "Category not found"
      });

    return res.status(HttpStatus.OK).send({
      status: true,
      data: category,
      message: "Category fetched successfully"
    });
  } catch (error) {
    next(error);
  }
};

const createCategory = async (req, res, next) => {
  try {
    const category = await categoryService.createCategory(req.body);
    console.log(category);
    return res.status(HttpStatus.CREATED).send({
      status: true,
      data: category,
      message: "Category created successfully"
    });
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const category = await categoryService.update(req.params.id, req.body);
    return res.status(HttpStatus.OK).send({
      status: true,
      data: category,
      message: "Category updated successfully"
    });
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const category = await categoryService.deleteCategory(req.params.id);
    return res.status(HttpStatus.OK).send({
      status: true,
      data: category,
      message: "Category deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
};