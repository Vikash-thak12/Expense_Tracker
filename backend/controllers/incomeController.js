import { incomeModel as Income } from "../models/Income.js"
import xlsx from "xlsx"



// Add Income source
export const addIncome = async (req, res) => {
    try {
        const userId = req.user.id;
        const { icon, source, amount, date } = req.body;
        if (!source || !amount || !date) {
            return res.status(400).json({ message: "All filed are required" })
        }

        const newIncome = await Income.create({
            userId, 
            icon, 
            source, 
            amount, 
            date: new Date(date)
        })

        await newIncome.save(); 
        res.status(201).json(newIncome)
    } catch (error) {
        return res.status(500).json({ message: "Error while creating new Income"})
    }
}

//get all income
export const getAllIncome = async (req, res) => {
    const userId = req.user.id; 
    try {
        const income = await Income.find({ userId }).sort({ date: -1}); 
        res.json(income)
    } catch (error) {
        return res.status(500).json({ message: "Error getting incomes"})
    }
}

// delete one income 
export const deleteIncome = async (req, res) => {
    try {
        const incomeId = req.params.id;
        const userId = req.user.id;

        const income = await Income.findOneAndDelete({ _id: incomeId, userId });

        if (!income) {
            return res.status(404).json({ message: "Income not found" });
        }

        res.status(200).json({ message: "Income deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting income" });
    }
}

// download all income in excel 
export const downloadIncomeExcel = async (req, res) => {
    const userId = req.user.id; 
    try {
        const income = await Income.find({ userId }).sort({ date: -1}); 

        // prepare data for excel 
        const data = income.map((item) => ({
            Source: item.source, 
            Amount: item.amount, 
            Date: item.date
        }))

        const wb = xlsx.utils.book_new(); 
        const ws = xlsx.utils.json_to_sheet(data); 
        xlsx.utils.book_append_sheet(wb, ws, "Income"); 
        xlsx.writeFile(wb, 'income_details.xlsx'); 
        res.download('income_details.xlsx')
    } catch (error) {
        res.status(500).json({ message: "Server Error while downloading the Excel sheet"})
    }
}

