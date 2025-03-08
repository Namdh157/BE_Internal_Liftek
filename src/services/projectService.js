import Project from "../models/Project.js";

export const createProject = async (data) => {
    return await Project.create(data);
};

export const getAllProjects = async () => {
    return await Project.find();
};

export const getProjectById = async (id) => {
    return await Project.findById(id);
};

export const updateProject = async (id, data) => {
    return await Project.findByIdAndUpdate(id, data, { new: true });
};

export const deleteProject = async (id) => {
    return await Project.findByIdAndDelete(id);
};
export const fetchProjectManager = async (id) => {
    return await Project.findById(id)
    .populate({
        path: "managerId",
        select: "-password -refreshToken", // Loại bỏ password và refreshToken
    });;
}