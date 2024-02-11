const mongoose = require("mongoose");

const AppointmentSchema = new mongoose.Schema({
    BookingDate: { type: Date,default : new Date(Date.now()) },
  FollowUpDate: { type: Date, required : true}, 
  Time: { 
    Start : { type: String, required: true },
    End : { type: String, required: true }
  },
  DoctorEmail: { type: String, required: true },
  DoctorProfilePicture: { type: String, required: true},
  DoctorName: { type: String, required: true },
  DoctorSpecializations: [{ type: String, required: true }],

  ConsultingFee : { type: Number, required: true},
  BookingFee : { type: Number, required: true},
  TotalFee : { type: Number, required: true},

  ModeOfPayment : { type: String, required: true},
  TransactionId : { type: String, required: true,  unique: true },

  PatientEmail : { type: String, required: true},
  PatientProfilePicture : { type: String, required: true}, 
  PatientName : { type: String, required: true}, 
  PatientId : { type: String, required: true}, 

  Purpose : { type: String, required: true},  
  Status : { type: String, default: "paid"}
  //paid, accepted, cancelled  [default -paid]
},
{
  timestamps : true
});

mongoose.models = {}; // to remove error

const model = mongoose.model("Appointments", AppointmentSchema);
export default model;
