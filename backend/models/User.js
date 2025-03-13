import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const UserSchema = mongoose.Schema({
    fullName: {
        type: String, 
        required: true
    }, 
    email: {
        type: String, 
        required: true, 
        unique: true, 
    }, 
    password: {
        type: String, 
        required: true, 
    }, 
    profileImageUrl: {
        type: String, 
        default: null
    }
}, { timestamps: true})

export const userModel = mongoose.model("user", UserSchema);