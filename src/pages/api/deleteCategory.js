import Category from "../../../models/Category";
import connectDb from "../../../middleware/mongoose";

// pass condition directly 
let condition = {editId : 99}

const handler = async (req, res) => {
  if (req.method === "DELETE") {
    try {
        let data = await Category.deleteMany(condition);
        res.status(200).json(data);
        
    } catch (error) {
      res.status(400).json({ Error: "Internal Server error." });
    }
  } else {
    res.status(400).json({ Error: "This method is not allowed." });
  }
};
export default connectDb(handler);
