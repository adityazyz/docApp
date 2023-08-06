const mongoose = require("mongoose");

const demoSchema = new mongoose.Schema({
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    DateOfBirth: { type: Date, required: true },  // yyyy-mm-dd
    Email: { type: String, required: true, unique : true},
    Mobile: { type: String, required: true },
  },{
    strict : false
  });

mongoose.models = {}; // to remove error

const model = mongoose.model("Demo", demoSchema);
export default model;
