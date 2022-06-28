import getProducts, {
  createProducts,
  getCount,
  searchProducts,
  updateProducts,
  deleteProducts,
  getProductById,
} from "../dao/productDao.js";
import ErrorHander from "../utils/errorhander.js";
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

// Get All Product (Admin)
export const getAdminProducts = catchAsyncErrors(async (req, res, next) => {
  const products = await getProducts();

  res.status(200).json({
    success: true,
    products,
  });
});

//Admin update
export const updateProduct = catchAsyncErrors(async (req, res, next) => {
  const searchProduct = await searchProducts(req.params.id);
  if (!searchProduct) {
    return next(new ErrorHander("Product does not exists", 500));
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
    return next(new ErrorHander("Product does not exists", 500));
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
    return next(new ErrorHander("Product does not exists", 500));
  }
  res.status(200).json({
    success: true,
    searchProduct,
  });
});

// Create New Review or Update the review
export const createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await getProductById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

// Get All Reviews of a product
export const getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await getProductById(req.query.id);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

// Delete Review
export const deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await getProductById(req.query.productId);

  if (!product) {
    return next(new ErrorHander("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });
});
