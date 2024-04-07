import AppointmentSchema from "../../../models/AppointmentSchema";
import connectDb from "../../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == "PUT") {
    try {
        await AppointmentSchema.findByIdAndUpdate(req.body._id, {
            Status : req.body.Status
        })
        res.status(200).json({ success: true });
    } catch (error) {
      res.status(400).json({ error: "Internal server error." });
    }
  } else {
    res.status(400).json({ error: "This method is not allowed." });
  }
};
export default connectDb(handler);
