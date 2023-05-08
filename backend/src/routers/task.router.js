const express = require("express");
const Task = require("../mongo/schemas/task.schema.js");
const taskRouter = express.Router();
const STATUS_ARRAY = require("../statusarray.js");

//Gets all of the tasks
taskRouter.get("/", async (req, res) => {
  try {
    const allTasks = await Task.find();
    if (allTasks.length === 0) {
      res.status(404).json({ message: "No hay tareas" });
    }
    const groupedTasks = allTasks.reduce((acc, task) => {
      if (!acc[task.status]) {
        acc[task.status] = [];
      }
      acc[task.status].push(task);
      return acc;
    }, {});
    res.status(200).json(groupedTasks);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

// Gets a single task by id
taskRouter.get("/:id", async (req, res) => {
  const selectedTasks = await Task.findById(req.params.id);
  res.json(selectedTasks);
});

//Posts a single task
taskRouter.post("/", async (req, res) => {
  const { title, status, description, project, user, duedate } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is needed" });
  } else if (!STATUS_ARRAY.includes(status)) {
    return res.status(400).json({ error: "Valid Status is needed" });
  } else if (!description) {
    return res.status(400).json({ error: "Description is needed" });
  } else if (!status) {
    return res.status(400).json({ error: "Status is needed" });
  } else if (!duedate) {
    return res.status(400).json({ error: "Due date is needed" });
  }
  const data = { title, status, description, project, user, duedate };
  const newTask = new Task(data);
  await newTask.save();
  res.status(201).json(newTask);
});

//Deletes a single task by ID
taskRouter.delete("/:id", async (req, res) => {
  const selectedTask = await Task.findByIdAndDelete(req.params.id);
  res.json(selectedTask);
});

//Updates the status of a single task by id
taskRouter.patch("/:id", async (req, res) => {
  const filter = req.params.id;
  const selectedTask = await Task.findByIdAndUpdate(filter, req.body);
  res.json(selectedTask);
});

// Updates the status of a single project by title
taskRouter.patch("/:id", async (req, res) => {
  const filter = req.data.status;
  const selectedTask = await Task.findOneAndUpdate(filter, req.body.id);
  res.json(selectedTask);
});

module.exports = taskRouter;
