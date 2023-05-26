const { Schema, model } = require("mongoose");

//const regex =  [/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please enter a valid email']

const teamSchema = new Schema(
  {
    title: { type: String, required: true },
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    project: { type: Schema.Types.ObjectId, ref: "Project" },
    admin: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Team = model("Team", teamSchema);
//coment
module.exports = Team;
