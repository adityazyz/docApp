const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  ProfilePicture: { type: String, default: "" }, 
  Name: { type: String, required: true },
  DateOfBirth: { type: String, default: "" },
  Email: { type: String, required: true, unique: true },
  Mobile: { type: String, required: true },
  Password: { type: String, required: true },
  Address: {
    Address: { type: String, default: "" },
    City: { type: String, default: "" },
    State: { type: String, default: "" },
    ZipCode: { type: String, default: "" },
    Country: { type: String, default: "" },
  },
},
{
  timestamps : true
});

mongoose.models = {}; // to remove error

const model = mongoose.model("AdminData", AdminSchema);
export default model;
