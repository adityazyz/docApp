const mongoose = require("mongoose");

const InvoiceSchema = new mongoose.Schema(
  {
    IssueDate: { type: Date, default: new Date(Date.now()) },

    DoctorName: { type: String, required: true },
    DoctorAddress: {
      Address: { type: String, required: true },
      City: { type: String, required: true },
      State: { type: String, required: true },
      Country: { type: String, required: true },
    },

    PatientName: { type: String, required: true },
    PatientAddress: {
      Address: { type: String, required: true },
      City: { type: String, required: true },
      State: { type: String, required: true },
      Country: { type: String, required: true },
    },

    PaymentDetails: {type : Object, required : true}
    ,
    GeneralDetails: [{
      Service: { type: String, required: true }, 
      Amount: { type: Number, required: true },
    }],

    Subtotal: { type: Number, required: true },
    Discount: { type: Number, required: true },
    Total: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

mongoose.models = {}; // to remove error

const model = mongoose.model("Invoice", InvoiceSchema);
export default model;
