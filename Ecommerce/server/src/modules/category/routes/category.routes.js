import express from "express";
import categoryController from "../controllers/category.controller.js";
import authenticate from "../../../middleware/auth.js";
import { validateBody, validateParams } from "../../../middleware/validate.js";
import { GetCategoriesQueryDto } from "../dtos/requests/getCategories.query.dto.js";
import { CategoryParamsDto } from "../dtos/requests/getCategory.params.dto.js";
import { CreateCategoryDto } from "../dtos/requests/createCategory.dto.js";
import { UpdateCategoryDto } from "../dtos/requests/updateCategory.dto.js";
import { deleteCategoryParamsDto } from "../dtos/requests/deleteCategory.dto.js";

const router = express.Router();

// GET /categories?search=&page=&limit=&sort=
router.get(
  "/", 
  validateBody(GetCategoriesQueryDto), 
  categoryController.getCategories
);

// GET /categories/:id
router.get(
  "/:id",
  authenticate,
  validateParams(CategoryParamsDto),
  categoryController.getCategoryById
);

// POST /categories
router.post(
  "/",
  authenticate,
  validateBody(CreateCategoryDto),
  categoryController.createCategory
);

// PUT /categories/:id
router.put(
  "/:id",
  authenticate,
  validateBody(UpdateCategoryDto),
  categoryController.updateCategory
);

// DELETE /categories/:id
router.delete(
  "/:id",
  authenticate,
  validateParams(deleteCategoryParamsDto),
  categoryController.deleteCategory
);

export default router;
