import Category from "../../../models/Category";
import connectDb from "../../../middleware/mongoose";

// pass condition directly 
let condition = {editId : 99}

const handler = async (req, res) => {
  if (req.method === "PUT") {
    try {
    
      // first see if categoryStructure already exists or not 
      // find
      let dataExists = await Category.findOne(condition);
        if(dataExists){ // if exists ..update record
            let data = await Category.findOneAndUpdate(condition, {
                categoryData : req.body.data
              });
              res.status(200).json(data);
        }else{ // create new record
            // editId will be 99 default
            let categ = new Category({categoryData : req.body.data});
            let data = await categ.save();
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
