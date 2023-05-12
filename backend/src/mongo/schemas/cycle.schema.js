const { Schema, model } = require("mongoose");
const STATUS_ARRAY = require("../../statusarray")

const cycleSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: STATUS_ARRAY,
    required: true,
  },
  startdate: { type: Date },
  finishdate: { type: Date },
  project: { type: Schema.Types.ObjectId, ref: "Project" },
});

const Cycle = model("Cycle", cycleSchema);

module.exports = Cycle;