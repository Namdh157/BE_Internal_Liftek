const express = require("express");
const  commentController = require("./comment.controller.js");

const routerCmt = express.Router();

// add comment
routerCmt.route("/")
    .post(commentController.addComment);
routerCmt.route("/:taskId")
    .get(commentController.getAllComments);
routerCmt.param("taskId", commentController.load);
module.exports = routerCmt;
