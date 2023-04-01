const { timeStamp } = require('console');
const mongoose = require('mongoose');

let Notice = {
    title : String,
    noticetext : String,
    locations : Array,
    format : String,
    exptime : Number,
}

const LocationNoticeSchema = new mongoose.Schema({
    location : {type:String, required:true},
    notices : [Notice]
}, timeStamp(true));

// mongoose.models = {}
export default mongoose.models.LocationNotice || mongoose.model("LocationNotice", LocationNoticeSchema);