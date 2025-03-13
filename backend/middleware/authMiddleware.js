import jwt from "jsonwebtoken"
import { userModel as User } from "../models/User.js"


const protect = async (req, res, next) => {
    let token = req.headers.authorization?.split(" ")[1]; 
    if(!token) return res.status(401).json({ message: "Not Authorized, no token"}); 


    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET); 
        req.user = await User.findById(decoded.id).select('-password'); 
        next(); 
    } catch (error) {
        return res.status(401).json({ message: "Not authorized, token failed"})
    }
}

export default protect