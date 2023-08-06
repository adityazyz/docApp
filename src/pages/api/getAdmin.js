import AdminSchema from "../../../models/ADMINSchema"
import connectDb from "../../../middleware/mongoose";


const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
    // find all Admins for noe
        let data = await AdminSchema.find({});
        res.status(200).json(data);
        
      
    } catch (error) {
      res.status(400).json({ Error: "Internal Server error." });
    }
  } else {
    res.status(400).json({ Error: "This method is not allowed." });
  }
};
export default connectDb(handler);
