import { body, validationResult } from "express-validator";

const validateErrorResponse = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ success: false, errors: errors.array() });
  next();
};

export const validateTrackUpload = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Title must be between 2 and 100 characters"),

  body("genre")
    .trim()
    .notEmpty()
    .withMessage("Genre is required")
    .isIn([
      "Pop",
      "Rock",
      "Hip-Hop",
      "Rap",
      "R&B",
      "Soul",
      "Jazz",
      "Blues",
      "Country",
      "Folk",
      "Classical",
      "EDM",
      "Metal",
      "Reggae",
      "Latin",
      "Bollywood",
      "Indian Classical",
      "Indian Pop",
      "Indian Film Pop",
      "Punjabi",
      "Devotional",
      "Alternative",
      "Instrumental",
      "Soundtrack",
      "Other",
    ])
    .withMessage("Invalid genre"),

  body("subGenre")
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage("Subgenre cannot exceed 50 characters"),

  body("language")
    .trim()
    .notEmpty()
    .withMessage("Language is required")
    .isIn([
      "English",
      "Hindi",
      "Bengali",
      "Punjabi",
      "Tamil",
      "Telugu",
      "Malayalam",
      "Kannada",
      "Marathi",
      "Gujarati",
      "Odia",
      "Assamese",
      "Urdu",
      "Sanskrit",
      "Spanish",
      "French",
      "German",
      "Italian",
      "Portuguese",
      "Russian",
      "Japanese",
      "Korean",
      "Chinese",
      "Arabic",
      "Turkish",
      "Other",
    ])
    .withMessage("Invalid language"),

  body("isExplicit")
    .optional()
    .isBoolean()
    .withMessage("Explicit flag must be true or false"),

  body("releaseYear")
    .trim()
    .notEmpty()
    .withMessage("Year is required")
    .custom((value) => {
      const year = Number(value);

      if (
        !Number.isInteger(year) ||
        year < 1900 ||
        year > new Date().getFullYear() + 1
      ) {
        throw new Error(
          `Year must be between 1900 and ${new Date().getFullYear() + 1}`,
        );
      }

      return true;
    }),

  validateErrorResponse,
];
