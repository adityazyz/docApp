import DoctorData from "../../../models/DoctorData";
import PatientData from "../../../models/PatientData";
import connectDb from "../../../middleware/mongoose";
import CryptoJS from "crypto-js";

// takes ->
// 1) UserType as Doctor or Patient to make userId
// and name, email, mobileNumber , password

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
        let {Email} = req.body;
    // first check for email in doc and patient records and tell if already in use
        // search in doc
        let data1 = await DoctorData.findOne({Email});
        let data2 = await PatientData.findOne({Email});

        if(data1 || data2){
            
            res.status(200).json({success : false, message : "Email already in use."});
        }

      // create new record
      let newBody = req.body; 


      // add a field called userId
      newBody["UserType"] = req.body.UserType;

      // add a field UserName
      if(!req.body.UserName){
        let userName = req.body.Email.split("@")[0];
        newBody["UserName"] = userName; 
      }
      

      // add a field called AccountStatus - if doctor
      if (req.body.UserType === "Doctor") {
        newBody["AccountStatus"] = 0;
      }


      // now take password from req-body, and encrypt it and save in db
      // encrypting password
      const encryptedPass = CryptoJS.AES.encrypt(
        req.body.Password,
        process.env.CRYPTOJS_SECRET_KEY
      ).toString();

      newBody["Password"] = encryptedPass;



      if (req.body.UserType === "Doctor") {
        let c = new DoctorData(newBody);
        await c.save();
        res.status(200).json({success : true});
      } else {
        let c = new PatientData(newBody);
        await c.save(); 
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
