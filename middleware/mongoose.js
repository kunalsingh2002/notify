import mongoose from "mongoose";

const connectDB = handler => async(req, res) => {
    if(mongoose.connections[0].readyState) {
        return handler(req, res);
    }
    // await mongoose.connect(process.env.MONGO_URI)
    await mongoose.connect('mongodb+srv://root:arvr@cluster0.mu8k2z2.mongodb.net/test')
    return handler(req, res);
}

export default connectDB;