import mongoose from "mongoose";

const incomeSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "user", // This should match the name of your user schema model
        required: true,
    },
    icon: {
        type: String
    },
    source: {
        type: String, 
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true});

export const incomeModel = mongoose.model("income", incomeSchema)