const express = require("express");
const Project = require("../mongo/schemas/project.schema.js");
const projectRouter = express.Router();

//Gets all of the projects
projectRouter.get("/projects", async (req, res) => {
  try {
    const allProjects = await Project.find();
    if (allProjects.length === 0) {
      res.status(404).json({ message: "No hay proyectos" });
    }
    res.status(200).json(allProjects);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

// Gets a single project by id
projectRouter.get("/projects/:id", async (req, res) => {
  const selectedProjects = await Project.findById(req.params.id);
  res.json(selectedProjects);
});

//Gets a single project by title
projectRouter.get("/projects/query/:title", async (req, res) => {
  const filter = { title: req.params.title };
  const selectedProject = await Project.find(filter);
  res.json(selectedProject);
});

//Posts a single project
projectRouter.post("/projects", async (req, res) => {
  const { title } = req.body;
  const data = { title };
  const newProject = new Project(data);
  await newProject.save();
  res.json(newProject);
});

//Deletes a single project by ID
projectRouter.delete("/projects/:id", async (req, res) => {
  const selectedProject = await Project.findByIdAndDelete(req.params.id);
  res.json(selectedProject);
});

//Deletes a single project by title
projectRouter.delete("/projects/query/:title", async (req, res) => {
  const filter = { title: req.params.title };
  const selectedProject = await Project.findOneAndDelete(req.params.title);
  res.json(selectedProject);
});

//Updates the title of a single project by id
projectRouter.patch("/projects/:id", async (req, res) => {
  const filter = { title: req.params.id };
  const selectedProject = await Project.findByIdAndUpdate(filter, req.body);
  res.json(selectedProject);
});

// Updates the title of a single project by title
projectRouter.patch("/projects/query/:title", async (req, res) => {
  const filter = { title: req.params.title };
  const selectedProject = await Project.findOneAndUpdate(filter, req.body);
  res.json(selectedProject);
});

module.exports = projectRouter;
