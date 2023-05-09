const { Schema, model } = require("mongoose");

//const regex =  [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email']

const projectSchema = new Schema(
  {
    title: { type: String, required: true },
    started: { type: Date },
    finishdate: { type: Date },
  },
  { timestamps: true }
);

const Project = model("Project", projectSchema);
//coment
module.exports = Project;
