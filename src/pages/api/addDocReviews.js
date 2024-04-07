import DocReviews from "../../../models/DocReviews"
import connectDb from "../../../middleware/mongoose";


const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
        let item = new DocReviews(req.body);
        await item.save()
        res.status(200).json({success : true});
         
    } catch (error) {
      res.status(400).json({ Error: "Internal Server error." });
    }
  } else {
    res.status(400).json({ Error: "This method is not allowed." });
  }
};
export default connectDb(handler);
