const { timeStamp } = require('console');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name : {type:String,required:true},
    email : {type:String, required:true},
    password : {type:String, required:true}
}, timeStamp(true));

// mongoose.models = {}
export default mongoose.models.User || mongoose.model("User", UserSchema);