import express from "express";
import passport from "passport"

import * as authController from "../controllers/auth.controller.js";
import * as validators from "../validators/validators.js";
import * as middlewares from "../middlewares/auth.middleware.js";


const router = express.Router();

// Register >> POST /api/auth => /register
router.post(
  "/register",
  validators.registerUserRules,
  authController.registerUser,
);


// Login >> POST /api/auth => /login
router.post("/login", validators.loginUserRules, authController.loginUser);


// Current User >> GET /api/auth => /me
router.get("/me", middlewares.authMiddleware, authController.getCurrentUser);


// Logout >> POST /api/auth => /logout
router.post("/logout", authController.logoutUser);


// Route to initiate Google OAuth flow
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }) );


// Callback route that Google will redirect to after authentication
router.get("/google/callback", passport.authenticate("google", { session: false }), authController.googleAuthCallback);

export default router;
