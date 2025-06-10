import { Router } from "express";
import { getAllEngineers, loginUser, logoutUser, updateUser } from "../controllers/userController.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getCurrentUser } from "../controllers/userController.js";


const router = Router();


router.route("/login").post(loginUser);
router.route("/profile").get(verifyJWT, getCurrentUser)
router.route("/logout").post(logoutUser)
router.route("/:id").put(updateUser);
router.route("/").get( getAllEngineers)

export default router;