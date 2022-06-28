// const Order = require("../models/orderModel");
// const Product = require("../models/productModel");
// const ErrorHander = require("../utils/errorhander");
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import {
  createOrder,
  getOrder,
  myOrder,
  getAllOrder,
  updateOrders,
  delOrder,
} from "../dao/orderDao.js";

// Create new Order
export const newOrder = catchAsyncErrors(async (req, res, next) => {
  await createOrder(req, res, next);
});

// get Single Order
export const getSingleOrder = catchAsyncErrors(async (req, res, next) => {
  await getOrder(req, res, next);
});

// get logged in user  Orders
export const myOrders = catchAsyncErrors(async (req, res, next) => {
  await myOrder(req, res, next);
});

// get all Orders -- Admin
export const getAllOrders = catchAsyncErrors(async (req, res, next) => {
  await getAllOrder(req, res, next);
});

// update Order Status -- Admin
export const updateOrder = catchAsyncErrors(async (req, res, next) => {
  await updateOrders(req, res, next);
});

// delete Order -- Admin
export const deleteOrder = catchAsyncErrors(async (req, res, next) => {
  await delOrder(req, res, next);
});

export default newOrder;
