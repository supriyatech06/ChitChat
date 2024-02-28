import jwt from "jsonwebtoken"

const generateTokenandSetCookie = (userId,res) =>{
    const token =jwt.sign({userId},process.env.JWT_SECRET ,{ expiresIn:"15d"})

    res.cookie("jwt",token,{
        maxAge:15*24*60*60*1000, ///ms
        httpOnly:true,        //prevent XSS attacks cross-site attacks
        sameSite:"Strict"  ,
        secure:process.env.NODE.ENV !=="development"  ///CSRF cross site request forgery attacks
    })
   
}


export default generateTokenandSetCookie;