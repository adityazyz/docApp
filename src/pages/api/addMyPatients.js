import MyPatients from "../../../models/MyPatients"; 
import connectDb from "../../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method === "PUT") {

    try {
      //comfirm if the record exists
      let data = await MyPatients.findOne({
        DoctorEmail: req.body.DoctorEmail,
      });

      

      if (data !== null) {
        // now add the patient to the array if its not already there
        if (data.PatientEmail.includes(req.body.email)) {
          res.status(200).json({ success: true });
        } else {
          let newArray = [...data.PatientEmail, req.body.email];
          await MyPatients.updateOne(
            { DoctorEmail: req.body.DoctorEmail },
            {
              PatientEmail: newArray,
            }
          );
          res.status(200).json({ success: true });
        }
      } else {
        // create new favDoctor record
        let item = new MyPatients({
          DoctorEmail: req.body.DoctorEmail,
          PatientEmail: [req.body.email],
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
