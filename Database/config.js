import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

const mongoDB_URL = process.env.MONGODB_URL;
const connectDB = async (req,res)=>{
    try {
        const connection = await mongoose.connect(mongoDB_URL,{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        console.log("MONGODB Connected Successfully");
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"MONGODB Connection Error",error})
    }
}
export default connectDB;