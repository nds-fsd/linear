const Cycle = require("../mongo/schemas/cycle.schema.js");
const express = require("express");
const asyncHandler = require("express-async-handler");
const STATUS_ARRAY = require("../statusarray.js");
const crudService = require("../services/crud-service.js");

exports.getAllCycles = crudService.getAll({
  populationFields: ["project"],
  entity: "Cycles",
  model: Cycle,
});

exports.getCyclesByProject = asyncHandler(async (req, res) => {
  const { projectid } = req.params;
  let allCycles = [];
  if (!projectid) {
    res.status(400).json({ message: "ProjectId missing" });
    return;
  }
  try {
    allCycles = await Cycle.find({ project: projectid }).populate("project");
    if (allCycles.length === 0) {
      res
        .status(200)
        .json([]);
      return;
    }
    res.status(200).json(allCycles);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

exports.getCycleById = crudService.getOne({
  model: Cycle,
  populationFields: ["project"],
});

exports.createCycle = crudService.createOne({
  model: Cycle,
  requiredKeys: ["title", "description", "startdate", "finishdate", "project", "active"],
});

exports.deleteCycleById = crudService.deleteOne(Cycle);

exports.updateCycleById = crudService.updateOne(Cycle);
