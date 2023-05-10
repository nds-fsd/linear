const express = require("express");
const projectController = require("../controllers/project.controller.js");
const projectRouter = express.Router();

projectRouter.get("/", projectController.getAllProyects);
projectRouter.get("/:id", projectController.getProyectById);
projectRouter.post("/", projectController.createProject);
projectRouter.delete("/:id", projectController.deleteProjectById);
projectRouter.patch("/projects/:id", projectController.updateProjectById);

module.exports = projectRouter;
