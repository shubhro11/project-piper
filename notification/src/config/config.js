import { config as dotenvConfig } from "dotenv";

dotenvConfig();

const _config = {
  SERVICE_PORT: process.env.SERVICE_PORT,

  JWT_SECRET: process.env.JWT_SECRET,

  GOOGLE_REFRESH_TOKEN: process.env.REFRESH_TOKEN,
  EMAIL_USER: process.env.EMAIL_USER,

  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

  RABBITMQ_URI: process.env.RABBITMQ_URI,
};

export default Object.freeze(_config);
