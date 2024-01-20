const mongoose = require("mongoose");

// Define a nested schema for the subdocument
const slotSchema = new mongoose.Schema({
    Start: { type: String, default : ""},
    End: { type: String, default : ""},
  });

const timingSchema = new mongoose.Schema(
  {
    Email: { type: String, required: true, unique : true },
    Monday: { type: [slotSchema] },
    Tuesday: { type: [slotSchema] },
    Wednesday: { type: [slotSchema] },
    Thursday: { type: [slotSchema] },
    Friday: { type: [slotSchema] },
    Saturday: { type: [slotSchema] },
    Sunday: { type: [slotSchema] },
  },
  {
    strict: true,
    timestamps : true
  }
);

mongoose.models = {}; // to remove error

const model = mongoose.model("scheduleTiming", timingSchema);
export default model;
