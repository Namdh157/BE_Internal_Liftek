const { uploadSingleFile } = require("../services/cloudinaryService.js");
const SuccessResponse = require("../utils/SuccessResponse.js");
const userService = require("./user.service.js");

exports.getUserById = async (req, res, next) => {
  const id = req.user._id;
  try {
    const user = await userService.getUserById(id);
    user.password = undefined;
    return new SuccessResponse(user).send(res);
  } catch (error) {
    return next(error);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const users = await userService.getAllUser(skip, limit);
    const total = await userService.countUser();

    return new SuccessResponse(users, 200, "success", total, page, limit).sends(
      res
    );
  } catch (error) {
    return next(error);
  }
};
exports.updateUser = async (req, res, next) => {
  try {
    const id = req.user._id;
    if (req.file) {
      const filePath = req.file.buffer;
      const imageUrl = await uploadSingleFile(filePath);
      req.body.avatar = imageUrl.secure_url;
    }

    const user = await userService.updateUser(id, req.body);
    const data = {
      userName: user.userName,
      email: user.email,
      phone: user.phone,
      avatar: user.avatar,
      role: user.role,
      verified: user.verified,
    };
    return new SuccessResponse(data).send(res);
  } catch (error) {
    return next(error);
  }
};

exports.load = async (req, res, next, id) => {
  try {
    const user = await userService.getUserById(id);
    if (!user) {
      next(new Error("Không tìm thấy người dùng"));
    }
    req.user = user;
    next();
  } catch (error) {
    return next(error);
  }
};
