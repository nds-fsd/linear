const Task = require("../mongo/schemas/task.schema.js");
const Project = require("../mongo/schemas/project.schema.js");
const Cycle = require("../mongo/schemas/cycle.schema.js");

const express = require("express");
const asyncHandler = require("express-async-handler");
const STATUS_ARRAY = require("../statusarray.js");
const utils = require("../utils/utils.js");

exports.getAllTasks = asyncHandler(async (req, res) => {
  const user = req.params.userid;
  const query = req.query;
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
    const groupedTasks = utils.sortTasksByStatus(allTasks);
    res.status(200).json(groupedTasks);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

exports.getTasksByProjectId = asyncHandler(async (req, res) => {
  try {
    const projectId = req.params.projectid;
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    const cycles = await Cycle.find({ project: projectId });
    const tasks = await Task.find({
      cycle: { $in: cycles.map((cycle) => cycle._id) },
    })
      .populate("user")
      .populate({
        path: "cycle",
        model: "Cycle",
        populate: { path: "project", model: "Project" },
      });
    const groupedTasks = utils.sortTasksByStatus(tasks);
    res.status(200).json(groupedTasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
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
  const asigneduser = { firstname, lastname, teamrole, email, _id: user._id };
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
    return res.status(400).json({ error: "Valid Status is needed" });
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
