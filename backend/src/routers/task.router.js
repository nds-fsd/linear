const express = require("express");
const taskController = require("../controllers/task.controller.js")
const taskRouter = express.Router();

taskRouter.get("/", taskController.getAllTasks);
taskRouter.get("/:id", taskController.getTaskById);
taskRouter.post("/", taskController.createTask);
taskRouter.delete("/:id", taskController.deleteTask);
taskRouter.patch("/:id", taskController.updateTaskById);

module.exports = taskRouter;
