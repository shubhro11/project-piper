import express from "express";
import passport from "passport"

import * as authController from "../controllers/auth.controller.js";
import * as validators from "../validators/validators.js";
import * as middlewares from "../middlewares/auth.middleware.js";
import {
  beginGoogleAuth,
  verifyGoogleFlow,
} from "../middlewares/googleOAuth.middleware.js";


const router = express.Router();

// Register >> POST /api/auth => /register
router.post(
  "/register",
  validators.registerUserRules,
  authController.registerUser,
);


// Login >> POST /api/auth => /login
router.post("/login", validators.loginUserRules, authController.loginUser);


// Upgrade to Artist >> PATCH /api/auth => /become-artist
router.patch("/become-artist", middlewares.authMiddleware, validators.upgradeArtistRules, authController.becomeArtist);


// Enable Password Login >> PATCH /api/auth => /enable-password
router.patch("/enable-password", middlewares.authMiddleware, validators.enablePasswordRules, authController.enablePassword
);


// Current User >> GET /api/auth => /me
router.get("/me", middlewares.authMiddleware, authController.getCurrentUser);


// Logout >> POST /api/auth => /logout
router.post("/logout", authController.logoutUser);


// Route to initiate Google OAuth flow
router.get("/google", beginGoogleAuth);


// Callback route that Google will redirect to after authentication
router.get("/google/callback", passport.authenticate("google", { session: false, failureRedirect: "http://localhost:5173/signin?googleAuth=failed", }), verifyGoogleFlow, authController.googleAuthCallback);

export default router;
