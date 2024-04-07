import FavouriteDoctors from "../../../models/FavouriteDoctors";
import connectDb from "../../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method === "PUT") {
    try {
      // req.query will contain PatientEmail and email
      // two fields in this schema are PatientEmail and DoctorEmail

      //comfirm if the record exists
      let data = await FavouriteDoctors.findOne({
        PatientEmail: req.body.PatientEmail,
      });

      if (data !== null) {
        // now remove the doctor from the array
        await FavouriteDoctors.updateOne(
          { PatientEmail: req.body.PatientEmail },
          {
            DoctorEmail: data.DoctorEmail.filter(item => item !== req.body.email),
          }
        );
        res.status(200).json({ success: true });
      } else {
        // create new favDoctor record
        let item = new FavouriteDoctors({
          PatientEmail: req.body.PatientEmail,
          DoctorEmail: [],
        });
        await item.save();
        res.status(200).json({ success: true });
      }
    } catch (error) {
      res.status(400).json({ Error: "Internal Server error." });
    }
  } else {
    res.status(400).json({ Error: "This method is not allowed." });
  }
};
export default connectDb(handler);
