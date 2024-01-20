import AdminSchema from "../../../models/ADMINSchema"
import connectDb from "../../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method === "PUT") {
    try {
        const condition = {
            Email : req.body.Email
        }
        await AdminSchema.updateOne(condition,req.body);
        res.status(200).json({success : true});
      
    } catch (error) {
      res.status(400).json({ Error: "Internal Server error." });
    }
  } else {
    res.status(400).json({ Error: "This method is not allowed." });
  }
};
export default connectDb(handler);
