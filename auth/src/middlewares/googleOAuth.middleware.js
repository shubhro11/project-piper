import jwt from "jsonwebtoken";
import passport from "passport";
import config from "../config/config.js"

const frontendUrl = "http://localhost:5173";

const googleStateCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 10 * 60 * 1000,
};

export const beginGoogleAuth = (req, res, next) => {
  const { flow } = req.query;

  if (!["login", "register"].includes(flow)) {
    return res.redirect(`${frontendUrl}/signin?googleAuth=invalid_flow`);
  }

  const state = jwt.sign({ flow }, config.JWT_SECRET, {
    expiresIn: "10m",
  });

  res.cookie("google_oauth_state", state, googleStateCookieOptions);

  return passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
    state,
  })(req, res, next);
};

export const verifyGoogleFlow = (req, res, next) => {
  try {
    const stateFromGoogle = req.query.state;
    const stateFromCookie = req.cookies.google_oauth_state;

    if (!stateFromGoogle || stateFromGoogle !== stateFromCookie) {
      res.clearCookie("google_oauth_state", googleStateCookieOptions);

      return res.redirect(
        `${frontendUrl}/signin?googleAuth=invalid_state`,
      );
    }

    const { flow } = jwt.verify(stateFromGoogle, config.JWT_SECRET);

    if (!["login", "register"].includes(flow)) {
      throw new Error("Invalid Google OAuth flow");
    }

    req.googleAuthFlow = flow;

    res.clearCookie("google_oauth_state", googleStateCookieOptions);

    next();
  } catch (error) {
    res.clearCookie("google_oauth_state", googleStateCookieOptions);

    return res.redirect(
      `${frontendUrl}/signin?googleAuth=invalid_state`,
    );
  }
};
