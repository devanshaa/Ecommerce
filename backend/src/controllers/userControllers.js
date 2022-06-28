import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import {
  createUser,
  getUser,
  userLog,
  forgotPasswords,
  resetPass,
  getUserDet,
  updatePass,
  updatePro,
  getAll,
  getSingle,
  updateRole,
  delUser,
} from "../dao/userDao.js";

//Registration of user
export const registerUser = catchAsyncErrors(async (req, res, next) => {
  await createUser(req, res, next);
});

//Login of user
export const loginUser = catchAsyncErrors(async (req, res, next) => {
  await getUser(req, res, next);
});

//Logout of user
export const logout = catchAsyncErrors(async (req, res, next) => {
  await userLog(req, res, next);
});

//Forgot Password
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  await forgotPasswords(req, res, next);
});

// Reset Password
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  await resetPass(req, res, next);
});

// Get User Detail
export const getUserDetails = catchAsyncErrors(async (req, res, next) => {
  await getUserDet(req, res, next);
});

// update User password
export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  await updatePass(req, res, next);
});

// update User Profile
export const updateProfile = catchAsyncErrors(async (req, res, next) => {
  await updatePro(req, res, next);
});

// Get all users(admin)
export const getAllUser = catchAsyncErrors(async (req, res, next) => {
  await getAll(req, res, next);
});

// Get single user (admin)
export const getSingleUser = catchAsyncErrors(async (req, res, next) => {
  await getSingle(req, res, next);
});

// update User Role -- Admin
export const updateUserRole = catchAsyncErrors(async (req, res, next) => {
  await updateRole(req, res, next);
});

// Delete User --Admin
export const deleteUser = catchAsyncErrors(async (req, res, next) => {
  await delUser(req, res, next);
});
