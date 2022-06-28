import { Router } from "express";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetail,
  createProductReview,
  deleteReview,
  getProductReviews,
  getAdminProducts
} from "../controllers/productController.js";
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";

const router = Router();

router.route("/product").get(getAllProducts);

router
  .route("/admin/new")
  .post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

router
  .route("/admin/update/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct);

router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

router
  .route("/admin/delete/:id")
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router.route("/get/:id").get(getProductDetail);

router.route("/review").put(isAuthenticatedUser, createProductReview);
router
  .route("/review")
  .get(getProductReviews)
  .delete(isAuthenticatedUser, deleteReview);
export default router;
