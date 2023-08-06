const mongoose = require("mongoose");

const profileStructure = new mongoose.Schema({
    
    EMP_PROFILE : {type : Object, required : true},
    USR_PROFILE : {type : Object, required : true},
    editId : {type : Number, required : true, unique : true},
})

mongoose.models = {}; // to remove error

const model = mongoose.model("ProfileStructure", profileStructure); 
export default model;