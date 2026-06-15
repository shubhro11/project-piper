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
    .bail()
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
    .bail()
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

  validateErrorResponse,
];


const isFalseValue = (value) => {
  return value === false || value === "false" || value === 0 || value === "0";
};

export const upgradeArtistRules = [
  body("isStageNameSameAsFullName")
    .exists({ checkFalsy: false })
    .withMessage("isStageNameSameAsFullName is required")
    .bail()
    .isBoolean()
    .withMessage("isStageNameSameAsFullName must be true or false")
    .bail()
    .toBoolean(),

  body("stageName")
    .if((value, { req }) => {
      return isFalseValue(req.body.isStageNameSameAsFullName);
    })
    .trim()
    .notEmpty()
    .withMessage("Stage name is required when it is different from your name")
    .bail()
    .isString()
    .withMessage("Stage name must be a string")
    .bail()
    .isLength({ min: 2, max: 50 })
    .withMessage("Stage name must be between 2 and 50 characters"),

  validateErrorResponse,
];


export const enablePasswordRules = [
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .bail()
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


  validateErrorResponse,
]