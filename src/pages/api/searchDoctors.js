// search doctors based on the Specializations under Service

import DoctorData from "../../../models/DoctorData"
import connectDb from "../../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method === "GET") {
    const spec = req.query.spec;

    try {
        const result = await DoctorData.find({ 'Service.Specializations': spec });
        res.status(200).json({result});
         
    } catch (error) {
      res.status(400).json({ Error: "Internal Server error." });
    }
  } else {
    res.status(400).json({ Error: "This method is not allowed." });
  }
};
export default connectDb(handler);
