import DoctorData from "../../../models/DoctorData"
import connectDb from "../../../middleware/mongoose";

// login ( we decrypt password using secret key and compare with password in database)
const handler = async (req, res) => { 
    if(req.method == "DELETE"){
        try {
            const Email = req.query.email;
            
            let data = await DoctorData.deleteOne({Email});
            
            if(data){
                res.status(200).json({success : true})
                
            }else{
                res.status(400).json({success: false, error : "Could not delete. User not found."})
            }

        } catch (error) {
            res.status(400).json({ error : "Internal server error."})
        }
    }else{
        res.status(400).json({ error : "This method is not allowed."});
    } 
}

export default connectDb(handler);