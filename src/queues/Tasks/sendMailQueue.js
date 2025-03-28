const sendMail = require("../../services/emailService.js");
const dotenv = require("dotenv");

dotenv.config();
module.exports = async function emailTask(job) {
    console.log(`Dang gui email den ${job.data.email}...`);    
    try {
        await sendMail({
            from: process.env.EMAIL_USER,
            to: job.data.email,
            subject: job.data.subject,
            text: job.data.text,
            html: job.data.html
        });

        console.log(`Email da duoc gui den ${job.data.email}`);
    } catch (error) {
        console.log(`Gui email den ${job.data.email} that bai`, error);
    }
    return true;
};