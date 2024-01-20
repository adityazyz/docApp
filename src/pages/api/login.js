import DoctorData from "../../../models/DoctorData"
import PatientData from "../../../models/PatientData"
import connectDb from "../../../middleware/mongoose";
import CryptoJS from "crypto-js";
import  Jwt from "jsonwebtoken";

// login ( we decrypt password using secret key and compare with password in database)
const handler = async (req, res) => { 
    if(req.method == "POST"){
        try {
            const {Email, Password} = req.body;

            // check for email in both Doc and Patient records
            let data1 = await DoctorData.findOne({Email});

            let data2 = await PatientData.findOne({Email});

            
            // if doctor - sign him in
            if(data1){
                // decrypting pass
                const bytes = CryptoJS.AES.decrypt(data1.Password , process.env.CRYPTOJS_SECRET_KEY);
                const decryptedPass = bytes.toString(CryptoJS.enc.Utf8);


                if(Email === data1.Email && Password === decryptedPass){
                    let token = Jwt.sign({UserType : data1.UserType, FirstName : data1.FirstName, Email : data1.Email}, process.env.JWT_SECRET,{expiresIn : "2d"})

                    // sending token with name and email  
                    res.status(200).json({success : true, token });
                }
                else{
                    res.status(200).json({success : false, error : "Invalid credentials"})
                }


            }else if(data2){ // if patient - sign him in
                // decrypting pass
                const bytes = CryptoJS.AES.decrypt(data2.Password , process.env.CRYPTOJS_SECRET_KEY);
                const decryptedPass = bytes.toString(CryptoJS.enc.Utf8);

                if(Email === data2.Email && Password === decryptedPass){
                    let token = Jwt.sign({UserType : data2.UserType, FirstName : data2.FirstName, Email : data2.Email}, process.env.JWT_SECRET,{expiresIn : "2d"})

                    // sending token with name and email  
                    res.status(200).json({success : true, token });
                }
                else{
                    res.status(200).json({success : false, error : "Invalid credentials"})
            
                }
            }else{
                res.status(200).json({success : false, error : "User not found."})
            }

        } catch (error) {
            res.status(400).json({success : false, error : "Internal server error."})
        }
    }else{
        res.status(400).json({success : false, error : "This method is not allowed."});
    } 
}

export default connectDb(handler);