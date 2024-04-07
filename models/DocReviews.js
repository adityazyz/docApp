const mongoose = require("mongoose");

const DocReviewsSchema = new mongoose.Schema(
  { 
    DoctorId : { type: String, required: true},
    Rating : { type: Number, required: true},
    Title : { type: String, required: true},
    Review : { type: String, required: true},
    ReviewerId : { type: String, required: true},
    Recommend : {type: Boolean, required : true},
    Replies : [
        {
          Reply : { type: String },
          ReplierId : { type: String},
          Recommend : {type: Boolean, required : true},
          createdAt : { type : Date, default : new Date()}
        }
      ]
  },
  { 
    timestamps: true,
  }
);



mongoose.models = {}; // to remove error

const model = mongoose.model("DocReviews", DocReviewsSchema);
export default model;
