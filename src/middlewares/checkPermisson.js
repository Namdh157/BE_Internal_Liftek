import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";
import Project from "../models/Project.js";

dotenv.config();
const { SECRET_CODE } = process.env;

/**
 * Middleware xác thực token và lấy thông tin user
 */
const authenticateToken = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(403).json({ message: "Bạn chưa đăng nhập" });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, SECRET_CODE);
        const user = await User.findById(decoded._id);

        if (!user) {
            return res.status(403).json({ message: "Token không hợp lệ" });
        }

        req.user = user; // Lưu user vào request để dùng ở các middleware khác
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized", error: error.message });
    }
};

/**
 * Middleware kiểm tra quyền admin
 */
const checkIsAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== "ADMIN") {
        return res.status(403).json({ message: "Bạn không có quyền làm việc này" });
    }
    next();
};

/**
 * Middleware kiểm tra người dùng có phải manager hoặc member của dự án không
 */
const checkIsProjectMember = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ message: "Dự án không tồn tại" });
        }

        const userId = req.user._id.toString();
        const isManager = project.managerId.toString() === userId;
        const isMember = project.members.some(member => member.toString() === userId);

        if (!isManager && !isMember && req.user.role !== "ADMIN") {
            return res.status(403).json({ message: "Bạn không có quyền truy cập dự án này" });
        }

        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized", error: error.message });
    }
};

export { authenticateToken, checkIsAdmin, checkIsProjectMember };
