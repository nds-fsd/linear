const Project = require("../mongo/schemas/project.schema.js");
const Team = require("../mongo/schemas/team.schema.js");
const Cycle = require("../mongo/schemas/cycle.schema.js");
const Task = require("../mongo/schemas/task.schema.js");
3;
const express = require("express");
const asyncHandler = require("express-async-handler");

exports.getAllProjects = asyncHandler(async (req, res) => {
  try {
    const allProjects = await Project.find();
    if (allProjects.length === 0) {
      res.status(204).json({ message: "No hay proyectos" });
      return;
    }
    res.status(200).json(allProjects);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

exports.getProjectById = asyncHandler(async (req, res) => {
  const selectedProjects = await Project.findById(req.params.id);
  res.json(selectedProjects);
});

exports.createProject = asyncHandler(async (req, res) => {
  const { title, startdate, finishdate, active, description } = req.body;
  const requiredFields = [
    "title",
    "startdate",
    "finishdate",
    "active",
    "description",
  ];
  const missingFields = requiredFields.filter((field) => !req.body[field]);
  if (missingFields.length > 0) {
    return res
      .status(400)
      .json({ message: "Missing information", missingFields });
  }

  const data = { title, active, startdate, finishdate, description };
  const userId = req.jwtPayload.id;
  const newProject = await Project.create(data);
  const newTeam = await Team.create({
    title,
    users: [userId],
    project: newProject._id,
    admin: userId,
    active: true,
  });

  await newProject.save();
  await newTeam.save();
  const payload = { newTeam, newProject };

  res.status(201).json(payload);
});

exports.deleteProjectById = asyncHandler(async (req, res) => {
  try {
    const selectedTeam = await Team.findById(req.params.id);
    const selectedProject = await Project.findById(selectedTeam.project);
    const selectedCycles = await Cycle.find({ project: selectedProject._id });

    // Create an array of promises for deletion
    const deletionPromises = [];
    // Delete teams
    deletionPromises.push(Team.findByIdAndDelete(selectedTeam._id));
    // Delete project
    deletionPromises.push(Project.findByIdAndDelete(selectedTeam.project));
    // Delete cycles
    selectedCycles.forEach((cycle) => {
      deletionPromises.push(Cycle.findByIdAndDelete(cycle._id));
    });
    // Delete tasks
    selectedCycles.forEach((cycle) => {
      deletionPromises.push(Task.deleteMany({ cycle: cycle._id }));
    });
    // Wait for all the deletion promises to complete
    await Promise.all(deletionPromises);
    res.json({ message: `${selectedProject.title} deleted` });
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

exports.updateProjectById = asyncHandler(async (req, res) => {
  const filter = req.params.id;
  const selectedProject = await Project.findByIdAndUpdate(filter, req.body);
  res.json(selectedProject);
});
