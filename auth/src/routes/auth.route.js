import express from "express";
import passport from "passport"

import * as authController from "../controllers/auth.controller.js";
import * as validators from "../validators/validators.js";

const router = express.Router();

// Register >> POST /api/auth => /register
router.post(
  "/register",
  validators.registerUserRules,
  authController.registerUser,
);

// Route to initiate Google OAuth flow
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }) );



// Callback route that Google will redirect to after authentication
router.get("/google/callback", passport.authenticate("google", { session: false }), authController.googleAuthCallback);




// // Login >> POST /api/auth => /login
// router.post("/login", validators.loginUserRules, authController.loginUser);

// // Current User >> GET /api/auth => /me
// router.get("/me", authController.getCurrentUser);

// // Logout >> POST /api/auth => /logout
// router.post("/logout", authController.logoutUser);

export default router;
