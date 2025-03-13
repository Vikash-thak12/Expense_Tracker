import { expenseModel as Expense } from "../models/Expense.js";
import xlsx from "xlsx"



// Add Expense category
export const addExpense = async (req, res) => {
    try {
        const userId = req.user.id;
        const { icon, category, amount, date } = req.body;
        if (!category || !amount || !date) {
            return res.status(400).json({ message: "All filed are required" })
        }

        const newExpense = await Expense.create({
            userId, 
            icon, 
            category, 
            amount, 
            date: new Date(date)
        })

        await newExpense.save(); 
        res.status(201).json(newExpense)
    } catch (error) {
        return res.status(500).json({ message: "Error while creating new Expense"})
    }
}

//get all Expense
export const getAllExpenses = async (req, res) => {
    const userId = req.user.id; 
    try {
        const Expenses = await Expense.find({ userId }).sort({ date: -1}); 
        res.json(Expenses)
    } catch (error) {
        return res.status(500).json({ message: "Error getting Expenses"})
    }
}

// delete one Expense 
export const deleteExpense = async (req, res) => {
    try {
        const ExpenseId = req.params.id;
        const userId = req.user.id;

        const expense = await Expense.findOneAndDelete({ _id: ExpenseId, userId });

        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }

        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Error deleting Expense" });
    }
}

// download all Expense in excel 
export const downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id; 
    try {
        const expenses = await Expense.find({ userId }).sort({ date: -1}); 

        // prepare data for excel 
        const data = expenses.map((item) => ({
            Category: item.category, 
            Amount: item.amount, 
            Date: item.date
        }))

        const wb = xlsx.utils.book_new(); 
        const ws = xlsx.utils.json_to_sheet(data); 
        xlsx.utils.book_append_sheet(wb, ws, "Expense"); 
        xlsx.writeFile(wb, 'Expense_details.xlsx'); 
        res.download('Expense_details.xlsx')
    } catch (error) {
        res.status(500).json({ message: "Server Error while downloading the Excel sheet"})
    }
}

