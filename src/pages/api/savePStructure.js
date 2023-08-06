import ProfileStructure from "../../../models/ProfileStructure"
import connectDb from "../../../middleware/mongoose";

let condition = {"editId" : 33}

const handler = async (req, res) => {
  if (req.method === "PUT") {
    try {
        // putting condition field in req.body 
        let reqBody = req.body
        reqBody["editId"] = 33;
    
      // first see if categoryStructure already exists or not 
      // find
      let dataExists = await ProfileStructure.findOne(condition);
        if(dataExists){ // if exists ..update record
            // req.body contains all the fields to be added/updated

            let data = await ProfileStructure.findOneAndUpdate(condition,req.body);
            res.status(200).json(data);
        }else{ // create new record
            // editId will be 99 default

            let c = new ProfileStructure(reqBody);
            let data = await c.save();
            res.status(200).json(data);
        }
      
    } catch (error) {
      res.status(400).json({ Error: "Internal Server error." });
    }
  } else {
    res.status(400).json({ Error: "This method is not allowed." });
  }
};
export default connectDb(handler);
