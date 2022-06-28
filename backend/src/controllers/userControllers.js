import ErrorHander from "../utils/errorhander.js";
import catchAsyncErrors from "../middleware/catchAsyncErrors.js";
import { createUser, getUser, userLog, forgotPasswords, resetPass} from "../dao/userDao.js";
import User from '../models/userModels.js'

//Registration of user
export const registerUser = catchAsyncErrors( async(req, res, next) => {
    await createUser(req, res, next);
});


//Login of user
export const loginUser = catchAsyncErrors( async(req, res, next) => {
    await getUser(req, res, next);
});

//Logout of user
export const logout = catchAsyncErrors(async(req,res, next) =>{
    await userLog(req, res, next);
})


//Forgot Password
export const forgotPassword = catchAsyncErrors(async(req,res, next) =>{
    await forgotPasswords(req, res, next);
})

// Reset Password
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
    await resetPass(req, res, next);
});