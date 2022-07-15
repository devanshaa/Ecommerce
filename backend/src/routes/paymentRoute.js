import express from "express";
import { processPayment,sendStripeApiKey } from "../controllers/paymentController.js"
const router = express.Router();
import { isAuthenticatedUser } from "../middleware/auth.js";

router.route("/process").post(isAuthenticatedUser, processPayment);

router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);

export default router;
