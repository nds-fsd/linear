const Team = require("../mongo/schemas/team.schema.js");
const express = require("express");
const asyncHandler = require("express-async-handler");
const { getAll } = require("../services/db-service.js");

exports.getAllTeams = asyncHandler(async (req, res) => {
  try {
    const allTeams = await getAll({
      model: Team,
      populationFields: ["project", "users", "pendingusers"],
      entity: "Teams",
      query: req.query,
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
      .populate("users")
      .populate("pendingusers");
    if (allTeams.length === 0) {
      res.status(200).json([]);
      return;
    }
    res.status(200).json(allTeams);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

exports.getTeamById = asyncHandler(async (req, res) => {
  const selectedTeam = await Team.findById(req.params.id)
    .populate("project")
    .populate("users")
    .populate("pendingusers");
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
  const userId = req.body.userId;
  console.log(req.body);
  try {
    if (userId) {
      const team = await Team.findOne({ _id: filter, pendingusers: userId });

      if (team) {
        res
          .status(400)
          .json({ message: "User is already in the pending list" });
        return;
      } else {
        const selectedTeam = await Team.findByIdAndUpdate(
          filter,
          { $push: { pendingusers: userId } },
          { new: true }
        );
        res
          .status(200)
          .json({ message: "User has been invited, waiting for confirmation" });
        return;
      }
    } else {
      const selectedTeam = await Team.findByIdAndUpdate(filter, req.body);
      res.status(200).res.json(selectedTeam);
      return;
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});
