const mongoose = require("mongoose");

const UsrSchema = new mongoose.Schema({
    PersonalDetails: {
      UserId : { type: String, required: true },
      UserName : { type: String, required: true },
      ProfilePicture :  { type: String, required: true },
      FirstName: { type: String, required: true },
      LastName: { type: String, required: true },
      DateOfBirth: { type: Date, required: true },
      BloodGroup : { type: String, required: true },
      Email: { type: String, required: true, unique : true},
      Mobile: { type: String, required: true },
    } ,
    Address : {
      Address : { type: String, required: true },
      City : { type: String, required: true },
      State : { type: String, required: true },
      ZipCode : { type: String, required: true },
      Country : { type: String, required: true },
  
    },
    Password : { type: String, required: true },
    Extra: [{type : Object}],
  });

mongoose.models = {}; // to remove error

const model = mongoose.model("USRSchema", UsrSchema); 
export default model;