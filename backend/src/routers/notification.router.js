const express = require("express");
const notificationController = require("../controllers/notification.controller.js");
const notificationRouter = express.Router();

notificationRouter.get("/", notificationController.getAllNotifications);
notificationRouter.get("/:id", notificationController.getNotificationById);
notificationRouter.post("/", notificationController.createNotification);
notificationRouter.delete("/:id", notificationController.deleteNotificationById);
notificationRouter.patch("/:id", notificationController.updateNotificationById);

module.exports = notificationRouter;