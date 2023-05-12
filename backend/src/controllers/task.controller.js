const Task = require("../mongo/schemas/task.schema.js");
const express = require("express");
const asyncHandler = require("express-async-handler");
const STATUS_ARRAY = require("../statusarray.js");

exports.getAllTasks = asyncHandler(async (req, res) => {
  const filter = req.body;
  try {
    const allTasks = await Task.find(filter).populate("user");
    if (allTasks.length === 0) {
      res.status(404).json({ message: "No hay tareas" });
      return;
    }
    const tasksWithoutUserPasswords = allTasks.map((task) => {
      const { _id, title, description, status, duedate, user, project } = task;
      const {firstname, lastname, teamrole, email } = user
      const asigneduser = {firstname, lastname, teamrole, email}
      const taskWithoutUserPassword = {
        _id, title, description, status, duedate, asigneduser, project
      }
      return taskWithoutUserPassword
    });

    const groupedTasks = tasksWithoutUserPasswords.reduce((acc, task) => {
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

exports.createTask = asyncHandler(async (req, res) => {
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

exports.getTaskById = asyncHandler(async (req, res) => {
  const selectedTasks = await Task.findById(req.params.id);
  res.json(selectedTasks);
});

exports.deleteTask = asyncHandler(async (req, res) => {
  const selectedTask = await Task.findByIdAndDelete(req.params.id);
  res.json(selectedTask);
});

exports.updateTaskById = asyncHandler(async (req, res) => {
  const filter = req.params.id;
  const selectedTask = await Task.findByIdAndUpdate(filter, req.body);
  res.json(selectedTask);
});
