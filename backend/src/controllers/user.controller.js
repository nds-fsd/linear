const User = require("../mongo/schemas/user.schema.js");
const express = require("express");
const asyncHandler = require("express-async-handler");

exports.getAllUsers = asyncHandler(async (req, res) => {
  try {
    const allUsers = await User.find().select('-password');
    if (allUsers.length === 0) {
      res.status(404).json({ message: "No hay usuarios" });
    }
    res.status(200).json(allUsers);
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

exports.getUserById = asyncHandler(async (req, res) => {
  const selectedUser = await User.findById(req.params.id)
    .select("-password")
  res.json(selectedUser);
});

exports.updateUserById = asyncHandler(async (req, res) => {
  const selectedUser = await User.findByIdAndUpdate(req.params.id, req.body, {new:true});
  const jwtPayload = req.headers.authorization
  console.log(jwtPayload)
  res.json(selectedUser);
});

exports.deleteUserById = asyncHandler(async (req, res) => {
  const selectedUser = await User.findByIdAndDelete(req.params.id);
  res.json(selectedUser);
});
