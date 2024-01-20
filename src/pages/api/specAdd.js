import Specialities from "../../../models/Specialities"
import connectDb from "../../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const {name } = req.body;
    try {

      let exists = await Specialities.findOne({name});
      if(exists){
        res.status(200).json({success : false, message : "Category already exists. "});
      }else{
        let item = new Specialities(req.body);
        await item.save()
        res.status(200).json({success : true, message : "Category Added. "});
      }
       
    } catch (error) {
      res.status(400).json({ Error: "Internal Server error." });
    }
  } else {
    res.status(400).json({ Error: "This method is not allowed." });
  }
};
export default connectDb(handler);
