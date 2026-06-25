import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { publishToQueue } from "../broker/rabbit.js";
import config from "../config/config.js";
import userModel from "../models/user.model.js";

// Register User
export async function registerUser(req, res) {
  const {
    fullName: { firstName, lastName },
    email,
    password,
  } = req.body;

  try {
    // Check whether user already exists
    const userAlreadyExists = await userModel.findOne({ email });

    if (userAlreadyExists) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    // Password Hashing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Add user to db
    const user = await userModel.create({
      fullName: { firstName, lastName },
      email,
      password: hashedPassword,
    });

    // Generating Token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        fullName: user.fullName,
      },
      config.JWT_SECRET,
      { expiresIn: "2d" },
    );

    await publishToQueue("user_created", {
      id: user._id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    });

    res.cookie("piper_token", token);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

// Register with Google Oauth
export async function googleAuthCallback(req, res) {
  const user = req.user;
  const frontendUrl = "http://localhost:5173";

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 2 * 24 * 60 * 60 * 1000,
  };

  try {
    const flow = req.googleAuthFlow;

    const userExists = await userModel.findOne({
      $or: [{ email: user.emails[0].value }, { googleId: user.id }],
    });

    /* Google Register Flow */
    if (flow === "register") {
      // Account exists already: do not log them in
      if (userExists) {
        return res.redirect(`${frontendUrl}/signup?googleAuth=already_exists`);
      }

      const newUser = await userModel.create({
        email: user.emails[0].value,
        googleId: user.id,
        fullName: {
          firstName: user.name.givenName,
          lastName: user.name.familyName,
        },
        isVerified: true,
        role: "user",
      });

      
      const token = jwt.sign({ 
        id: newUser._id, 
        role: newUser.role, 
        fullName: newUser.fullName 
      },
        config.JWT_SECRET,
        { expiresIn: "2d" },
      );

      await publishToQueue("user_created", {
        id: newUser._id,
        email: newUser.email,
        fullName: newUser.fullName,
        role: newUser.role,
      });

      res.cookie("piper_token", token);

      return res.redirect(
        `${frontendUrl}/account-type?googleAuth=register`,
      ); // redirects to your frontend URL for account type
    }


    /* Google login Flow */
    if (flow === "login") {
      // Account does not exist: do not register them
      if (!userExists) {
        return res.redirect(`${frontendUrl}/signin?googleAuth=not_found`);
      }

      if (!userExists.googleId) {
        userExists.googleId = user.id;
      }

      userExists.isVerified = true;
      await userExists.save();

      const tokenPayload = {
        id: userExists._id,
        role: userExists.role,
        fullName: userExists.fullName,
      };

      if (userExists.role === "artist" && userExists.stageName) {
        tokenPayload.stageName = userExists.stageName;
      }

      const token = jwt.sign(tokenPayload, config.JWT_SECRET, {
        expiresIn: "2d",
      });

      res.cookie("piper_token", token, cookieOptions);

      if (userExists.role === "artist") {
        return res.redirect(`${frontendUrl}/artist/dashboard?googleAuth=login`);
      }

      return res.redirect(`${frontendUrl}/dashboard?googleAuth=login`);
    }

    return res.redirect(`${frontendUrl}/signin?googleAuth=invalid_flow`);

  } catch (error) {
    console.error("Google OAuth callback error:", error);

    return res.redirect(
      "http://localhost:5173/signin?googleAuth=failed",
    );
    // return res.status(500).json({
    //   success: false,
    //   message: "Internal Server Error",
    //   error: error.message,
    // });
  }
}

export async function completeOnboarding(req, res) {}

// Upgrade to Artist
export async function becomeArtist(req, res) {
  try {
    const { isStageNameSameAsFullName, stageName } = req.body;

    const user = await userModel.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role === "artist") {
      return res.status(409).json({
        success: false,
        message: "Account is already an artist account",
      });
    }

    user.role = "artist";
    user.isStageNameSameAsFullName = isStageNameSameAsFullName;

    if (isStageNameSameAsFullName === false) {
      user.stageName = stageName.trim();
    }

    await user.save();

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        stageName: user.stageName,
        fullName: user.fullName,
      },
      config.JWT_SECRET,
      { expiresIn: "2d" },
    );

    res.cookie("piper_token", token);

    return res.status(200).json({
      success: true,
      message: "Successfully updated Account role as Artist",
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        stageName: user.stageName,
        isStageNameSameAsFullName: user.isStageNameSameAsFullName,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

export async function enablePassword(req, res) {
  try {
    const { password } = req.body;

    const user = await userModel.findById(req.user.id).select("+password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.password) {
      return res.status(400).json({
        success: false,
        message: "Password login is already enabled for this account.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    await user.save();

    return res.status(200).json({
      success: true,
      message:
        "Password login enabled successfully. You can now login using Google or email and password.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

// Login user
export async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    // Google account trying password login
    if (user.googleId && !user.password) {
      return res.status(400).json({
        success: false,
        message:
          "This account was created using Google. Please continue with Google Sign-In.",
      });
    }

    const vaildPassword = await bcrypt.compare(password, user.password);

    if (!vaildPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const tokenPayload = {
      id: user._id,
      email: user.email,
      role: user.role,
      fullName: user.fullName,
    };

    if (user.role === "artist") {
      tokenPayload.stageName = user.stageName;
    }

    const token = jwt.sign(tokenPayload, config.JWT_SECRET, {
      expiresIn: "2d",
    });

    res.cookie("piper_token", token);

    return res.status(200).json({
      success: true,
      message: "User Logged in successfully",
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        stageName: user.stageName,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

// Current User
export async function getCurrentUser(req, res) {
  try {
    return res.status(200).json({
      success: true,
      message: "Current User Fetched Successfully",
      user: req.user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}

// Logout user
export async function logoutUser(req, res) {
  const token = req.cookies.token;

  try {
    res.clearCookie("piper_token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "User Logged Out Successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
}
