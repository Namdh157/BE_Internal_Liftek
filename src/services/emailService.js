const transporter = require("../config/nodeMailer.js");

const sendMail = async ({ to, subject, text, html }) => {
    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
            html
        });

        return info;

    } catch (error) {
        console.error(error);
        throw new Error("Gui mail that bai");
    }
}

module.exports = sendMail;