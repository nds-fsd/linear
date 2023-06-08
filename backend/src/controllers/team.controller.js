const Team = require("../mongo/schemas/team.schema.js");
const Notification = require("../mongo/schemas/notification.schema.js")
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
  const payload = req.jwtPayload
  try {
    if (userId) {
      const teamPending = await Team.findOne({
        _id: filter,
        pendingusers: userId,
      });
      const teamUsers = await Team.findOne({ _id: filter, users: userId });
      if (teamPending || teamUsers) {
        res.status(400).json({
          message:
            "User is already part of the project or in the pending for acceptance list",
        });
        return;
      } else {
        const selectedTeam = await Team.findByIdAndUpdate(
          filter,
          { $push: { pendingusers: userId } },
          { new: true }
        );
        const data = {
          title: "Invitation to a new project",
          seen: false,
          date: new Date(),
          type: "invitation",
          message: "You have been invited to",
          sender: payload.id,
          receiver: userId,
          data: {
            teamid: selectedTeam._id,
            teamtitle:selectedTeam.title
          },
        }
        const newNotification = new Notification(data);
        await newNotification.save();
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
