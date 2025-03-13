import express from "express"
import dotenv from "dotenv";
dotenv.config();
import cors from "cors"
import path from "path"
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js"

const app = express(); 
const port = process.env.PORT || 3001; 

// middleware to handle cors 
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*", 
        methods: ["GET", "POST", "PUT", "DELETE"], 
        allowedHeaders: ["Content-Type", "Authorization"]
    })
)

app.use(express.json()); 


// Connection to the database
connectDB(); 

// Routes
// app.get("/", (req,res) => {
//     res.send("Hello this is from server side")
// })

app.use("/api/v1/auth", authRoutes)

app.listen(port, () => {
    console.log(`Server is running on Port:${port}`)
})