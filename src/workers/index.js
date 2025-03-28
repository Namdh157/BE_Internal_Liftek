const { Worker } = require("bullmq");
const dotenv = require("dotenv");
const { emailQueue } = require("../queues/index.js");
const emailTask = require("../queues/Tasks/sendMailQueue.js");

dotenv.config();

const connection = {
    host: process.env.REDIS_HOST || "localhost",
    port: process.env.REDIS_PORT || 6379, 
};

new Worker(emailQueue.name, emailTask, { connection });