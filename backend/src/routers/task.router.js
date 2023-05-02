const express = require("express");
const Task = require("../mongo/schemas/task.schema.js");
const taskRouter = express.Router();


//Gets all of the tasks
taskRouter.get("/tasks", async (req, res) => {
  try {
    const allTasks = await Task.find();
    if (allTasks.length === 0) {
      res.status(404).json({ message: "No hay tareas" });
    }
    res.status(200).json(allTasks);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

// Gets a single task by id
taskRouter.get("/tasks/:id", async (req, res) => {
  const selectedTasks = await Task.findById(req.params.id);
  res.json(selectedTasks);
});

//Gets a single task by title
// taskRouter.get("/tasks/query/:title", async (req, res) => {
//   const filter=req.params.title
//   const selectedTasks = await Task.find(filter);
//   res.json(selectedTasks);
  
// });

//Posts a single task
taskRouter.post("/tasks", async (req, res) => {
  const { 
    title, author, status } = req.body;
  const data = { title, author, status} ;
  const newTask = new Task(data);
  await newTask.save();
  res.json(newTask);
});


//Deletes a single task by ID
taskRouter.delete("/tasks/:id", async (req, res) => {
  const selectedTask = await Task.findByIdAndDelete(req.params.id);
  res.json(selectedTask);
});

//Deletes a single task by title
// taskRouter.delete("/tasks/query/:title", async (req, res) => {
//   const filter=req.params.title
//   const selectedTask = await Task.findOneAndDelete(req.params.title);
//   res.json(selectedTask);
// });


//Updates the status of a single task by id
taskRouter.patch("/:id", async (req, res) => {
  const filter=req.params.id
  const selectedTask = await Task.findByIdAndUpdate(filter,req.body);
  res.json(selectedTask);
});

// Updates the status of a single project by title
taskRouter.patch("/tasks/query/:status", async (req, res) => {
  const filter=req.params.status
  const selectedTask = await Task.findOneAndUpdate(filter,req.body);
  res.json(selectedTask);
});

module.exports = taskRouter;
