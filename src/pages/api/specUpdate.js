import Specialities from "../../../models/Specialities"
import connectDb from "../../../middleware/mongoose";

const handler = async (req, res) => { 
  if (req.method === "PUT") {
    
    try {
      let exists = await Specialities.findOne({name : req.body.name});
      if(exists){
        res.status(200).json({success : false, message : "Category name already exists. "});
      }else{
        await Specialities.findByIdAndUpdate({_id : req.body.id},req.body.data, {new : true});
        res.status(200).json({success : true, message : "Category Updated. "});
      }

    } catch (error) {
      res.status(400).json({ Error: "Internal Server error." });
    }
  } else {
    res.status(400).json({ Error: "This method is not allowed." });
  }
};
export default connectDb(handler);
