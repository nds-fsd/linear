const Team = require("../mongo/schemas/team.schema.js");
const express = require("express");
const asyncHandler = require("express-async-handler");
const { getAll } = require("../db-service.js");

exports.getAllTeams = asyncHandler(async (req, res) => {
  try {
    const allTeams = await getAll(req,{
        model:Teams,
        populationFields:['project','users'],
        entity:"Teams"
     });
    if (allTeams.length === 0) {
      res.status(404).json({ message: "No teams to display" });
      return;
    }
    res.status(200).json(allTeams);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

exports.getTeamsByUserId = asyncHandler(async (req, res) => {
  try {
    const allTeams = await Team.find({ users: req.query.userid })
      .populate("project")
      .populate("users");
    if (allTeams.length === 0) {
      res.status(404).json({ message: "No teams to display with this search" });
      return;
    }
    res.status(200).json(allTeams);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

exports.getTeamById = asyncHandler(async (req, res) => {
  const selectedTeam = await Team.findById(req.params.id).populate("project").populate("users");
  res.json(selectedTeam);
});

exports.createTeam = asyncHandler(async (req, res) => {
  const { title, users, project } = req.body;
  const data = { title, users, project };
  const newTeam = new Team(data);
  await newTeam.save();
  res.json(newTeam);
});

exports.deleteTeamById = asyncHandler(async (req, res) => {
  const selectedTeam = await Team.findByIdAndDelete(req.params.id);
  res.json(selectedTeam);
});

exports.updateTeamById = asyncHandler(async (req, res) => {
  const filter = req.params.id;
  const selectedTeam = await Team.findByIdAndUpdate(filter, req.body);
  res.json(selectedTeam);
});
