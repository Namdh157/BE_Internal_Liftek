const mongoose = require("mongoose");

const TagSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        default: "#000000",
    },
}, { timestamps: true});

module.exports = mongoose.model("Tag", TagSchema);