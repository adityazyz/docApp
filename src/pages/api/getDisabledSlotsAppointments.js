import AppointmentSchema from "../../../models/AppointmentSchema"
import connectDb from "../../../middleware/mongoose";


const handler = async (req, res) => {
  if (req.method === "GET") {
    try {

        console.log(req.query.email); 
      
        let targetDate = new Date();
        targetDate.setDate(targetDate.getDate() - 1);
        // find all Admins for noe
        let data = await AppointmentSchema.find({
            FollowUpDate : { $gte: targetDate },
            PatientEmail : req.query.email
        });
        res.status(200).json(data);
         
    } catch (error) {
      res.status(400).json({ Error: "Internal Server error." });
    }
  } else {
    res.status(400).json({ Error: "This method is not allowed." });
  }
};
export default connectDb(handler);
