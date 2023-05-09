const express = require("express");
const generalRouter = express.Router();
const taskRoutes = require("./task.router");
const projectRoutes = require("./project.router");
const userRoutes = require("./user.router");


const { jwtMiddleware, authRouter } = require("../security/jwt");

generalRouter.use("/", authRouter);
generalRouter.use("/tasks",     jwtMiddleware, taskRoutes);
generalRouter.use("/projects",  jwtMiddleware, projectRoutes);
generalRouter.use("/users",     jwtMiddleware, userRoutes);



module.exports = generalRouter;