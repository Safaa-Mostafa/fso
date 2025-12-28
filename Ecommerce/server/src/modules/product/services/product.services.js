import Product from "../models/product.model.js";

const createProduct = async (data) => {
    return await Product.create(data);
};

const products = async () => {
return Product.find({isActive:true}).populate("category", "_id name").lean();
};

const getProductById = async (id) => {
return Product.findById(id);
};

const update = async (id,data)=>{
return Product.findByIdAndUpdate(id,data,{
    new :true,
    runValidators:true
});
};

const deleteProduct = async (id)=>{
return Product.findByIdAndUpdate(
    id,
    {isActive:false},
    {new :true}
);
};

const productService = {
  createProduct,
  products,
  getProductById,
  update,
  deleteProduct,
};

export default productService;
