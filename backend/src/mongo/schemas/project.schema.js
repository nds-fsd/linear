const { Schema, model } = require("mongoose");
const STATUS_ARRAY = require("../../statusarray")


const projectSchema = new Schema(
  {
    title: { type: String, required: true },
    startdate: { type: Date },
    finishdate: { type: Date },
    description:{ type: String, required: true },
    active:{type: Boolean, required:true}
  },
  { timestamps: true }
);

const Project = model("Project", projectSchema);


module.exports = Project;
