import ProfileStructure from "../../../models/ProfileStructure"
import connectDb from "../../../middleware/mongoose";
 
let filter = {editId : 33}

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
    // find all Admins for noe
        let data = await ProfileStructure.find(filter);
        res.status(200).json(data[0]);
        
      
    } catch (error) {
      res.status(400).json({ Error: "Internal Server error." });
    }
  } else {
    res.status(400).json({ Error: "This method is not allowed." });
  }
};
export default connectDb(handler);
