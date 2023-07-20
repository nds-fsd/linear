const express = require("express");
const generalRouter = express.Router();
const taskRoutes = require("./task.router");
const projectRoutes = require("./project.router");
const userRoutes = require("./user.router");
const cycleRouter = require("./cycle.router");
const teamRouter = require("./team.router");
const notificationRouter = require("./notification.router")



const { jwtMiddleware, authRouter } = require("../security/jwt");

generalRouter.use("/", authRouter);
generalRouter.use("/tasks", taskRoutes);
generalRouter.use("/projects", jwtMiddleware, projectRoutes);
generalRouter.use("/users", jwtMiddleware, userRoutes);
generalRouter.use("/cycles", jwtMiddleware, cycleRouter);
generalRouter.use("/teams", jwtMiddleware, teamRouter);
generalRouter.use("/notifications", jwtMiddleware, notificationRouter);




module.exports = generalRouter;
