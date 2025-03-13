import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {})
        console.log("MongoDB Connected")
    } catch (error) {
        console.log("Error while connecting to the database", error)
        process.exit(1); 
    }
}

export default connectDB