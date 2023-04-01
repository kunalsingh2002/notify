import connectDB from "../../middleware/mongoose"
import LocationNotice from "../../models/LocationNotice"

const handler = async (req, res) => {
    if(req.method == 'POST') {
        // console.log(req.body)
        let loc = await LocationNotice.find({location : req.body.location})
        if(loc.length != 0) {
            console.log("in the first if !")
            await LocationNotice.findOneAndUpdate({location : req.body.location},{
                $push : {
                    notices : req.body.notice
                }
               })
        }
        else {
            console.log("in the else !")
            let temp_loc = {
                location : req.body.location,
                notices : []
            }
            let n = new LocationNotice(temp_loc)
            await n.save();
            await LocationNotice.findOneAndUpdate({location : req.body.location},{
                $push : {
                    notices : req.body.notice
                }
               })
        }
        res.status(200).json({success : "success"})
    }
    else if(req.method == 'GET') {
        const location = req.query.location;
        let loc = await LocationNotice.find({location : location});
        if(loc.length == 0) {
            res.status(200).json({success : "success", error : "no notice found"})
        }
        else {
            res.status(200).json({loc})
        }
    }
    else {
        res.status(400).json({success : false, error : "This method is not allowed"})
    }
}

export default connectDB(handler)