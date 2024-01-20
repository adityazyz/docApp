import WebsiteSetting from "../../../models/WebsiteSetting"
import connectDb from "../../../middleware/mongoose";

const condition = {editId : 99};

const handler = async (req, res) => {
  if (req.method === "PUT") {
    try {

      let data = await WebsiteSetting.findOne(condition)
      if(data){
        await WebsiteSetting.updateOne(condition,req.body);
        res.status(200).json({success : true});
      }else{
        // create 
        let item = new WebsiteSetting(req.body);
        await item.save()
        res.status(200).json({success : true});
      }
             
      
    } catch (error) {
      res.status(400).json({ Error: "Internal Server error." });
    }
  } else {
    res.status(400).json({ Error: "This method is not allowed." });
  }
};
export default connectDb(handler);
