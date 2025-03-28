const User = require("./user.model.js");

exports.getUserById = async (id) => {
    return await User.findById(id);
}

exports.getAllUser = async (skip, limit) => {
    return await User.find().skip(skip).limit(limit);
}

exports.updateUser = async (id, data) => {
    return await User.findByIdAndUpdate(id, data, {
        new: true
    });
}

exports.countUser = async () => {
    return await User.countDocuments();
}