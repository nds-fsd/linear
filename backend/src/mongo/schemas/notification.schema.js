const { Schema, model } = require("mongoose");

const notificationSchema = new Schema({
  title: { type: String, required: true },
  seen: { type: Boolean, required: true },
  type: {
    type: String,
    enum: ["invitation"],
    required: true,
  },
  message: { type: String, required: true },
  sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
  receiver: { type: Schema.Types.ObjectId, ref: "User", required: true },
  data: { type: Object },
  date: { type: Date, required: true },
});

const Notification = model("Notification", notificationSchema);

module.exports = Notification;
