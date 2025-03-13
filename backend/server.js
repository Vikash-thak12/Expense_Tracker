import express from "express"
import dotenv from "dotenv";
dotenv.config();
import cors from "cors"
import path from "path"
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js"
import incomeRoutes from "./routes/incomeRoute.js"
import { fileURLToPath } from 'url';

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
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/income", incomeRoutes)

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the "uploads" directory
app.use("/uploads", express.static(path.resolve(__dirname, "uploads")));

app.listen(port, () => {
    console.log(`Server is running on Port:${port}`)
})