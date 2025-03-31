const mongoose = require("mongoose");
const { PRIORITY, STATUS_PROJECT } = require("../constants/index.js");
const removeAccents = require("remove-accents");
const ProjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slugName: { type: String, unique: true }, // Trường không dấu để tìm kiếm
    code: { type: String, required: true },
    description: { type: String },
    status: {
      type: Number,
      enum: Object.values(STATUS_PROJECT),
      default: STATUS_PROJECT.PROGRESSING,
    },

    managerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    priority: {
      type: Number,
      enum: Object.values(PRIORITY),
      default: PRIORITY.LOW,
    },
  },
  { timestamps: true }
);
// 📌 Middleware: Chuyển đổi `name` thành `slugName` trước khi lưu
ProjectSchema.pre("save", function (next) {
  this.slugName = removeAccents.remove(this.name.toLowerCase()); // Loại bỏ dấu
  next();
});

// 📌 Middleware: Chuyển đổi `name` thành `slugName` trước khi lưu
ProjectSchema.pre("save", function (next) {
  this.slugName = removeAccents.remove(this.name.toLowerCase()); // Loại bỏ dấu
  next();
});

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;
