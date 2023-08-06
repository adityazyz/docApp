const mongoose = require("mongoose");

const EmpSchema = new mongoose.Schema(
  {
    PersonalDetails: {
      UserId: { type: String, required: true },
      UserName: { type: String, required: true },
      ProfilePicture: { type: String, required: true },
      FirstName: { type: String, required: true },
      LastName: { type: String, required: true },
      DateOfBirth: { type: Date, required: true },
      Email: { type: String, required: true, unique: true },
      Mobile: { type: String, required: true },
      Gender: { type: String, required: true },
      Biography: { type: String, required: true },
    },
    Address: {
      Address: { type: String, required: true },
      City: { type: String, required: true },
      State: { type: String, required: true },
      ZipCode: { type: String, required: true },
      Country: { type: String, required: true },
    },
    Pricing: { type: Number, required: true, default: null },
    Service: {
      Specializations: [{ type: String }],
      Services: [{ type: String }],
    },
    Education: [
      {
        Degree: { type: String },
        College: { type: String },
        YearOfCompletion: { type: String },
      },
    ],
    Experience: [
      {
        Place: { type: String },
        From: { type: String },
        Till: { type: String },
        Designation: { type: String },
      },
    ],
    Password: { type: String, required: true },
    WorkPlaceInfo: [
      {
        Name: { type: String },
        Address: { type: String },
        Images: [{ type: String }],
      },
    ],
    Award: [
      {
        Name: { type: String },
        Year: { type: String },
      },
    ],
    Memberships: [{ type: String }],
    Extra: [{type : Object}],
  },
);

mongoose.models = {}; // to remove error

const model = mongoose.model("EMPSchema", EmpSchema);
export default model;
