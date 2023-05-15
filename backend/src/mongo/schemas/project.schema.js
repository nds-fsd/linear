const { Schema, model } = require("mongoose");
const STATUS_ARRAY = require("../../statusarray")

//const regex =  [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email']

const projectSchema = new Schema(
  {
    title: { type: String, required: true },
    startdate: { type: Date },
    finishdate: { type: Date },
    description:{ type: String, required: true },
    status: {
      type: String,
      enum: STATUS_ARRAY,
      required: true,
    },
  },
  { timestamps: true }
);

const Project = model("Project", projectSchema);


module.exports = Project;
