const mongoose = require("mongoose");

const ActivityLogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Người thực hiện hành động
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project" }, // Dự án liên quan (nếu có)
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task" }, // Công việc liên quan (nếu có)

    action: { type: String, required: true }, // Hành động thực hiện (VD: "created task", "updated status")
    description: { type: String, required: true }, // Mô tả chi tiết về hoạt động
},{timestamps: true});

// Tạo Model từ Schema
const ActivityLog = mongoose.model("ActivityLog", ActivityLogSchema);

module.exports = ActivityLog;
