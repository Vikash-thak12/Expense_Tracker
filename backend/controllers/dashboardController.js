import { incomeModel as Income } from "../models/Income.js"
import { expenseModel as Expense } from "../models/Expense.js"
import { isValidObjectId, Types } from "mongoose"

export const getDashboardData = async (req, res) => {
    try {
        const userId = req.user.id;
        const userObjectId = new Types.ObjectId(String(userId))

        // Fetch total income and expenses 
        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ])

        console.log("totalIncome", { totalIncome, userId: isValidObjectId(userId) })

        const totalExpense = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            { $group: { _id: null, total: { $sum: "$amount" } } },
        ])


        // get income transactions in the last 60 days
        const getlast60daysincomeTransactions = await Income.find({
            userId,
            date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) }
        }).sort({ date: -1 });


        // get total income for last 60 days 
        const incomeLast60days = getlast60daysincomeTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        );

        // get expense transactions in the last 30 days 
        const getlast30daysExpenseTransactions = await Expense.find({
            userId,
            date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
        }).sort({ date: -1 });


        // get total expense for last 30 days
        const expenselast30days = getlast30daysExpenseTransactions.reduce(
            (sum, transaction) => sum + transaction.amount,
            0
        )


        // fetch last 5 transactions (income + expense)
        const lastTransactions = [
            ...(await Income.find({ userId })
                .sort({ date: -1 })
                .limit(5)
                .lean()) // Converts to plain JS objects
                .map(txn => ({ ...txn, type: "income" })),

            ...(await Expense.find({ userId })
                .sort({ date: -1 })
                .limit(5)
                .lean())
                .map(txn => ({ ...txn, type: "expense" }))
        ].sort((a, b) => new Date(b.date) - new Date(a.date)); // Ensure correct sorting



        // final response 
        res.json({
            totalBalance: (totalIncome[0]?.total || 0) - (totalExpense[0]?.total || 0),
            totalIncome: (totalIncome[0]?.total || 0),
            totalExpense: (totalExpense[0]?.total || 0),
            last30DaysExpenses: {
                total: expenselast30days,
                transactions: getlast30daysExpenseTransactions
            },
            last60DaysIncome: {
                total: incomeLast60days,
                transactions: getlast60daysincomeTransactions
            },
            recentTransactions: lastTransactions,
        })


    } catch (error) {
        res.status(500).json({ message: "Server Error in getting Dashboard data", error })
    }
}