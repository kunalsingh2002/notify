import connectDB from "../../middleware/mongoose"
import UserNotice from "../../models/UserNotice"

const handler = async (req, res) => {
    if(req.method == 'POST') {
        let user = await UserNotice.findOne({"email" : req.body.email})
        if(user) {
           await UserNotice.findOneAndUpdate({email : req.body.email},{
            $push : {
                notices : req.body.notice
            }
           })
           res.status(200).json({success : "success"})
        }
        else {
            res.status(400).json({success : false, error : "No user found"})
        }
    }
    else {
        res.status(400).json({success : false, error : "This method is not allowed"})
    }
}

export default connectDB(handler)