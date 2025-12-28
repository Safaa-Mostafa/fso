import {
    Router
} from "express";
import authenticate from "../../../middleware/auth.js";
import productController from "../controllers/productcontroller.js";
import {
    validateBody,
    validateParams
} from "../../../middleware/validate.js";
import {
    getProductParamsSchema
} from "../dtos/requests/getProductParamsDto.js";
import {
    createProductSchema
} from "../dtos/requests/CreateProductDto.js";
import {
    updateProductSchema
} from "../dtos/requests/UpdateProductDto.js";
import {
    deleteProductParamsSchema
} from "../dtos/requests/deleteProductParamsSchema.js";
import {
    getProductsQuerySchema
} from "../dtos/requests/GetProductsQueryDto.js";

const router = Router();

router.get("/", validateBody(getProductsQuerySchema), productController.getProducts);
router.get("/:id", authenticate, validateParams(getProductParamsSchema), productController.getProduct);

router.post(
    "/", authenticate,
    validateBody(createProductSchema),
    productController.createProduct
);

router.put(
    "/:id", authenticate,
    validateBody(updateProductSchema),
    productController.updateProduct
);

router.delete(
    "/:id", authenticate,
    validateParams(deleteProductParamsSchema),
    productController.deleteProduct
);

export default router;