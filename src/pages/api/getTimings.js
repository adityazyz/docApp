import ScheduleTiming from "../../../models/ScheduleTiming"
import connectDb from "../../../middleware/mongoose";


const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
        let data = await ScheduleTiming.find({Email : req.query.email});
        res.status(200).json(data[0]);

    } catch (error) {
      res.status(400).json({ Error: "Internal Server error." });
    }
  } else {
    res.status(400).json({ Error: "This method is not allowed." });
  }
};
export default connectDb(handler);
