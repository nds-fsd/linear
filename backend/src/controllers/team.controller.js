const Team = require("../mongo/schemas/team.schema.js");
const express = require("express");
const asyncHandler = require("express-async-handler");

exports.getAllTeams = asyncHandler(async (req, res) => {
  try {
    const allTeams = await Team.find();
    if (allTeams.length === 0) {
      res.status(404).json({ message: "No teams to display" });
      return;
    }
    res.status(200).json(allTeams);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

exports.getTeamById = asyncHandler(async (req, res) => {
  const selectedTeam = await Team.findById(req.params.id);
  res.json(selectedTeam);
});

exports.createTeam = asyncHandler(async (req, res) => {
  const { title } = req.body;
  const data = { title };
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