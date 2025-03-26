import mongoose from "mongoose";
import { uploadSingleFile } from "../services/cloudinaryService.js";
import * as taskService from "./task.service.js";
import * as taskStatusChangeService from "./statusChange.service.js"
import * as taskValidator from "./task.validation.js";
import SuccessResponse from "../utils/SuccessResponse.js";
import PAGINATE from "../constants/paginate.js";
import { CHANGE_SOURCE, PERMISSIONS } from "../constants/index.js";
import { STATUS } from "../constants/statusConstants.js";

/// thay đổi trạng thái
export const updateTaskStatus = async (req, res, next) => {
  try {
    const roleUser = req.user.role;
    const { oldStatus, newStatus } = req.body;

    const canChangeStatus = (role, oldStatus, newStatus) => {
      const allowedStatuses = PERMISSIONS.TASK_STATUS_CHANGE[role] || [];
      return allowedStatuses.includes(newStatus);
    };

    if (!canChangeStatus(roleUser, oldStatus, newStatus)) {
      return next(new Error("Bạn không có quyền thay đổi trạng thái"));
    }

    const { taskId } = req.params;
    const userId = req.user._id;

    if (!Object.values(STATUS).includes(oldStatus) || !Object.values(STATUS).includes(newStatus)) {
      return next(new Error("Trạng thái không hợp lệ !"));
    }

    const updatedTask = await taskStatusChangeService.updateTaskStatusService(
      taskId,
      oldStatus,
      newStatus,
      userId,
      "Theo dõi thay đổi",
      "tự động khi thay đổi trạng thái",
      CHANGE_SOURCE.API
    );

    return new SuccessResponse(updatedTask).send(res);
  } catch (error) {
    return error;
  }
};

// thêm user vào task
export const addUserToTaskController = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const { userId } = req.body;
    const updatedTask = await taskService.addUserToTask(taskId, userId);

    return new SuccessResponse(updatedTask).send(res);
  } catch (error) {
    return next(error);
  }
}


// lấy tất cả task theo project
export const getAlTaskByProject = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const page = parseInt(req.query.page) || PAGINATE.PAGE;
    const limit = parseInt(req.query.limit) || PAGINATE.LIMIT;
    const skip = (page - 1) * limit;
    const tasks = await taskService.getAlTaskByProject(projectId, skip, limit);
    const total = await taskService.countTaskByProject(projectId);

    return new SuccessResponse(tasks, 200, "success", total, limit).sends(res);
  } catch (error) {
    return next(error);
  }
};
// lọc task theo điều kiện

export const filterTaskController = async (req, res, next) => {
  try {
    const { projectId } = req.params;
    const { status, priority, assigneeId, startDate, endDate } = req.body;
    let filter = { projectId };

    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (assigneeId) filter.assigneeId = { $in: assigneeId };
    if (startDate) filter.startDate = { $gte: new Date(startDate) };
    if (endDate) filter.endDate = { $lte: new Date(endDate) };

    const page = parseInt(req.query.page) || PAGINATE.PAGE;
    const limit = parseInt(req.query.limit) || PAGINATE.LIMIT;
    const skip = (page - 1) * limit;
    const searchResult = await taskService.filterTaskService(skip, limit, filter);
    const total = searchResult.length;
    if (searchResult.length === 0) {
      return new SuccessResponse("Không tìm thấy task nào", 404).send(res);
    }

    return new SuccessResponse(searchResult, 200, "success", total, page, limit, filter).sends(res);
  } catch (error) {
    return next(error);
  }
};

// tìm kiếm task

export const searchTaskByTitle = async (req, res, next) => {
  try {
    const title = req.query.search;
    if (!title || title.lenght === 0) {
      return next(new Error("Tiêu đề không được để trống"));
    }
    const page = parseInt(req.query.page) || PAGINATE.PAGE;
    const limit = parseInt(req.query.limit) || PAGINATE.LIMIT;
    const skip = (page - 1) * limit;
    const tasks = await taskService.FindTaskByTitle(skip, limit, title);
    const total = tasks.length;
    if (tasks.length === 0) {
      return next(new Error("Không tìm thấy task nào"));
    }
    return new SuccessResponse(tasks, 200, "success", total, page, limit).sends(res);
  } catch (error) {
    return next(error);
  }
};

