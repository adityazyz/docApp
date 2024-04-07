const mongoose = require("mongoose");

const FavouriteDoctorsSchema = new mongoose.Schema(
  {
    

    PatientEmail: { type: String, required: true, unique: true },
    DoctorEmail: [{ type: String, default:[]},]
  },
  { 
    timestamps: true,
  }
);



mongoose.models = {}; // to remove error

const model = mongoose.model("FavouriteDoctors", FavouriteDoctorsSchema);
export default model;
