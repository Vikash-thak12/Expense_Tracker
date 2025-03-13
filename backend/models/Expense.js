import mongoose from "mongoose";

const expenseSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "user", // This should match the name of your user schema model
        required: true,
    },
    icon: {
        type: String
    },
    category: {
        type: String,  // food, shopping
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

export const expenseModel = mongoose.model("expense", expenseSchema)