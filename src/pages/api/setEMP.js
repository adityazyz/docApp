import EmpSchema from "../../../models/EMPSchema"
import connectDb from "../../../middleware/mongoose";


const handler = async (req, res) => {
  if (req.method === "PUT") {
    try {
    // create new record
        await EmpSchema.updateMany(
            { },
            { $set: req.body },
         )
        res.status(200).json({success : true});
    } catch (error) {
      res.status(400).json({ Error: "Internal Server error." });
    }
  } else {
    res.status(400).json({ Error: "This method is not allowed." });
  }
};
export default connectDb(handler);
