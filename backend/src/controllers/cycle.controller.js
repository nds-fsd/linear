const Cycle = require("../mongo/schemas/cycle.schema.js");
const express = require("express");
const asyncHandler = require("express-async-handler");
const STATUS_ARRAY = require("../statusarray.js");

exports.getAllCycles = asyncHandler(async (req, res) => {
  const query = req.query
  console.log(query)
  try {
    const allCycles = await Cycle.find(query).populate('project');
    if (allCycles.length === 0) {
      res.status(404).json({ message: "No hay Ciclos que coincidan con tu busqueda" });
      return
    }
    res.status(200).json(allCycles);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

exports.getCyclesByProject = asyncHandler(async (req, res) => {
  const { projectid }  = req.params
  let allCycles = []
  if(!projectid){
    res.status(400).json({ message: "ProjectId missing" });
    return
  }
  try {
    allCycles = await Cycle.find({ project:projectid }).populate('project');
    if (allCycles.length === 0) {
      res.status(404).json({ message: "No hay Ciclos que coincidan con tu busqueda" });
      return
    }
    res.status(200).json(allCycles);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});




exports.getCycleById = asyncHandler(async (req, res) => {
  const selectedCycle = await Cycle.findById(req.params.id);
  res.json(selectedCycle);
});

exports.createCycle = asyncHandler(async (req, res) => {
  const { title, description, status, duedate, project } =
    req.body;
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
    } else if (!project) {
      return res.status(400).json({ error: "Project is needed" });
    }
  const data = { title, description, status, duedate, project };
  const newCycle = new Cycle(data);
  await newCycle.save();
  res.json(newCycle);
});

exports.deleteCycleById = asyncHandler(async (req, res) => {
  const selectedCycle = await Cycle.findByIdAndDelete(req.params.id);
  res.json(selectedCycle);
});

exports.updateCycleById = asyncHandler(async (req, res) => {
  const filter = req.params.id;
  console.log(filter)
  const selectedCycle = await Cycle.findByIdAndUpdate(filter, req.body);
  res.json(selectedCycle);
});
