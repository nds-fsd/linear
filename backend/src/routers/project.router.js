const express = require("express");
const projectController = require("../controllers/project.controller.js");
const projectRouter = express.Router();

projectRouter.get("/", projectController.getAllProjects);
projectRouter.get("/:id", projectController.getProjectById);
projectRouter.post("/", projectController.createProject);
projectRouter.delete("/:id", projectController.deleteProjectById);
projectRouter.patch("/:id", projectController.updateProjectById);

module.exports = projectRouter;
