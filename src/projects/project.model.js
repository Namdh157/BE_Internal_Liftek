const mongoose = require("mongoose");
const { PRIORITY, STATUS_PROJECT } = require("../constants/index.js");

const ProjectSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    code: { type: Number, required: true },
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

module.exports = mongoose.model("Project", ProjectSchema);
