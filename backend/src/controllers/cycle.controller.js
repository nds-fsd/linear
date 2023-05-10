const Cycle = require("../mongo/schemas/cycle.schema.js");
const express = require("express");
const asyncHandler = require("express-async-handler");

exports.getAllCycles = asyncHandler(async (req, res) => {
  try {
    const allCycles = await Cycle.find();
    if (allProjects.length === 0) {
      res.status(404).json({ message: "No hay proyectos" });
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
  const { title, description, status, duedate, cyclemanager, project } =
    req.body;
  const data = { title, description, status, duedate, cyclemanager, project };
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
  const selectedCycle = await Cycle.findByIdAndUpdate(filter, req.body);
  res.json(selectedCycle);
});
