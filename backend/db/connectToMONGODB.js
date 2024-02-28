import mongoose from "mongoose";
const connectToMONGODB =async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB_URL)
      console.log (" connected to mongodb")
    } catch (error) {
        console.log(error)
    }
}

export default connectToMONGODB