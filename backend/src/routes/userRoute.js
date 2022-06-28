import { Router } from "express";
import {
  loginUser,
  logout,
  registerUser,
  forgotPassword,
  resetPassword,
} from "../controllers/userControllers.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
export default router;
