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

const PatientSchema = new mongoose.Schema({
  UserType: { type: String, required: true },
  UserName: { type: String, required: true },
  // PatientId : {type: String, required: true}, 
  ProfilePicture: { type: String,default : "" },
  FirstName: { type: String, required: true },
  LastName: { type: String, required: true },
  DateOfBirth: { type: String, default : "" },
  BloodGroup: { type: String, default : ""},
  Gender: { type: String, default : ""},
  Email: { type: String, required: true, unique: true },
  Mobile: { type: Object, required : true  },
  LastVisit : { type: Date,default : new Date(Date.now()) },
  Paid : { type: Number, default : 0 },


    Address: { type: String, default : ""},
    City: { type: String, default : "" },
    State: { type: String,default : "" },
    ZipCode: { type: String,default : "" },
    Country: { type: String, default : ""},

  Password: { type: String, required: true },
  Extra: [{ type: Object, default: null }],
},{timestamps : true});

mongoose.models = {}; // to remove error

const model = mongoose.model("PatientData", PatientSchema);
export default model;
