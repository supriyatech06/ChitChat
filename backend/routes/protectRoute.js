import jwt from "jsonwebtoken"
import User from "../models/user.model.js";

const protectRoute =async(req,res,next)=>{
    try {
        const token =req.cookies.jwt;
        if(!token){
            res.status(401).json({error:"Unauthorised -no token provided"})

        }

        const decoded= jwt.verify(token,process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({error:"unauthorised-Invalid Token"})
        }

   const user= await User.findById(decoded.userId).select("-password")

   if(!user){
    return res.status(404).json({error:"User not found"})
   }
   req.user=user
   next();

    } catch (error) {
         res.status(400).json({error:"intenal server error"})
    }
}

export default protectRoute