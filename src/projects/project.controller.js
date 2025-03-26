import mongoose from "mongoose";
import * as projectService from "./project.service.js";
import SuccessResponse from "../utils/SuccessResponse.js";
import PAGINATE from "../constants/paginate.js";
import jwt from "jsonwebtoken";
export const addProject = async (req, res, next) => {
  try {
    const project = await projectService.createProject(req.body);
    return new SuccessResponse(project).send(res);
  } catch (error) {
    return next(error);
  }
};

export const getAllProjects = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || PAGINATE.PAGE;
    const limit = parseInt(req.query.limit) || PAGINATE.LIMIT;
    const skip = (page - 1) * limit;
    const idUser = req.user._id;
    const projects = await projectService.getAllProjects(idUser, skip, limit);
    const total = await projectService.countProjects(idUser);

    return new SuccessResponse(
      projects,
      200,
      "success",
      total,
      page,
      limit
    ).sends(res);
  } catch (error) {
    return next(error);
  }
};

export const getProjectById = async (req, res, next) => {
  try {
    const project = await projectService.getProjectById(req.project._id);
    if (!project) return next(new Error("Project không tồn tại"));

    return new SuccessResponse(project).send(res);
  } catch (error) {
    return next(error);
  }
};

export const updateProject = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.project._id))
      return next(new Error("ID không hợp lệ"));

    const project = await projectService.updateProject(
      req.project._id,
      req.body
    );
    if (!project) return next(new Error("Project không tồn tại"));

    return new SuccessResponse(project).send(res);
  } catch (error) {
    return next(error);
  }
};

export const deleteProject = async (req, res, next) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.idProject)) {
      return next(new Error("ID không hợp lệ"));
    }

    const project = await projectService.deleteProject(req.params.idProject);
    if (!project) return next(new Error("Project không tồn tại"));

    return new SuccessResponse("Xoa project thanh cong").send(res);
  } catch (error) {
    return next(error);
  }
};

export const getProjectManager = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return next(new Error("ID không hợp lệ"));

    const project = await projectService.fetchProjectManager(id);
    if (!project) return next(new Error("Project không tồn tại"));

    return new SuccessResponse(project.managerId).send(res);
  } catch (error) {
    return next(error);
  }
};
export const getProjectMembers = async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return next(new Error("ID không hợp lệ"));

    const project = await projectService.fetchProjectMembers(id);

    if (!project) return next(new Error("Project không tồn tại"));

    return new SuccessResponse(project.members).send(res);
  } catch (error) {
    return next(error);
  }
};
export const load = async (req, res, next, id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new Error("ID không hợp lệ"));
    }
    const project = await projectService.getProjectById(id);
    if (!project) {
      return next(new Error("Project không tồn tại"));
    }
    req.project = project;
    next();
  } catch (error) {
    return next(error);
  }
};
// export const searchProject = async (req, res, next) => {
//   try {
//     const { q } = req.query.search; // Lấy từ khóa từ query (thay vì params)
//     const idUser = req.user._id;

//     console.log(idUser);

//     if (!q || q.trim() === "") return next(new Error("Từ khóa không hợp lệ"));

//     const projects = await projectService.FindProjectByTitle(idUser, q.trim());

//     return res.json({ success: true, data: projects });
//   } catch (error) {
//     return next(error);
//   }
// };
export const getNameProject = async (req, res, next) => {
  try {
    // Lấy token từ header
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      // return res.status(401).json({ message: "Unauthorized" });
      return next(new Error("Unauthorized"));

    // Giải mã token để lấy userId
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id; // Giả sử token có chứa `id`

    // Lấy từ khóa tìm kiếm từ query string
    const { name } = req.query;

    if (!name)
      // return res.status(400).json({ message: "Thiếu từ khóa tìm kiếm" });
      return next(new Error("Thiếu từ khóa tìm kiếm"));

    // Gọi service để tìm project
    const projects = await projectService.findNameProject(userId, name);
    // Trả về kết quả
    // return res.status(200).json({ success: true, projects });
    return new SuccessResponse(projects).send(res);
  } catch (error) {
    console.error("Lỗi tìm kiếm project:", error);
    // return res.status(500).json({ message: "Lỗi server" });
    return next(new Error("Lỗi server"));
  }
};
