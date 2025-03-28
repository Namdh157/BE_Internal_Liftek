const { Queue } = require("bullmq");
const dotenv = require("dotenv");

dotenv.config();

const connection = {
    host: process.env.REDIS_HOST || "localhost",
    port: process.env.REDIS_PORT || 6379,
};

const emailQueue = new Queue("emailQueue", { connection });

module.exports = { emailQueue };