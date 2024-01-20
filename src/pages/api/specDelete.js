import Specialities from "../../../models/Specialities"
import connectDb from "../../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method === "DELETE") {
    try {
    
        await Specialities.findOneAndDelete(req.body);
        res.status(200).json({success : true, message : "Speciality deleted Successfully."});
            
      
    } catch (error) {
      res.status(400).json({ Error: "Internal Server error." });
    }
  } else {
    res.status(400).json({ Error: "This method is not allowed." });
  }
};
export default connectDb(handler);
