const Task = require("./task.model.js");
const User = require("../users/user.model.js");
const mongoose = require("mongoose");

exports.updateTaskStatusService = async (taskId, newStatus) => {
  // Kiểm tra xem taskId có hợp lệ không
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    throw new Error(" task ID không phù hợp");
  }

  // Kiểm tra trạng thái hợp lệ
  // Cập nhật trạng thái task
  const updatedTask = await Task.findByIdAndUpdate(
    taskId,
    { status: newStatus },
    { new: true }
  );

  if (!updatedTask) {
    throw new Error("Task not found");
  }

  return updatedTask;
};
/// thêm user vào task
exports.addUserToTask = async (taskId, userId) => {
  const listUserId = await User.find({ _id: { $in: userId } }).distinct("_id");
  console.log(listUserId);
  if (listUserId.length === 0) {
    throw new Error(
      "Danh sách người dùng thêm vào không tồn tại trong bảng người dùng"
    );
  } else if (listUserId.length === 1) {
    const task = await Task.findById(taskId);
    if (!task) {
      throw new Error("Task không tìm thấy");
    }
    // Lấy danh sách userId đã tồn tại trong assigneeId
    const existingUsers = task.assigneeId.map((id) => id.toString());

    // Kiểm tra xem có userId nào bị trùng không
    const duplicateUsers = listUserId.filter((id) =>
      existingUsers.includes(id)
    );
    if (duplicateUsers.length > 0) {
      throw new Error(
        `UserId bị trùng: ${duplicateUsers.join(
          ", "
        )}. Vui lòng chọn user khác.`
      );
    }
    const newUsers = listUserId.map((id) => new mongoose.Types.ObjectId(id));

    const result = await Task.findByIdAndUpdate(
      taskId,
      { $addToSet: { assigneeId: { $each: newUsers } } },
      { new: true }
    );
    return result;
  } else if (listUserId.length > 1) {
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        $set: {
          assigneeId: listUserId.map((id) => new mongoose.Types.ObjectId(id)),
        },
      }, // Dùng $addToSet để tránh trùng lặp
      { new: true },
      { assigneeId: 1 }
    ); // Populate để lấy chi tiết user nếu cần

    if (!updatedTask) {
      throw new Error("Task không tìm thấy");
    }

    return updatedTask;
  }
};
exports.filterTaskService = async (skip, limit, filter) => {
  return Task.find(filter)
    .skip(skip)
    .limit(limit)
    .populate("assigneeId", "userName email avatar")
    .populate("assignerId", "userName email avatar");
};
exports.getAllTasks = async (skip, limit) => {
  return await Task.find()
    .skip(skip)
    .limit(limit)
    .select("+assigneeId +assignerId")
    .populate("assigneeId", "userName email");
};
exports.getTaskByProject = async (projectId) => {
  return await Task.find({ projectId });
};
exports.addTask = async (data) => {
  return await Task.create(data);
};
exports.editTask = async (id, data) => {
  return await Task.findByIdAndUpdate(id, data, { new: true });
};
exports.deleteTask = async (id) => {
  return await Task.findByIdAndDelete(id);
};
exports.deleteMoreTasks = async (ids) => {
  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    throw new Error("Danh sách ID không hợp lệ");
  }

  // Chuyển đổi mỗi id thành ObjectId
  const objectIds = ids.map((id) => new mongoose.Types.ObjectId(id));

  return await Task.deleteMany({ _id: { $in: objectIds } });
};

exports.getAlTaskByProject = async (projectId, skip, limit) => {
  return await Task.find({ projectId })
    .skip(skip)
    .limit(limit)
    .populate({
      path: "assigneeId",
      select: "userName email", // Chỉ lấy userName và email của user
    })
    .populate({
      path: "assignerId",
      select: "userName email",
    });
};

exports.countTaskByProject = async (projectId) => {
  return await Task.countDocuments({ projectId });
};
exports.FindTaskById = async (id) => {
  return await Task.findById(id)
    .populate({
      path: "assigneeId",
      select: "userName email avatar", // Chỉ lấy user name và email của user
    })
    .populate({
      path: "assignerId",
      select: "userName email avatar", // Chỉ lấy user name và email của user
    });
};

exports.getTaskById = async (id) => {
  return await Task.findById(id);
};

exports.convertToSlug = (str) => {
  return str
    .normalize("NFD") // Chuẩn hóa Unicode
    .replace(/[\u0300-\u036f]/g, "") // Xóa dấu tiếng Việt
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D") // Chuyển đ -> d, Đ -> D
    .replace(/[^a-zA-Z0-9\s]/g, "") // Xóa ký tự đặc biệt (chỉ giữ chữ & số)
    .trim() // Xóa khoảng trắng đầu & cuối
    .replace(/\s+/g, " "); // Chuyển nhiều khoảng trắng thành 1 khoảng trắng
};

exports.FindTaskByTitle = async (skip, limit, data, assigneeIds, projectId) => {
  //const slugTitle = this.convertToSlug(data); // Chuyển input thành không dấu

  return await Task.find({
    $or: [
      { title: { $regex: new RegExp(`.*${data}*`, "i") } }, // Tìm kiếm một phần của chuỗi có dấu
    ],
    assigneeId: { $in: assigneeIds }, // Sửa lỗi: Truyền đúng biến danh sách assigneeId
    projectId: projectId,
  })
    .skip(skip)
    .limit(limit);
};
exports.CountTitleTasks = async (skip, limit, data, assigneeIds, projectId) => {
  return await Task.countDocuments({
    $or: [{ title: { $regex: new RegExp(`.*${data}*`, "i") } }],
    assigneeId: { $in: assigneeIds },
    projectId: projectId,
  });
};
// check assigneeID có trong bảng user không
exports.checkAssigneeId = async (assigneeId) => {
  return await User.find({ _id: { $in: assigneeId } });
};

// check assignerId có trong bảng user không
exports.checkAssignerId = async (assignerId) => {
  return await User.findById(assignerId);
};

exports.countTasks = async () => {
  return await Task.countDocuments();
};
