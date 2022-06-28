import { Router } from "express";
import { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetail} from '../controllers/productController.js';
import { isAuthenticatedUser, authorizeRoles } from "../middleware/auth.js";

const router = Router();

router.route("/product").get(getAllProducts);

router.route("/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct);

router.route("/update/:id").patch(isAuthenticatedUser,authorizeRoles("admin"),updateProduct);

router.route("/delete/:id").delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct);

router.route("/get/:id").get(getProductDetail);
export default router;