const mongoose = require("mongoose");

const TaskDependency = new mongoose.Schema({
    taskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
        required: true,
    },
    taskDependency_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
        required: true,
    },
    type: {
        type: Number,
        enum: [0, 1, 2],
        default: 1,
        required: true,
    },
}, { timestamps: true});


module.exports = mongoose.model("Task_dependency", TaskDependency);