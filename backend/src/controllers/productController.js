import {
  createProducts,
  getCount,
  searchProducts,
  updateProducts,
  deleteProducts,
} from "../dao/productDao.js";
import ErrorHandler from "../utils/errorhander.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import ApiFeatures from "../utils/apifeatures.js";
import Product from "../models/productModel.js";

//Admin create product
export const createProduct = catchAsyncErrors(async (req, res, next) => {
  req.body.user = req.user.id;
  const product = await createProducts(req);
  res.status(201).json({
    success: true,
    product,
  });
});

//Get all products
export const getAllProducts = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 5;
  const productCount = await getCount();
  const apifeature = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);
  const products = await apifeature.query;
  res.status(200).json({
    success: true,
    products,
    productCount,
  });
});

//Admin update
export const updateProduct = catchAsyncErrors(async (req, res, next) => {
  const searchProduct = await searchProducts(req.params.id);
  if (!searchProduct) {
    return next(new ErrorHandler("Product does not exists", 500));
  }
  const updateProduct = await updateProducts(req.params.id, req.body);
  res.status(201).json({
    success: true,
    updateProduct,
  });
});

//Admin delete
export const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const searchProduct = await searchProducts(req.params.id);
  if (!searchProduct) {
    return next(new ErrorHandler("Product does not exists", 500));
  }
  const deleteProduct = await deleteProducts(searchProduct);
  return res.status(200).json({
    success: true,
    message: "Product deleted",
  });
});

//Get a product details
export const getProductDetail = catchAsyncErrors(async (req, res, next) => {
  const searchProduct = await searchProducts(req.params.id);
  if (!searchProduct) {
    return next(new ErrorHandler("Product does not exists", 500));
  }
  res.status(200).json({
    success: true,
    searchProduct,
  });
});
