const JobStatusChange = require("./task_status_change.model.js");
const Task = require("./task.model.js");

const updateTaskStatusService = async (taskId, oldStatus, newStatus, userId, reason, notes, changeSource) => {
  const task = await Task.findById(taskId);
  if (!task) {
    throw new Error("Không tìm thấy công việc!");
  }

  task.status = newStatus;
  await task.save();

  await JobStatusChange.createHistory({
    taskId,
    projectId: task.projectId,
    oldStatus,
    newStatus,
    changedBy: userId,
    reason,
    notes,
    changeSource,
  });

  return task;
};

module.exports = {updateTaskStatusService};
