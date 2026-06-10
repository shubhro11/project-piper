import { config as dotenvConfig } from "dotenv";

dotenvConfig();

const _config = {
  SERVICE_PORT: process.env.SERVICE_PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  RABBITMQ_URI: process.env.RABBITMQ_URI
};

export default Object.freeze(_config);
