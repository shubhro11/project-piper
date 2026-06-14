import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import config from "../config/config.js";
import userModel from "../models/user.model.js";
import { publishToQueue } from "../broker/rabbit.js";

// Register User
export async function registerUser(req, res) {
  const {
    fullName: { firstName, middleName, lastName },
    email,
    password,
    role,
    artistProfile: {stageName, bio}
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
      fullName: { firstName, middleName, lastName },
      email,
      password: hashedPassword,
      role: role || "user", // Default role is "user"
      artistProfile: {stageName, bio}
    });

    // Generating Token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
        fullName: user.fullName
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

    
    res.cookie("token", token);

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
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// Register with Google Oauth
export async function googleAuthCallback(req, res) {
  const user = req.user;

  try {
    const userExists = await userModel.findOne({
      $or: [{ email: user.emails[0].value }, { googleId: user.id }],
    });

    // If User exists, then user will be logged
    if (userExists) {
      const token = jwt.sign(
        { id: userExists._id, role: userExists.role, fullName: userExists.fullName },
        config.JWT_SECRET,
        { expiresIn: "2d" },
      );

      res.cookie("token", token);

      return res.redirect('http://localhost:5173'); // redirects to your frontend URL

      // return res.status(200).json({
      //   success: true,
      //   message: "User Logged in successfully",
      //   user: {
      //     id: userExists._id,
      //     email: userExists.email,
      //     fullName: userExists.fullName,
      //     role: userExists.role,
      //   },
      // });
    }

    // If User DOES NOT EXIST,then register user
    const newUser = await userModel.create({
      email: user.emails[0].value,
      googleId: user.id,
      fullName: {
        firstName: user.name.givenName,
        lastName: user.name.familyName,
      },
    });

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role, fullName: newUser.fullName, },
      config.JWT_SECRET,
      { expiresIn: "2d" },
    );

    await publishToQueue("user_created", {
      id: newUser._id,
      email: newUser.email,
      fullName: newUser.fullName,
      role: newUser.role,
    });

    res.cookie("token", token);

    return res.redirect('http://localhost:5173'); // redirects to your frontend URL

    // return res.status(201).json({
    //   success: true,
    //   message: "User registered successfully",
    //   user: {
    //     id: newUser._id,
    //     email: newUser.email,
    //     fullName: newUser.fullName,
    //     role: newUser.role,
    //   },
    // });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
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

    const vaildPassword = await bcrypt.compare(password, user.password);

    if (!vaildPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password",
      });
    }

    const token = jwt.sign({
      id: user._id,
      email: user.email,
      role: user.role,
      fullName: user.fullName
    }, config.JWT_SECRET, { expiresIn: "2d"});

    res.cookie("token", token)

    return res.status(200).json({
      success:true,
      message: "User Logged in successfully"
    })

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

// Current User
export async function getCurrentUser(req, res) {
  return res.status(200).json({
    success: true,
    message: "Current User Fetched Successfully",
    user: req.user,
  });
}

// Logout user
export async function logoutUser(req, res) {
  const token = req.cookies.token;

  try {

    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return res.status(200).json({
      success: true,
      message: "User Logged Out Successfully",
    });
    
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
