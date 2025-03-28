const mongoose = require("mongoose");

const WatcherSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Người theo dõi
    task_id: { type: mongoose.Schema.Types.ObjectId, ref: "Task" }, // Công việc được theo dõi (có thể null nếu theo dõi dự án)
    project_id: { type: mongoose.Schema.Types.ObjectId, ref: "Project" }, // Dự án được theo dõi (có thể null nếu theo dõi task)
},{timestamps: true});

// Tạo Model từ Schema
const Watcher = mongoose.model("Watcher", WatcherSchema);

module.exports = Watcher;
