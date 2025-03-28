const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    APP_NAME: process.env.APP_NAME,
    BASE_URL: process.env.BASE_URL,
    CLIENT_URL: process.env.CLIENT_URL,
    PORT: process.env.PORT,
    DOMAIN_SWAGGER: process.env.DOMAIN_SWAGGER, //Swagger
    URI_DB: process.env.URI_DB, //MongoDB
    NODE_ENV: process.env.NODE_ENV || "development",

    //JWT
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    JWT_ACCESS_EXPIRY: process.env.JWT_ACCESS_EXPIRY,
    JWT_REFRESH_EXPIRY: process.env.JWT_REFRESH_EXPIRY,

    //CLOUDINARY
    CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,

    //EMAIL
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
    
    //REDIS
    REDIS_HOST: process.env.REDIS_HOST,
    REDIS_PORT: process.env.REDIS_PORT,
}