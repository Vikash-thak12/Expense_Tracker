import jwt from "jsonwebtoken"
import { userModel as User } from "../models/User.js";
import bcrypt from "bcryptjs";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

// Registering the user
export const registerUser = async (req, res) => {
    try {
        const { fullName, email, password, profileImageUrl } = req.body;
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All Fields are required" })
        }

        // check if the email already exits 
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "This email is already in used" })
        }

        // hashing the password 
        const hashedPassword = await bcrypt.hash(password, 10);

        // creating a user 
        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            profileImageUrl
        })

        user.save();  // saving the user in database

        res.status(201).json({
            message: "User Created Successfully",
            id: user._id,
            user,
            token: generateToken(user._id)
        })

    } catch (error) {
        return res.status(500).json({ message: "Error while registering User" })
    }
}

// login the user
export const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // If password is correct, proceed with authentication (e.g., generate JWT)
        res.status(200).json({
            id: user._id, 
            user, 
            token: generateToken(user._id), 
            message: "User logged in Successful"
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }

}

// getting details of the user
export const getUserInfo = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming you have user ID in req.user from middleware

        const user = await User.findById(userId).select('-password'); // Exclude password from the response
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}