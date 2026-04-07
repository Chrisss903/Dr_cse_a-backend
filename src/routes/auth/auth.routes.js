import express from "express";
import {
  signInController,
  signUpController,
} from "../../controllers/auth/auth.controllers.js";
import { validateSignup,validateSignin } from "../../middlewares/auth/auth.middleware.js"

const router = express.Router();

router.post("/signup", validateSignup , signUpController);
router.post("/signin", validateSignin, signInController);

export default router;
