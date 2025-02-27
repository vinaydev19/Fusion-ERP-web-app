import {
  changeCurrentPassword,
  emailVerification,
  getCurrentUser,
  profilePicUpdate,
  refreshAccessToken,
  resetPassword,
  resetPasswordEmailVerfication,
  updateAccountDetails,
  userLogin,
  userLogout,
  userRegister,
  userVerification,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { Router } from "express";
import verifyJWT from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(upload.single("profilePic"), userRegister);
router.route("/verify-user").post(userVerification);
router.route("/login").post(userLogin);
router.route("/verify-email").post(emailVerification);
router
  .route("/reset-password-email-verfication")
  .post(resetPasswordEmailVerfication);
router.route("/reset-password").post(resetPassword);

//secured routes
router.route("/logout").post(verifyJWT, userLogout);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/refresh-token").post(verifyJWT, refreshAccessToken);
router.route("/get-current-user").post(verifyJWT, getCurrentUser);
router.route("/update-account-details").post(verifyJWT, updateAccountDetails);
router
  .route("/update-profilepic")
  .patch(verifyJWT, upload.single("profilePic"), profilePicUpdate);

export default router;
