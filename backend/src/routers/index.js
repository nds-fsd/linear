const express = require("express");
const generalRouter = express.Router();
const taskRoutes = require("./task.router");
const projectRoutes = require("./project.router");
const userRoutes = require("./user.router");
const cycleRouter = require("./cycle.router");
const teamRouter = require("./team.router");



const { jwtMiddleware, authRouter } = require("../security/jwt");

generalRouter.use("/", authRouter);
generalRouter.use("/tasks", jwtMiddleware, taskRoutes);
generalRouter.use("/projects", jwtMiddleware, projectRoutes);
generalRouter.use("/users", jwtMiddleware, userRoutes);
generalRouter.use("/cycles", jwtMiddleware, cycleRouter);
generalRouter.use("/teams", jwtMiddleware, teamRouter);



module.exports = generalRouter;
