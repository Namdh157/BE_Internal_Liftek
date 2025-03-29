const Project = require("./project.model.js");
const User = require("../users/user.model.js");
const mongoose = require("mongoose");
const removeAccents = require("remove-accents");

exports.createProject = async (data) => {
  console.log("Project:", Project);
  const existingProject = await Project.findOne({ code: data.code });
  const managerExists = await isUserExist(data.managerId);
  if (!managerExists) {
    throw new Error(`Manager với id ${data.managerId} không tồn tại!`);
  }
  // if (data.members && data.members.length > 0) {
  //   for (let memberId of data.members) {
  //     const isMemberValid = await isUserExist(memberId);
  //     if (!isMemberValid) {
  //       throw new Error(`Thành viên với id ${memberId} không tồn tại!`);
  //     }
  //   }
  // }
  // Kiểm tra danh sách thành viên
  let memberIds = [];
  if (Array.isArray(data.members)) {
    for (let member of data.members) {
      if (!member._id) continue;
      const isMemberValid = await isUserExist(member._id);
      if (!isMemberValid) {
        throw new Error(`Thành viên với id ${member._id} không tồn tại!`);
      }
      memberIds.push(member._id);
    }
  }

  if (existingProject) {
    throw new Error(`Mã code ${data.code} đã tồn tại!`);
  }
  return await Project.create(data);
};

exports.getAllProjects = async (userId, skip, limit) => {
  return await Project.find({
    $or: [{ managerId: userId }, { members: { $in: [userId] } }],
  })
    .skip(skip)
    .limit(limit)
    .populate({
      path: "managerId",
      select: "userName email phone avatar -_id",
    })
    .populate({
      path: "members",
      select: "userName email phone avatar -_id",
    });
};
exports.getProjectById = async (id) => {
  return await Project.findById(id);
};

exports.updateProject = async (id, data) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("ID không hợp lệ!");
  }

  const updateData = {}; // Chứa các trường hợp lệ để cập nhật

  // Kiểm tra và cập nhật `managerId`
  if (data.managerId) {
    const managerExists = await isUserExist(data.managerId);
    if (!managerExists) {
      throw new Error(`Manager với id ${data.managerId} không tồn tại!`);
    }
    updateData.managerId = data.managerId;
  }

  // Lấy danh sách `members` hiện tại
  const project = await Project.findById(id);
  if (!project) {
    throw new Error("Dự án không tồn tại!");
  }

  let memberIds = project.members.map((m) => m.toString());

  // Chuyển đổi object thành mảng nếu cần
  if (
    data.addMembers && typeof data.addMembers === "object" && !Array.isArray(data.addMembers)
  ) {
    data.addMembers = [data.addMembers];
  }
  if (
    data.removeMembers && typeof data.removeMembers === "object" && !Array.isArray(data.removeMembers)
  ) {
    data.removeMembers = [data.removeMembers];
  }

  // ✅ Nếu muốn **thêm** thành viên mới
  if (Array.isArray(data.addMembers) && data.addMembers.length > 0) {
    for (let member of data.addMembers) {
      if (!member._id) continue;
      const isMemberValid = await isUserExist(member._id);
      if (!isMemberValid) {
        throw new Error(`Thành viên với id ${member._id} không tồn tại!`);
      }
      // Chỉ thêm nếu chưa tồn tại
      if (!memberIds.includes(member._id)) {
        memberIds.push(member._id);
      }
    }
  }

  // ✅ Nếu muốn **xóa** thành viên
  if (Array.isArray(data.removeMembers) && data.removeMembers.length > 0) {
    const removeIds = data.removeMembers.map((member) => member._id);
    memberIds = memberIds.filter((id) => !removeIds.includes(id));
    console.log("removeIds", removeIds);
  }

  // Cập nhật danh sách thành viên
  updateData.members = memberIds;

  // Cập nhật các trường khác (nếu có)
  ["name", "code", "description", "status", "priority"].forEach((field) => {
    if (data[field] !== undefined) {
      updateData[field] = data[field];
    }
  });

  // Cập nhật vào MongoDB với `$set`
  return await Project.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true }
  );
};

exports.deleteProject = async (id) => {
  return await Project.findByIdAndDelete(id);
};
exports.fetchProjectManager = async (id) => {
  return await Project.findById(id).populate({
    path: "managerId",
    select: "-password -refreshToken",
  });
};
exports.fetchProjectMembers = async (projectId) => {
  return await Project.findById(projectId).populate({
    path: "members",
    select: "-password -refreshToken -role",
  });
};
const isUserExist = async (id) => {
  const user = await User.findById(id);
  return !!user; // true nếu tồn tại, false nếu không
};

exports.countProjects = async (userId) => {
  return await Project.countDocuments({
    $or: [{ managerId: userId }, { members: { $in: [userId] } }],
  });
};
exports.countNameProjects = async (userId, name) => {
  const cleanName = name.trim();
  const slugNames = removeAccents.remove(cleanName.toLowerCase());
  return await Project.countDocuments({
    $or: [{ managerId: userId }, { members: { $in: [userId] } }],
    slugName: { $regex: slugNames, $options: "i" },
  });
};
// exports.FindProjectByTitle = async (idUser, keyword) => {
//   return await Project.find({
//     owner: idUser, // Chỉ lấy dự án của user đang đăng nhập
//     name: { $regex: keyword, $options: "i" }, // Tìm kiếm không phân biệt hoa thường
//   });
// };
exports.findNameProject = async (userId, name) => {
  try {
    const cleanName = name.trim();
    const slugNames = removeAccents.remove(cleanName.toLowerCase());
    const projects = await Project.find({
      $or: [
        { members: { $in: [userId] } }, // Kiểm tra userId có trong mảng members
        { managerId: userId }, // Kiểm tra userId có phải là manager
      ],
      slugName: { $regex: slugNames, $options: "i" }, // Tìm kiếm không phân biệt hoa thường
    });
    return projects;
  } catch (error) {
    console.error("Lỗi tìm kiếm project:", error);
    throw new Error("Không thể tìm kiếm project");
  }
};
