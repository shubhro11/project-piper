import { config as dotenvConfig } from "dotenv";

dotenvConfig();

const _config = {
  SERVICE_PORT: process.env.SERVICE_PORT,
  JWT_SECRET: process.env.JWT_SECRET,

  EMAIL_USER: process.env.EMAIL_USER,
  BREVO_SMTP_HOST: process.env.BREVO_SMTP_HOST,
  BREVO_SMTP_PORT: process.env.BREVO_SMTP_PORT,
  BREVO_SMTP_USER: process.env.BREVO_SMTP_USER,
  BREVO_SMTP_KEY: process.env.BREVO_SMTP_KEY,

  RABBITMQ_URI: process.env.RABBITMQ_URI,
};

export default Object.freeze(_config);
