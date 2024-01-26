import ScheduleTiming from "../../../models/ScheduleTiming"
import connectDb from "../../../middleware/mongoose";

const handler = async (req, res) => {
  if(req.method == "PUT"){
    try {
        const {Email} = req.body;
        let data = await ScheduleTiming.findOne({Email});
        
        // if record already present update
        if(data){
          try { // update  
            await ScheduleTiming.updateOne({Email},req.body);
            res.status(200).json({success : true});
            
        } catch (error) {
            res.status(400).json({error})
        }
        }else { // or create new
          try { 
            let x = new ScheduleTiming(req.body);
            let data = await x.save();
            if(data){
                res.status(200).json({success: true});
            }else{
                res.status(200).json({success: false});
            }
      
    } catch (error) {
      res.status(400).json({ Error: "Internal Server error." });
    }
        }

    } catch (error) {
        res.status(400).json({ error : "Internal server error."})
    }
}else{
    res.status(400).json({ error : "This method is not allowed."});
} 


};
export default connectDb(handler);
