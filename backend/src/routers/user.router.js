const express = require("express");
const userController = require("../controllers/user.controller.js")
const userRouter = express.Router();

userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id", userController.getUserById);
userRouter.patch("/:id", userController.updateUserById );
userRouter.delete("/:id",userController.deleteUserById );

module.exports = userRouter;
