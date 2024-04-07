const mongoose = require("mongoose");

const MyPatientsSchema = new mongoose.Schema(
  {
    DoctorEmail : { type: String, required: true, unique: true },
    PatientEmail : [{ type: String, default:[]},]
  },
  { 
    timestamps: true,
  }
);



mongoose.models = {}; // to remove error

const model = mongoose.model("MyPatients", MyPatientsSchema);
export default model;
