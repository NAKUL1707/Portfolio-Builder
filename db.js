import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://nakul172005:123@cluster0.wkuscxk.mongodb.net/RESUME')
    .then(()=>{console.log("DB CONNECTED")})   
}