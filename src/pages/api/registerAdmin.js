import ADMINSchema from "../../../models/ADMINSchema"
import connectDb from "../../../middleware/mongoose";
import CryptoJS from "crypto-js";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const userId = `ADMIN-${Date.now()}`

    try { // create new record
            let newBody = req.body;
            // add a field called userId
            newBody["userId"] = userId;
            
            // now take password from req-body, and encrypt it and save in db
            // encrypting password
            const encryptedPass = CryptoJS.AES.encrypt(req.body.Password ,process.env.CRYPTOJS_SECRET_KEY).toString();

            newBody["Password"] = encryptedPass;

            let c = new ADMINSchema(newBody);
            let data = await c.save();
            res.status(200).json(data);
      
    } catch (error) {
      res.status(400).json({ Error: "Internal Server error." });
    }
  } else {
    res.status(400).json({ Error: "This method is not allowed." });
  }
};
export default connectDb(handler);
