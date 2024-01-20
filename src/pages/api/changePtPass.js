import PatientData from "../../../models/PatientData"
import connectDb from "../../../middleware/mongoose";
import CryptoJS from "crypto-js";


// login ( we decrypt password using secret key and compare with password in database)
const handler = async (req, res) => { 
    if(req.method == "PUT"){
        try {
            const {Email, OldPassword, NewPassword} = req.body;

            // const encryptedPass = CryptoJS.AES.encrypt(req.body.password,"Secret123").toString();
            let data = await PatientData.findOne({Email});
            
            if(data){
                // decrypting pass
                const bytes = CryptoJS.AES.decrypt(data.Password , process.env.CRYPTOJS_SECRET_KEY);
                const decryptedPass = bytes.toString(CryptoJS.enc.Utf8);

                // in case you forget password
                // const myPassString = "U2FsdGVkX1+0S2We7lMXvCj3puq5I0WsRVaEm0f+w6g="
                // const mybytes = CryptoJS.AES.decrypt(myPassString, process.env.CRYPTOJS_SECRET_KEY);
                // const mydecryptedPass = mybytes.toString(CryptoJS.enc.Utf8);
                // console.log(mydecryptedPass) 
                

                if(OldPassword === decryptedPass){
                    // if old pass matches...now decrypt newPass and update password
                    const newEncryptedPass = CryptoJS.AES.encrypt(NewPassword,process.env.CRYPTOJS_SECRET_KEY).toString();

                    try { // update pass 
                        await PatientData.updateOne({Email},{Password : newEncryptedPass});
                        res.status(200).json({success : true, message : "Password Updated successfully."  });
                        
                    } catch (error) {
                        res.status(400).json({error})
                    }

                }
                else{
                    res.status(200).json({success : false, message : "The old password is wrong."})
                }
            }else{
                res.status(400).json({error : "User not found."})
            }

        } catch (error) {
            res.status(400).json({ error : "Internal server error."})
        }
    }else{
        res.status(400).json({ error : "This method is not allowed."});
    } 
}

export default connectDb(handler);