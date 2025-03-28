const express = require("express");
const  projectController = require("./project.controller.js");

const routerProject = express.Router();
routerProject.get("/search", projectController.getNameProject);

routerProject
  .route("/")
  .get(projectController.getAllProjects)
  .post(projectController.addProject);

routerProject
  .route("/:idProject")
  .get(projectController.getProjectById)
  .put(projectController.updateProject)
  .delete(projectController.deleteProject);
routerProject.param("idProject", projectController.load);

routerProject.get("/:id/manager", projectController.getProjectManager);
routerProject.get("/:id/members", projectController.getProjectMembers);

// routerProject.get("/search", projectController.searchProject);

module.exports = routerProject;
