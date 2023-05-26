const express = require("express");
const cycleController = require("../controllers/cycle.controller.js");
const cycleRouter = express.Router();

cycleRouter.get("/", cycleController.getAllCycles);
cycleRouter.get("/by-project/:projectid", cycleController.getCyclesByProject);

cycleRouter.get("/:id", cycleController.getCycleById);
cycleRouter.post("/", cycleController.createCycle);
cycleRouter.delete("/:id", cycleController.deleteCycleById);
cycleRouter.patch("/:id", cycleController.updateCycleById);

module.exports = cycleRouter;