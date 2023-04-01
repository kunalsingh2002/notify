import connectDB from "../../middleware/mongoose"
import User from "../../models/User"
import UserNotice from "../../models/UserNotice"

const handler = async (req, res) => {
    if(req.method == 'POST') {
        console.log("printing typeof ", typeof req.body)
        let u = new User(req.body)
        await u.save();

        let notice = {
            email : req.body.email,
            notices : []
        }
        let n = new UserNotice(notice);
        await n.save();
        res.status(200).json({success : "success"})
    }
    else {
        res.status(400).json({error : "This method is not allowed"})
    }
}

export default connectDB(handler)