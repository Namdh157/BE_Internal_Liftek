const mongoose = require("mongoose");
const { STATUS } = require("../constants/statusConstants.js");
const { CHANGE_SOURCE } = require("../constants/index.js");

const JobStatusChangeSchema = new mongoose.Schema({
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task", required: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    oldStatus: { type: Number, required: true, enum: Object.values(STATUS) },
    newStatus: { type: Number, required: true, enum: Object.values(STATUS) },
    changedAt: { type: Date, default: Date.now },
    changedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    reason: { type: String },
    notes: { type: String },
    changeSource: { type: Number, required: true, enum: Object.values(CHANGE_SOURCE), default: CHANGE_SOURCE.API },
}, { timestamps: true });

JobStatusChangeSchema.statics.createHistory = async function ({
    taskId,
    projectId,
    oldStatus,
    newStatus,
    changedAt,
    changedBy,
    reason,
    notes,
    changeSource
}) {
    return this.create({
        taskId,
        projectId,
        oldStatus,
        newStatus,
        changedAt,
        changedBy,
        reason,
        notes,
        changeSource
    });
};

// Tạo Model từ Schema
const JobStatusChange = mongoose.model("JobStatusChange", JobStatusChangeSchema);

module.exports = JobStatusChange;
