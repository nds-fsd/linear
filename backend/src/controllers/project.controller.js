const Project = require("../mongo/schemas/project.schema.js");
const express = require("express");
const asyncHandler = require("express-async-handler");

exports.getAllProyects = asyncHandler(async (req, res) => {
  try {
    const allProjects = await Project.find();
    if (allProjects.length === 0) {
      res.status(404).json({ message: "No hay proyectos" })
      return;
    }
    res.status(200).json(allProjects);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

exports.getProyectById = asyncHandler(async (req, res) => {
  const selectedProjects = await Project.findById(req.params.id);
  res.json(selectedProjects);
});

exports.createProject = asyncHandler(async (req, res) => {
  const { title, startdate, finishdate, projectmanager ,status} = req.body;
  const data = { title, status, startdate, finishdate, projectmanager };
  const newProject = new Project(data);
  await newProject.save();
  res.json(newProject);
});

exports.deleteProjectById = asyncHandler(async (req, res) => {
  const selectedProject = await Project.findByIdAndDelete(req.params.id);
  res.json(selectedProject);
});

exports.updateProjectById = asyncHandler(async (req, res) => {
  const filter = req.params.id;
  const selectedProject = await Project.findByIdAndUpdate(filter, req.body);
  res.json(selectedProject);
});
