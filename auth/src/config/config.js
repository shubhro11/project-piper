import { config as dotenvConfig } from 'dotenv';

dotenvConfig()

const _config = {
    SERVICE_PORT: process.env.SERVICE_PORT,
    MONGODB_URI: process.env.MONGODB_URI
}


export default _config