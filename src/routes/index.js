const express = require("express");
const routerAuth = require("../auth/auth.route.js");
const routerProject = require("../projects/project.route.js");
const routerTask = require("../tasks/task.route.js");
const routerCmt = require("../comments/comment.route.js");
const routeUser = require("../users/user.route.js");
const authMiddleware = require("../middlewares/auth.middleware.js");
const router = express.Router();

router.use("/auth", routerAuth);

const routes = {
    "/projects": routerProject,
    "/tasks": routerTask,
    "/comments": routerCmt,
    "/users": routeUser,
};

Object.entries(routes).forEach(([path, rou]) => {    
    router.use(path, authMiddleware, rou);
});

module.exports = router;