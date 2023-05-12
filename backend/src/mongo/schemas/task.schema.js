const { Schema, model } = require("mongoose");
const STATUS_ARRAY = require("../../statusarray")


const taskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: STATUS_ARRAY,
    required: true,
  },
  duedate: { type: Date },
  user: { type: Schema.Types.ObjectId, ref: "User" },
  cycle: { type: Schema.Types.ObjectId, ref: "Cycle" },
  project: { type: Schema.Types.ObjectId, ref: "Project" },
});

const Task = model("Task", taskSchema);

module.exports = Task;
