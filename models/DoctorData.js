// logic to play with dates
// let d = new Date(Date.now());

// let day = d.toLocaleDateString({weekday:'long'});
// let date = d.toLocaleDateString().split("/")[0]
// let month = d.toLocaleString('default', { month: 'long' })
// let year = d.toLocaleDateString().split("/")[2]
 
// let datetime = d.toLocaleString()
// let time = `${datetime.split(" ")[1].split(":")[0]}:${datetime.split(" ")[1].split(":")[1]} ${datetime.split(" ")[2]}`
// console.log(time)

const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  AccountStatus : { type: Number, required: true },
  UserType: { type: String, required: true },
  UserName: { type: String, required: true },
  ProfilePicture: { type: String, default : "" },
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  DateOfBirth: { type: String, default : ""},
  Email: { type: String, required: true, unique: true },
  LastVisit : { type: Date,default : new Date(Date.now()) },
  Mobile: {
    Number : { type: String },
    iso2 : { type: String },
    dialCode : { type: String },
  },
  Gender: { type: String, default : ""},
  Biography: { type: String , default : ""},

  Address: {
    Address: { type: String,default : "" },
    City: { type: String, default : "" },
    State: { type: String, default : "" },
    ZipCode: { type: String,default : "" },
    Country: { type: String, default : ""},
  },
  Pricing: { type: Number,  default: 0 },
  Earned : { type: Number,  default: 0 },
  Service: {
    Specializations: [{ type: String }],  // array of string
    Services: [{ type: String }],  // array of string 
  },
  Education: [ // array of struct
    {
      Degree: { type: String , default : ""},
      College: { type: String , default : "" },
      YearOfCompletion: { type: String , default : "" },
    },
  ],
  Experience: [
    {
      Place: { type: String , default : ""},
      From: { type: String , default : ""},
      Till: { type: String , default : ""},
      Designation: { type: String , default : ""},
    },
  ],
  Password: { type: String, required: true },
  ClinicInfo: {
      ClinicName: { type: String , default : ""},
      ClinicAddress: { type: String , default : ""},
      ClinicImages: [{ type: String , default : []}], // array of strings
    },
  Award: [
    {
      AwardName: { type: String , default : "" }, 
      AwardYear: { type: String , default : "" }, 
      AwardBy : { type: String , default : "" },  
    },
  ], 
  Memberships: [{ type: String }], // array of strings
  Registration : 
    {
      RegistrationNumber : { type: String , default : ""},
      RegistrationYear : { type: String , default : ""},
      
    }
  ,
  Socials : {
    // social handles here
    Facebook : { type: String , default : ""},
    Twitter : { type: String , default : ""},
    Instagram : { type: String , default : ""},
    Pinterest : { type: String , default : ""},
    Linkedin : { type: String , default : ""},
    Youtube : { type: String , default : ""},
  },
  Extra: [{ type: Object, default: null }],
  
},{timestamps : true});

mongoose.models = {}; // to remove error

const model = mongoose.model("DoctorData", DoctorSchema);
export default model;