/// thêm task
export const addTask = async (req, res, next) => {
  try {
    const user = req.user.role;
    const checkPermission = PERMISSIONS.CREATE_TASK.includes(user);
    if (!checkPermission) {
      return next(new Error("Bạn không có quyền thêm task"));
    }
    const dataBody = req.body;

    if (typeof dataBody.assigneeId === "string") {
      dataBody.assigneeId = dataBody.assigneeId.split(",");
    }

    const { error } = taskValidator.createTaskValidator.validate(dataBody, {
      abortEarly: false,
    });

    if (error) {
      const errors = error.details.map((err) => err.message);
      return next(new Error(errors));
    }

    const invalidAssigneeId = dataBody.assigneeId.filter(
      (id) => !mongoose.Types.ObjectId.isValid(id)
    );
    if (invalidAssigneeId.length > 0) {
      return next(new Error("Id của assignee không hợp lệ"));
    }

    // kiểm tra id của assignee có id nào trong bẳng user không
    const assigneeIds = dataBody.assigneeId;
    const assigneeIdsFromDB = await taskService.checkAssigneeId(assigneeIds);
    if (assigneeIdsFromDB.length !== assigneeIds.length) {
      return next(new Error("Người nhận việc không hợp lệ"));
    }

    if (!mongoose.Types.ObjectId.isValid(dataBody.assignerId)) {
      return next(new Error("Id của assigner không hợp lệ"));
    }

    //kiểm tra id của assigner có id nào trong bảng user không
    const assignerId = dataBody.assignerId;
    const assignerIdFromDB = await taskService.checkAssignerId(assignerId);
    if (!assignerIdFromDB) {
      return next(new Error("Người giao việc không hợp lệ"));
    }

    if (req.file) {
      const filePath = req.file.buffer;
      const imageUrl = await uploadSingleFile(filePath);
      dataBody.image = imageUrl.secure_url;
    }

    const task = await taskService.addTask(req.body);
    return new SuccessResponse(task).send(res);
  } catch (error) {
    return next(error);
  }
};

// lấy tất cả task
export const getAllTasks = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || PAGINATE.PAGE;
    const limit = parseInt(req.query.limit) || PAGINATE.LIMIT;
    const skip = (page - 1) * limit;
    const tasks = await taskService.getAllTasks(skip, limit);
    const total = await taskService.countTasks();

    return new SuccessResponse(tasks, 200, "success", total, page, limit).sends(res);
  } catch (error) {
    return next(error);
  }
};

// lấy task bằng id
export const getTaskById = async (req, res, next) => {
  try {
    const taskId = req.task._id;
    const task = await taskService.FindTaskById(taskId);
    if (!task) return next(new Error("Task không tìm thấy"));
    return new SuccessResponse(task).send(res);
  } catch (error) {
    return next(error);
  }
};

// cập nhật task
export const updateTask = async (req, res, next) => {
  try {
    const id = req.task._id;
    const dataBody = req.body;
    if (typeof dataBody.assigneeId === "string") {
      dataBody.assigneeId = dataBody.assigneeId.split(",");
    }

    const invalidAssigneeId = dataBody.assigneeId.filter(
      (id) => !mongoose.Types.ObjectId.isValid(id)
    );
    if (invalidAssigneeId.length > 0) {
      return next(new Error("Id của assignee không hợp lệ"));
    }

    // kiểm tra id của assignee có id nào trong bẳng user không
    const assigneeIds = dataBody.assigneeId;
    const assigneeIdsFromDB = await taskService.checkAssigneeId(assigneeIds);
    if (assigneeIdsFromDB.length !== assigneeIds.length) {
      return next(new Error("người được giao nhiệm vụ không hợp lệ"));
    }

    if (!mongoose.Types.ObjectId.isValid(dataBody.assignerId)) {
      return next(new Error("Id của assigner không hợp lệ"));
    }

    //kiểm tra id của assigner có id nào trong bảng user không
    const assignerId = dataBody.assignerId;
    const assignerIdFromDB = await taskService.checkAssignerId(assignerId);
    if (!assignerIdFromDB) {
      return next(new Error("Người giao việc không hợp lệ"));
    }
    const { error } = taskValidator.updateTaskValidator.validate(dataBody, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => err.message);
      return next(new Error(errors))
    }

    if (req.file) {
      const filePath = req.file.buffer;
      const imageUrl = await uploadSingleFile(filePath);
      dataBody.image = imageUrl.secure_url;
    }

    const task = await taskService.editTask(id, dataBody);

    if (!task) next(new Error("Task không tìm thấy"));

    return new SuccessResponse(task).send(res);
  } catch (error) {
    return next(error);
  }
};

// xóa task
export const deleteTask = async (req, res, next) => {
  try {
    const taskId = req.task._id;
    const task = await taskService.deleteTask(taskId);
    if (!task) return next(new Error("Task không tìm thấy"));

    return new SuccessResponse("Xóa task thành công").send(res);
  } catch (error) {
    return next(error);
  }
};

export const deleteManyTask = async (req, res, next) => {
  try {
    const ids = req.body.ids;

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return next(new Error("Danh sách ID không hợp lệ"));
    }

    const result = await taskService.deleteMoreTasks(ids);

    if (result.deletedCount === 0) {
      return next(new Error("Task không tìm thấy"));
    }

    return new SuccessResponse(null, 200, "Xóa task thành công").send(res);
  } catch (error) {
    return next(error);
  }
};

export const load = async (req, res, next, id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new Error("Status không phù hợp"));;
    }
    const task = await taskService.FindTaskById(id);
    if (!task) return next(new Error("Task không tìm thấy"));
    req.task = task;
    next();
  } catch (error) {
    next(error);
  }
};
