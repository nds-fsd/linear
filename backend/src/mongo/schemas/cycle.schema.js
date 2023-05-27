const { Schema, model } = require("mongoose");
const STATUS_ARRAY = require("../../statusarray")

const cycleSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startdate: { type: Date },
  finishdate: { type: Date },
  project: { type: Schema.Types.ObjectId, ref: "Project" },
  status: {
    type: String,
    enum: STATUS_ARRAY,
  }
});

const Cycle = model("Cycle", cycleSchema);

module.exports = Cycle;