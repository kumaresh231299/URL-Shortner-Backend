import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./Database/config.js"
import authRoute from "./Routers/authRoute.js"
import urlRoute from "./Routers/urlRoute.js"

dotenv.config()

const app = express()

//Middleware
app.use(express.json())
app.use(cors({
    origin:"*",
    credentials:true
}))

//DB Connection
connectDB();
//Default Router
app.get("/",(req,res)=>{
    res.status(200).send("Hi, Welcome to Our Url Shortner Application! ")
})

//Api Routes
app.use("/api/auth", authRoute);
app.use("/api/url",urlRoute);

//Listen
app.listen(process.env.PORT,()=>{
    console.log("App is started and running on the port")
})