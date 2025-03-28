const commentService = require("./comment.service.js");
const taskService = require("../tasks/task.service.js");
const SuccessResponse = require("../utils/SuccessResponse.js");
const PAGINATE = require("../constants/paginate.js");

exports.addComment = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { content, taskId } = req.body; // Lấy content từ request body

    const comment = await commentService.createComment({
      taskId,
      userId,
      content,
    });
    return new SuccessResponse(comment).send(res);
  } catch (error) {
    next(error);
  }
};
exports.getAllComments = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || PAGINATE.PAGE;
    const limit = parseInt(req.query.limit) || PAGINATE.LIMIT;
    const skip = (page - 1) * limit;
    const taskId = req.task._id;
    const comments = await commentService.getAllcmt(taskId, skip, limit);
    const total = await commentService.countComment(taskId);

    return new SuccessResponse(
      comments,
      200,
      "success",
      total,
      page,
      limit
    ).sends(res);
  } catch (error) {
    next(error);
  }
};
exports.load = async (req, res, next, id) => {
  try {
    const task = await taskService.getTaskById(id);
    if (!task) {
      return next(new Error("Không tìm thấy task"));
    }
    req.task = task;
    next();
  } catch (error) {
    next(error);
  }
};
