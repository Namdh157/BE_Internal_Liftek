const jwt = require("jsonwebtoken");
const User = require("../users/user.model.js");

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer ")) {
      return next(new Error("Token không hợp lệ hoặc thiếu 'Bearer'"));
    }

    const token = req.headers.authorization.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decode.id).select("-password");
    if (!req.user) return next(new Error("Không tìm thấy user"));

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return next(new Error("Token đã hết hạn, vui lòng đăng nhập lại"));
    } else if (error.name === "JsonWebTokenError") {
      return next(new Error("Token không hợp lệ"));
    }
    return next(error);
  }
};

module.exports = authMiddleware;
