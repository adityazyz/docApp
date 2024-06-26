import AppointmentSchema from "../../../models/AppointmentSchema";
import connectDb from "../../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == "PUT") {
    try {
      let reqBody = req.body; 
      reqBody["FollowUpDate"] = new Date(req.body["FollowUpDate"]);
      Object.keys(reqBody).map((item)=>{
        if(reqBody[item].length === 0){
          reqBody[item] = " ";
        }
      }) 

      console.log(reqBody)

      let x = new AppointmentSchema(reqBody);
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
