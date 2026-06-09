import jwt from "jsonwebtoken";
import config from "../config/config.js"

export function authMiddleware(req, res, next) {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized Access - Missing Token",
    });
  }

  try {

    const decoded = jwt.verify(token, config.JWT_SECRET);

    const user = decoded;
    req.user = user;
    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized Access",
    });
  }
}
