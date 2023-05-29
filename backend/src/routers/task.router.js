const express = require("express");
const taskController = require("../controllers/task.controller.js");
const taskRouter = express.Router();

taskRouter.get("/", taskController.getAllTasks);
taskRouter.get("/by-user/:userid", taskController.getAllTasks);
taskRouter.get("/by-project/:projectid", taskController.getTasksByProjectId);
taskRouter.get("/:id", taskController.getTaskById);
taskRouter.post("/", taskController.createTask);
taskRouter.delete("/:id", taskController.deleteTask);
taskRouter.patch("/:id", taskController.updateTaskById);
taskRouter.patch("/status/:id", taskController.updateTaskStatus);

module.exports = taskRouter;
