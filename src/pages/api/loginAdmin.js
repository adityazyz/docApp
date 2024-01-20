import ADMINSchema from "../../../models/ADMINSchema"
import connectDb from "../../../middleware/mongoose";
import CryptoJS from "crypto-js";
import  Jwt from "jsonwebtoken";

// login ( we decrypt password using secret key and compare with password in database)
const handler = async (req, res) => { 
    if(req.method == "POST"){
        try {
            const {Email, Password} = req.body;

            // const encryptedPass = CryptoJS.AES.encrypt(req.body.password,"Secret123").toString();
            let data = await ADMINSchema.findOne({Email});
      
            
            if(data){
                
                // decrypting pass
                const bytes = CryptoJS.AES.decrypt(data.Password , process.env.CRYPTOJS_SECRET_KEY);
                const decryptedPass = bytes.toString(CryptoJS.enc.Utf8);

                if(Email === data.Email && Password=== decryptedPass){
                    let token = Jwt.sign({userId : data.userId, UserType : "Admin",  Name : data.Name, Email : data.Email}, process.env.JWT_SECRET,{expiresIn : "2d"})

                    // sending token with name and email  
                    res.status(200).json({success : true, token });
                }
                else{
                    res.status(400).json({success : false, error : "Invalid credentials"})
                }
            }else{
                res.status(400).json({success : false, error : "User not found."})
            }

        } catch (error) {
            res.status(400).json({success : false, error : "Internal server error."})
        }
    }else{
        res.status(400).json({success : false, error : "This method is not allowed."});
    } 
}

export default connectDb(handler);