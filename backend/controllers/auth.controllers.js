import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import generateTokenandSetCookie from "../utils/generateToken.js"

export const signup= async(req,res)=>{
    // res.send("signupuser")
    // console.log("loginuser")
    try {
        const {fullName,username,password,confirmPassword,gender} = req.body

        if(password!==confirmPassword){
            return res.status(400).json({error:"password don't match"})
        }

   const user= await User.findOne({username})
   if(user){
    return res.status(400).json({error:"User already exists"})
   }
   //HASHING PASSWORD
   const salt= await bcrypt.genSalt(10);
   const hashedPassword= await bcrypt.hash(password,salt)



   const boyProfilePic=`https://avatar.iran.liara.run/public/boy?username=${username}`
   const girlProfilePic=`https://avatar.iran.liara.run/public/girl?username=${username}`

  const newUser =new User({
    fullName,
    username,
    password:hashedPassword,
    gender,
    profilePic: gender === "male" ? boyProfilePic :girlProfilePic
  })

  if(newUser){
    generateTokenandSetCookie(newUser._id,res)
  await newUser.save()

  res.status(201).json({
    _id:newUser._id,
    fullName:newUser.fullName,
    username:newUser.username,
    profilePic:newUser.profilePic
  })

  }
  else{
    res.status(400).json({error:"Invalid User Input"})
  }

    } catch (error) {
        res.status(500).json({error:"internal server errror"})
    }
}




export const login= async(req,res)=>{
try {

const {username,password} =req.body;
const user =await User.findOne ({username})
const isPasswordCorrect = await bcrypt.compare(password , user?.password || "")

if(!user ||!isPasswordCorrect){
  return res.status(400).json({error:"Invalid username or password"})
}


generateTokenandSetCookie(user._id,res)


res.status(200).json({
  _id:user._id,
  fullName:user.fullName,
  username:user.username,
  profilePic:user.profilePic,
})

} catch (error) {
  console.log("error in signin controller" )
  res.status(500).json({error:"internal server errror"})
}
}

export const logout=(req,res)=>{
  try {
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({message:"Logged out succesfully"})
    
  } catch (error) {
    console.log("error in logout controller" )
    res.status(500).json({error:"internal server errror"})
  }
  }





