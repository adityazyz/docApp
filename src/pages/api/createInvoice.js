import Invoice from "../../../models/Invoice";
import connectDb from "../../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == "POST") {
    try {
      let x = new Invoice(req.body);
      let data = await x.save();
      if (data) {
        res.status(200).json({ success: true, data });
      } else {
        res.status(200).json({ success: false });
      }
    } catch (error) {
      res.status(400).json({ error: "Internal server error." });
    }
  } else {
    res.status(400).json({ error: "This method is not allowed." });
  }
};
export default connectDb(handler);
