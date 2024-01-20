import ScheduleTiming from "../../../models/ScheduleTiming"
import connectDb from "../../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method === "POST") {

    try { 
            let x = new ScheduleTiming(req.body);
            let data = await x.save();
            if(data){
                res.status(200).json({success: true});
            }else{
                res.status(200).json({success: false});
            }
      
    } catch (error) {
      res.status(400).json({ Error: "Internal Server error." });
    }
  } else {
    res.status(400).json({ Error: "This method is not allowed." });
  }
};
export default connectDb(handler);
