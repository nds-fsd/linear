const express = require("express");
const teamController = require("../controllers/team.controller.js");
const teamRouter = express.Router();

teamRouter.get("/", teamController.getAllTeams);
teamRouter.get("/:id", teamController.getTeamById);
teamRouter.post("/", teamController.createTeam);
teamRouter.delete("/:id", teamController.deleteTeamById);
teamRouter.patch("/:id", teamController.updateTeamById);

module.exports = teamRouter;