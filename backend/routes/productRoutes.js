import express from "express";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.js";
import formidable from "express-formidable";
const router = express.Router();
import {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProductById,
  fetchProduct,
  fetchAllProducts,
  addProductReviw,
  fetchTopProducts,
  fetchNewProducts,
  fetchFilteredPoducts,
} from "../controllers/productController.js";

import checkId from "../middlewares/checkId.js";

router
  .route("/")
  .post(authenticate, authorizeAdmin, formidable(), addProduct)
  .get(fetchProduct);

router.route("/allproducts").get(fetchAllProducts);
router.route("/:id/reviews").post(authenticate, checkId, addProductReviw);
router.route("/top").get(fetchTopProducts);
router.route("/new").get(fetchNewProducts);
router
  .route("/:id")
  .put(authenticate, authorizeAdmin, formidable(), updateProductDetails)
  .delete(authenticate, authorizeAdmin, removeProduct)
  .get(fetchProductById);
router.route("/filtered-products").get(fetchFilteredPoducts);

export default router;
