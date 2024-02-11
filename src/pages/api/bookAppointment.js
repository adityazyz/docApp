import AppointmentSchema from "../../../models/AppointmentSchema";
import connectDb from "../../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == "PUT") {
    try {
      let x = new AppointmentSchema(req.body);
      let data = await x.save();
      if (data) {
        res.status(200).json({ success: true });
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
