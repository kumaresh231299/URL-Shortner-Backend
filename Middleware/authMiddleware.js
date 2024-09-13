import jwt from "jsonwebtoken"
import User from "../Models/userSchema.js"

const authMiddleware = async(req,res,next)=>{
    const token = req.headers.authorization?.split(' ')[1]  // bearer token
    if(!token){
        return res.status(401).json({message:"No Token, authorization denied "})
    }
    try {
        const decode =jwt.verify(token,process.env.JWT_SECRET_KEY)
        req.user = decode     
        const user = await User.findById(req.user.id)
        if(!user){
            return res.status(404).json({message:"Access Denied Not a valid user"})
        }
        next()
    } catch (error) {
        res.status(404).json({message:"Token is not valid"})
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token expired, please log in again." });
        }
        
    }
}

export default authMiddleware;