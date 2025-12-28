import 'dotenv/config'

const ENV_MODE = process.env.NODE_ENV || 'development';
console.log(ENV_MODE);
const MONGODB_URI = ENV_MODE === 'test' ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI;
const config = {
    PORT: process.env.PORT,
    MONGODB_URI,
    ENV_MODE,
    JWT_SECRET: process.env.JWT_SECRET,
    ACCESS_TOKEN_EXPIRES: process.env.ACCESS_TOKEN_EXPIRES || '15m',
    REFRESH_TOKEN_DAYS: Number(process.env.REFRESH_TOKEN_DAYS) || 30,
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    CLIENT_URL: process.env.CLIENT_URL
}
export default config;