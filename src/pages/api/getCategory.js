import Category from "../../../models/Category"
import connectDb from "../../../middleware/mongoose"; 

// search filter
const filter = {editId : 99};

const handler = async (req, res) => {


    // (POST REQUEST)
    if(req.method === "GET"){
        try {
            let data = await Category.find(filter); 
            res.status(200).json({data});
        } catch (error) {
            res.status(400).json({Error : "Internal Server Error."});
        }
    }else{
        res.status(400).json({Error : "This method is not allowed."});  
    }
    
    
}
export default connectDb(handler);