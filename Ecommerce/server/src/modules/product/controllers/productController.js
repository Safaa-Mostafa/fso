import ApiError from '../../../utils/ApiError.js';
import { sendResponse } from '../../../utils/apiResponse.js';
import {
    HttpStatus
} from '../../../utils/httpStatus.js';
import productService from '../services/product.services.js';

const createProduct = async (req, res, next) => {
    try {
        const product = await productService.createProduct(req.body);
        res.status(HttpStatus.CREATED).json(product);
    } catch (err) {
        next(err);
    }
}

const getProducts = async (req, res, next) => {
    try {
        const products = await productService.products();
   const mappedProducts = products.map((p) => ({
      _id: p?._id?.toString() ?? "",
      name: p?.name ?? "",
      slug: p?.slug ?? "",
      description: p?.description ?? "",
      price: p?.price ?? 0,
      discountPrice: p?.discountPrice ?? 0,
      stock: p?.stock ?? 0,
      category: p?.category
        ? { _id: p.category._id?.toString() ?? "", name: p.category.name ?? "" }
        : { _id: "", name: "" },
      brand: p?.brand ?? "",
      images: Array.isArray(p?.images)
        ? p.images.map((img) => ({
            url: img?.url ?? "",
            publicId: img?.publicId ?? "",
          }))
        : [],
      ratingsAverage: p?.ratingsAverage ?? 0,
      ratingsCount: p?.ratingsCount ?? 0,
      seller: p?.seller?.toString() ?? "",
      isActive: p?.isActive ?? true,
      createdAt: p?.createdAt ?? null,
      updatedAt: p?.updatedAt ?? null,
    }));
        res.json(mappedProducts);
    } catch (err) {
        next(err);
    }
};

const getProduct = async (req, res, next) => {
    try {
        const product = await productService.getProductById(req.params.id);
    
        if (!product)
            throw ApiError.notFound("Product not Exist");
        
        res.json(product);
    } catch (err) {
        next(err);
    }
};

const updateProduct = async (req, res, next) => {
    try {
        const product = await productService.getProductById(req.params.id);
        
        if (!product)
            throw ApiError.notFound("Product not Exist");

        await productService.updateProduct(
            req.params.id,
            req.body
        );
        res.json(product);
    } catch (err) {
        next(err);
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        const product = await productService.getProductById(req.params.id);
      
        if (!product)
            throw ApiError.notFound("Product not Exist");
        
        await productService.deleteProduct(req.params.id);
        sendResponse(res,true,"product deleted successfully");
    } catch (err) {
        next(err);
    }
};

const productController = {
    createProduct,
    updateProduct,
    getProduct,
    getProducts,
    deleteProduct
}
export default productController;