const mongoose = require("mongoose");

const specialitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
  },
  {
    strict: true,
    timestamps : true
  }
);

mongoose.models = {}; // to remove error

const model = mongoose.model("specialities", specialitySchema);
export default model;
