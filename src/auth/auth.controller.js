const User = require("../users/user.model.js");
const authValidation = require("./auth.validation.js");
const jwt = require("jsonwebtoken");
const env = require("../config/env.js");
const tokenUtils = require("../utils/tokenUtils.js");
const emailTemplate = require("../services/templateService.js");
const emailQueue = require("../queues/index.js");
const SuccessResponse = require("../utils/SuccessResponse.js");
const crypto = require("crypto");
const { sendMail } = require("../config/nodeMailer.js");

//đăng ký
exports.register = async (req, res, next) => {
  try {
    const { email, password, phone, userName } = req.body;
    const { error } = authValidation.signUpValidator.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return next(new Error(errors));
    }

    const userExists = await User.findOne({ email: email });
    if (userExists) {
      return next(new Error("Email đã tồn tại"));
    }

    const user = await User.create({
      email,
      password,
      phone,
      userName,
    });

    const verifyToken = jwt.sign({ id: user._id }, env.JWT_SECRET, {
      expiresIn: "30m",
    });

    //gui email
    const verificationLink = `${env.BASE_URL}/api/v1/auth/verify-email/${verifyToken}`;
    const emailContent =
      emailTemplate.getVerificationEmailTemplate(verificationLink);

    // use service send email
    sendMail({
      to: user.email,
      subject: "Xác thực email",
      text: "Xác thực email",
      html: emailContent,
    });

    // use worker send email
    // await emailQueue.emailQueue.add("sendEmail", {
    //     email: user.email,
    //     subject: "Xác thực email",
    //     text: "Xác thực emailabc",
    //     html: emailContent,
    // });
    new SuccessResponse(user).send(res);
  } catch (error) {
    return next(error);
  }
};
//xác thực email
exports.verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.params;
    const decode = jwt.verify(token, env.JWT_SECRET);
    if (!decode) return next(new Error("Token không hợp lệ"));

    const user = await User.findById(decode.id);
    if (!user) return next(new Error("User không tồn tại"));

    user.verified = true;
    await user.save();

    return new SuccessResponse(user).send(res);
  } catch (error) {
    return next(error);
  }
};
//đăng nhập
exports.login = async (req, res, next) => {
  try {
    //validate
    const { error } = authValidation.signInValidator.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return next(new Error(errors));
    }

    const { email, password } = req.body;

    // truy van user
    const user = await User.findOne({ email });

    // kiem tra user
    if (!user) return next(new Error("Email chưa đăng ký"));

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return next(new Error("Mật khẩu không đúng" + password));

    if (!user.verified) return next(new Error("Email chưa được xác thực"));

    // tao token
    const accessToken = tokenUtils.generateAccessToken(user);
    const refreshToken = tokenUtils.generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, //local
      sameSite: "strict",
    });

    user.password = undefined;

    return new SuccessResponse({
      accessToken: accessToken,
      tokenExpiry: env.JWT_ACCESS_EXPIRY,
      user: user,
    }).send(res);
  } catch (error) {
    return next(error);
  }
};
//làm mới token
exports.getNewAccessToken = async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) return next(new Error("Token không hợp lệ"));

  try {
    const decode = jwt.verify(refreshToken, env.JWT_REFRESH_SECRET);

    if (!decode) return next(new Error("Token không hợp lệ"));
  } catch (error) {
    return next(error);
  }
};
//đăng xuất
exports.logout = async (req, res, next) => {
  try {
    const id = req.user._id;
    const user = await User.findById(id);
    if (!user) return next(new Error("User không tồn tại"));

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false, // local
      sameSite: "strict",
    });
    return new SuccessResponse("Đăng xuất thành công").send(res);
  } catch (error) {
    return next(error);
  }
};
// gửi mail mat khau mới
exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findByEmailOrPhone(email);

    if (!user) return next(new Error("Email chưa đăng ký"));

    const resetToken = user.getResetPasswordToken();
    await user.save();

    const isTesting = process.env.NODE_ENV === "development"; // Kiểm tra đang test không
    const url_client = isTesting
      ? `${env.DOMAIN_SWAGGER}:${env.PORT}/api-docs/#/Auth/post_auth_reset-password_token_${resetToken}`
      : `${env.CLIENT_URL}/reset-password?token=${resetToken}`;

    const contextMail = emailTemplate.getResetPasswordEmailTemplate(url_client);

    await emailQueue.emailQueue.add("sendEmail", {
      email: user.email,
      subject: "Cấp lại mật khẩu",
      html: contextMail,
    });

    return new SuccessResponse(
      "Link đặt lại mật khẩu đã được gửi qua email"
    ).send(res);
  } catch (error) {
    return next(error);
  }
};
//  đặt lại mật khẩu bằng
exports.resetPassword = async (req, res, next) => {
  try {
    const { token } = req.query;
    const { password, confirmPassword } = req.body;

    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) return next(new Error("Token không hợp lệ"));

    if (password !== confirmPassword)
      return next(new Error("Mật khẩu không trùng khớp"));

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return new SuccessResponse("Đặt lại mật khẩu thành công").send(res);
  } catch (error) {
    return next(error);
  }
};
