
import express from "express"
import dotenv from "dotenv"
import authRoutes from "../backend/routes/auth.routes.js"
import messageRoutes from "../backend/routes/message.routes.js"
import connectToMONGODB from "./db/connectToMONGODB.js"
import cookieParser from "cookie-parser"
const app= express()
const PORT= process.env.PORT||5000

dotenv.config()
app.use(express.json())
app.unsubscribe(cookieParser)


app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)


// app.get("/",(req,res)=>{
//     //root route http://localhost:5000/
//     res.send("hello world!!")
// })


app.listen(PORT, ()=>{
    connectToMONGODB()

    console.log(`server is running on ${PORT}`)})