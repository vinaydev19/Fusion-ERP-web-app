import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  createProductItem,
  getAllProduct,
  getOneProduct,
  deleteProduct,
  updateProduct,
  updateProductImage,
} from "../controllers/products.controller.js";

const router = Router();

router
  .route("/create-product")
  .post(verifyJWT, upload.single("productImage"), createProductItem);
router.route("/get-all-product").get(verifyJWT, getAllProduct);
router.route("/get-one-product/:productDocsId").get(verifyJWT, getOneProduct);
router.route("/update-product/:productDocsId").patch(verifyJWT, updateProduct);
router.route("/delete-product/:productDocsId").delete(verifyJWT, deleteProduct);
router
  .route("update-product-image")
  .patch(verifyJWT, upload.single("productImage"), updateProductImage);

export default router;
