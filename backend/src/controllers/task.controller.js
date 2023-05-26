const Task = require("../mongo/schemas/task.schema.js");
const express = require("express");
const asyncHandler = require("express-async-handler");
const STATUS_ARRAY = require("../statusarray.js");

exports.getAllTasks = asyncHandler(async (req, res) => {
  const user = req.params.userid;
  const query = req.query
  let allTasks = [];
  if (!user) {
    allTasks = await Task.find(query)
      .populate("user")
      .populate({
        path: "cycle",
        model: "Cycle",
        populate: { path: "project", model: "Project" },
      });
  } else {
    allTasks = await Task.find({ user })
      .populate("user")
      .populate({
        path: "cycle",
        model: "Cycle",
        populate: { path: "project", model: "Project" },
      });
  }

  try {
    if (allTasks.length === 0) {
      res
        .status(404)
        .json({ message: "No hay tareas que coincidan con tu busqueda" });
      return;
    }
    const tasksWithoutUserPasswords = allTasks.map((task) => {
      const { _id, title, description, status, duedate, user, cycle } = task;
      const { firstname, lastname, teamrole, email } = user;
      const asigneduser = { firstname, lastname, teamrole, email, _id:user._id };
      const taskWithoutUserPassword = {
        _id,
        title,
        description,
        status,
        duedate,
        asigneduser,
        cycle,
      };
      return taskWithoutUserPassword;
    });

    const groupedTasks = tasksWithoutUserPasswords.reduce(
      (acc, task) => {
        if (!acc[task.status]) {
          acc[task.status] = [];
        }
        acc[task.status].push(task);
        return acc;
      },
      {
        backlog: [],
        todo: [],
        inprogress: [],
        done: [],
      }
    );
    res.status(200).json(groupedTasks);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

exports.createTask = asyncHandler(async (req, res) => {
  const { title, status, description, user, duedate, cycle } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is needed" });
  } else if (!status || !STATUS_ARRAY.includes(status)) {
    return res.status(400).json({ error: "Valid Status is needed" });
  } else if (!description) {
    return res.status(400).json({ error: "Description is needed" });
  } else if (!duedate) {
    return res.status(400).json({ error: "Due date is needed" });
  } else if (!cycle) {
    return res.status(400).json({ error: "Cycle is needed" });
  }
  const data = { title, status, description, user, duedate, cycle };
  const newTask = new Task(data);
  await newTask.save();
  res.status(201).json(newTask);
});

exports.getTaskById = asyncHandler(async (req, res) => {
  const selectedTask = await Task.findById(req.params.id)
    .populate("user")
    .populate({
      path: "cycle",
      model: "Cycle",
      populate: { path: "project", model: "Project" },
    });
  const { _id, title, description, status, duedate, user, cycle } =
    selectedTask;
  const { firstname, lastname, teamrole, email } = user;
  const asigneduser = { firstname, lastname, teamrole, email, _id:user._id };
  const taskWithoutUserPassword = {
    _id,
    title,
    description,
    status,
    duedate,
    asigneduser,
    cycle,
  };
  res.json(taskWithoutUserPassword);
});

exports.deleteTask = asyncHandler(async (req, res) => {
  const selectedTask = await Task.findByIdAndDelete(req.params.id);
  res.json(selectedTask);
});

exports.updateTaskById = asyncHandler(async (req, res) => {
  const filter = req.params.id;
  const { title, status, description, user, duedate, cycle } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is needed" });
  } else if (!status || !STATUS_ARRAY.includes(status)) {
    return res.status(400).json({ error: "Valid Status is needed" });
  } else if (!description) {
    return res.status(400).json({ error: "Description is needed" });
  } else if (!duedate) {
    return res.status(400).json({ error: "Due date is needed" });
  } else if (!cycle) {
    return res.status(400).json({ error: "Cycle is needed" });
  }
  const selectedTask = await Task.findByIdAndUpdate(filter, req.body);
  res.json(selectedTask);
});

exports.updateTaskStatus = asyncHandler(async (req, res) => {
  const filter = req.params.id;
  const { title, status, description, user, duedate, cycle } = req.body;
  if (title) {
    return res
      .status(400)
      .json({ error: "This endpoint is only for updating status" });
  } else if (!status || !STATUS_ARRAY.includes(status)) {
    return res
      .status(400)
      .json({ error: "Valid Status is needed" });
  } else if (description) {
    return res
      .status(400)
      .json({ error: "This endpoint is only for updating status" });
  } else if (duedate) {
    return res
      .status(400)
      .json({ error: "This endpoint is only for updating status" });
  } else if (cycle) {
    return res
      .status(400)
      .json({ error: "This endpoint is only for updating status" });
  }
  const selectedTask = await Task.findByIdAndUpdate(filter, req.body);
  res.json(selectedTask);
});
