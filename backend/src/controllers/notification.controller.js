const Notification = require("../mongo/schemas/notification.schema.js");
const express = require("express");
const asyncHandler = require("express-async-handler");
const crudService = require("../services/crud-service.js");

exports.getAllNotifications = crudService.getAll({
    populationFields: ["sender"],
    entity: "Notifications",
    model: Notification,
  });
  
  exports.getNotificationById = crudService.getOne({
    model: Notification,
    populationFields: ["sender", "reciever"],
  });
  
  exports.createNotification = crudService.createOne({
    model: Notification,
    requiredKeys: ["title", "message", "sender", "receiver", "date", "type", "seen"],
  });
  
  exports.deleteNotificationById = crudService.deleteOne(Notification);
  
  exports.updateNotificationById = crudService.updateOne(Notification);