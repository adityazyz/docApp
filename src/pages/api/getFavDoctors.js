import FavouriteDoctors from "../../../models/FavouriteDoctors"
import connectDb from "../../../middleware/mongoose";


const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
        // req.query will contain PatientEmail  
        // two fields in this schema are PatientEmail and DoctorEmail

        let data = await FavouriteDoctors.findOne({
            PatientEmail : req.query.PatientEmail
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
