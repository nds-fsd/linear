const { Schema, model } = require("mongoose");

const taskSchema = new Schema({
  title: { type: String, required: true },
  status: {
    type: String,
    enum: ["backlog", "inprogress", "todo", "done"],
    required: true,
  },
  description: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  project: { type: Schema.Types.ObjectId, ref: "Project" },
});

const Task = model("Task", taskSchema);

module.exports = Task;
