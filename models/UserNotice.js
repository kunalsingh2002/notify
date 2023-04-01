const { timeStamp } = require('console');
const mongoose = require('mongoose');

let Notice = {
    title : String,
    noticetext : String,
    locations : Array,
    format : String,
    exptime : Number,
}

const UserNoticeSchema = new mongoose.Schema({
    email : {type:String, required:true},
    notices : [Notice]
}, timeStamp(true));

// mongoose.models = {}
export default mongoose.models.UserNotice || mongoose.model("UserNotice", UserNoticeSchema);