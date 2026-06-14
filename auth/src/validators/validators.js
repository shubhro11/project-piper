import { body, validationResult } from "express-validator";

const validateErrorResponse = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ success: false, errors: errors.array() });
  next();
};

export const registerUserRules = [
  body("fullName.firstName")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isString()
    .withMessage("First name must be a string"),

  // Optional middle name
  body("fullName.middleName")
    .optional({ checkFalsy: true }) // Skips validation if it is null, undefined, or an empty string
    .trim()
    .isString()
    .withMessage("Middle name must be a string"),

  body("fullName.lastName")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .isString()
    .withMessage("Last name must be a string"),

  body("email")
    .trim()

    .notEmpty()
    .withMessage("Email is required")
    .bail()

    .isEmail({
      allow_display_name: false,
      require_tld: true,
      ignore_max_length: false,
    })
    .withMessage("Invalid Email Address")
    .bail()

    .custom((value) => {
      // Defensive type check
      if (typeof value !== "string") throw new Error("Email is malformed");

      // Reject consecutive dots
      if (value.includes("..")) throw new Error("Email is malformed");

      // Extra defensive check
      if (!value.includes("@")) throw new Error("Email is malformed");

      const [localPart] = value.split("@");

      // Reject leading/trailing dots
      if (localPart.startsWith(".") || localPart.endsWith("."))
        throw new Error("Email is malformed");

      return true;
    })

    .normalizeEmail({
      all_lowercase: true,
      gmail_remove_dots: false,
      gmail_remove_subaddress: false,
    }),

  body("password")
    .if((value, { req }) => !req.body.googleId)
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least 1 uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least 1 lowercase letter")
    .matches(/\d/)
    .withMessage("Password must contain at least 1 number")
    .matches(/[@$!%*?&^#()[\]{}\-_=+|\\/.,:;"'<>~`]/)
    .withMessage("Password must contain at least 1 special character"),

  body("role")
    .optional()
    .isIn(["user", "artist"])
    .withMessage("Role must be either 'user' or 'artist'"),

  validateErrorResponse,
];

export const loginUserRules = [
  body("email")
    .trim()

    .notEmpty()
    .withMessage("Email is required")
    .bail()

    .isEmail({
      allow_display_name: false,
      require_tld: true,
      ignore_max_length: false,
    })
    .withMessage("Invalid Email Address")
    .bail()

    .custom((value) => {
      // Defensive type check
      if (typeof value !== "string") throw new Error("Email is malformed");

      // Reject consecutive dots
      if (value.includes("..")) throw new Error("Email is malformed");

      // Extra defensive check
      if (!value.includes("@")) throw new Error("Email is malformed");

      const [localPart] = value.split("@");

      // Reject leading/trailing dots
      if (localPart.startsWith(".") || localPart.endsWith("."))
        throw new Error("Email is malformed");

      return true;
    })

    .normalizeEmail({
      all_lowercase: true,
      gmail_remove_dots: false,
      gmail_remove_subaddress: false,
    }),

  body("password")
    .if((value, { req }) => !req.body.googleId)
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()[\]{}\-_=+|\\/.,:;"'<>~`]).+$/,
    )
    .withMessage(
      "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character",
    ),
    
    body("artistProfile.stageName")
    .trim()
    .notEmpty()
    .withMessage("Stage Name is required")
    .isString()
    .withMessage("Stage name must be a string"),

  validateErrorResponse,
];
