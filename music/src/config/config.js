import { config as dotenvConfig } from "dotenv";

dotenvConfig();

const _config = {
  SERVICE_PORT: process.env.SERVICE_PORT,

  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,

  RABBITMQ_URI: process.env.RABBITMQ_URI,

  AWS_REGION: process.env.AWS_REGION,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  S3_BUCKET: process.env.S3_BUCKET,
};

export default Object.freeze(_config);
