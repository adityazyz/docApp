const mongoose = require("mongoose");

// when need to delete record after some time
// const forgotSchema = new mongoose.Schema({
//     email : {type : String , required : true},
//     token : {type : String, required : true}, 
//     createdAt : {type : Date, default : Date.now()}

// });
// // it gets deleted after 10 min
// forgotSchema.index({ createdAt: 1 }, { expireAfterSeconds: 600 });

const categorySchema = new mongoose.Schema({
    editId : {type : Number, default : 99 , unique : true},
    categoryData : []
})

mongoose.models = {}; // to remove error

const model = mongoose.model("Category", categorySchema); 
export default model;