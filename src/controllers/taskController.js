
import * as taskService from "../services/taskService.js";
import { createTaskValidator } from "../validation/taskValidation.js";



/// thay đổi trạng thái 
export const updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    const updatedTask = await taskService.updateTaskStatusService(taskId, status);

    res.status(200).json({
      message: "Thay đổi trạng thái vấn đề thành công",
      task: updatedTask,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// thêm user vào task

export const addUserToTaskController = async (req, res) => {
  try {
     const { taskId } = req.params;
    const { userId }  = req.body;
    console.log(userId,taskId)
    const updatedTask = await taskService.addUserToTask(taskId, userId);

    res.status(200).json({
      message: "Thêm người dùng vào vấn đề thành công",
      task: updatedTask,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// tìm kiếm vấn đề

export const searchTaskController = async (req, res) => {
  try {
       
    const searchResult = await taskService.searchTaskService(req.query)
    // res.json(searchResult);

  } catch (error) {

    res.status(500).json({ error: "Lỗi server" });

  }
} 
/// thêm vấn đề
export const addTask = async (req, res) => {
  try {

    const dataBody = req.body;

    const { error } = createTaskValidator.validate(dataBody, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const task = await taskService.addTask(req.body);
    res.status(201).json({
      message: "Nhiêm vụ tạo thành công",
      data: task,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
/// lấy danh sách vấn đề
export const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();
    res.status(200).json({
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// lấy tvaans đề bằng id
export const getTaskById = async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// cập nhật vấn đề
export const updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const dataBody = req.body;
    const { error } = createTaskValidator.validate(dataBody, { abortEarly: false });

    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json({
        message: errors,
      });
    }

    const task = await taskService.editTask(id, dataBody);

    if (!task) return res.status(404).json({ message: "Nhiệm vụ không tìm thấy" });

   return res.status(200).json({
      message: "Nhiệm vụ cập nhật thành công",
      data: task,
    });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// xóa vấn đề
export const deleteTask = async (req, res) => {
  try {
    const task = await taskService.deleteTask(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};