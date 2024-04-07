import MyPatients from "../../../models/MyPatients" 
import connectDb from "../../../middleware/mongoose";


const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
        // req.query will contain PatientEmail  
        // two fields in this schema are PatientEmail and DoctorEmail

        let data = await MyPatients.findOne({
            DoctorEmail : req.query.DoctorEmail
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
