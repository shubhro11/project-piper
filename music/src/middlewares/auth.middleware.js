import jwt from "jsonwebtoken";
import config from "../config/config.js";

export function artistAuthMiddleware(req, res, next) {
  const token = req.cookies?.piper_token || (req.headers?.authorization?.startsWith("Bearer ") ? req.headers.authorization.split(" ")[1] : null);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized Access: No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);

    if (decoded.role !== "artist") {
      return res.status(403).json({
        success: false,
        message: "Forbidden: Insufficient Permissions",
      });
    }

    const user = decoded;
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Unauthorized Access: Invalid Token",
    });
  }
}

export function userAuthMiddleware(req, res, next) {
  const token = req.cookies?.piper_token || (req.headers?.authorization?.startsWith("Bearer ") ? req.headers.authorization.split(" ")[1] : null);

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized Access: No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET);

    const user = decoded;
    req.user = user;
    next();

  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Unauthorized Access: Invalid Token",
    });
  }
}


