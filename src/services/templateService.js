const dotenv = require("dotenv");

dotenv.config();
const getVerificationEmailTemplate = (link) => {
    return `
        <!DOCTYPE html>
        <html lang="vi">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Xác minh tài khoản</title>
            <style>
                body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
                .container { max-width: 600px; margin: 20px auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); text-align: center; }
                .header { background: #007bff; color: #ffffff; padding: 15px; font-size: 20px; font-weight: bold; border-radius: 8px 8px 0 0; }
                .content { padding: 20px; font-size: 16px; color: #333; }
                .btn { display: inline-block; margin-top: 20px; padding: 12px 25px; font-size: 16px; color: #ffffff; background: #007bff; text-decoration: none; border-radius: 5px; font-weight: bold; }
                .footer { margin-top: 20px; font-size: 14px; color: #777; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">Xác minh tài khoản của bạn</div>
                <div class="content">
                    <p>Xin chào,</p>
                    <p>Cảm ơn bạn đã đăng ký tài khoản. Vui lòng nhấn vào nút bên dưới để xác minh tài khoản của bạn:</p>
                    <a href="${link}" class="btn">Xác minh tài khoản</a>
                    <p>Nếu bạn không thực hiện yêu cầu này, hãy bỏ qua email này.</p>
                </div>
                <div class="footer">© 2024 LifeTex_TTS. Mọi quyền được bảo lưu.</div>
            </div>
        </body>
        </html>
    `;
};

const getResetPasswordEmailTemplate = (resetUrl) => {
    return `
        <!DOCTYPE html>
        <html lang="vi">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Cấp lại mật khẩu</title>
            <style>
                body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 0; }
                .container { max-width: 600px; margin: 20px auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); text-align: center; }
                .header { background: #007bff; color: #ffffff; padding: 15px; font-size: 20px; font-weight: bold; border-radius: 8px 8px 0 0; }
                .content { padding: 20px; font-size: 16px; color: #333; }
                .btn { display: inline-block; margin-top: 20px; padding: 12px 25px; font-size: 16px; color: #ffffff; background: #007bff; text-decoration: none; border-radius: 5px; font-weight: bold; }
                .footer { margin-top: 20px; font-size: 14px; color: #777; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">Cấp lại mật khẩu</div>
                <div class="content">
                    <p>Xin chào,</p>
                    <p>Bạn đã yêu cầu cấp lại mật khẩu. Vui lòng nhấn vào nút bên dưới để cấp lại mật khẩu:</p>
                    <a href="${resetUrl}" class="btn">Cấp lại mật khẩu</a>
                    <p>Nếu bạn không thực hiện yêu cầu này, hãy bỏ qua email này.</p>
                </div>
                <div class="footer">© 2024 LifeTex_TTS. Mọi quyền được bảo lưu.</div>
            </div>
        </body>
        </html>
    `;
}

module.exports = {
    getVerificationEmailTemplate,
    getResetPasswordEmailTemplate,
};