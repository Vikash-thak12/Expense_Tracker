import React, { useState } from 'react'
import EmojiPickerPopup from '../EmojiPickerPopup';

const AddExpenseForm = ({ onAddExpense }) => {
    const [expense, setExpense] = useState({
        category: "",
        amount: 0,
        date: "",
        icon: ""
    });
    const handleChange = (key, value) => setExpense({ ...expense, [key]: value });
    return (
        <div className='flex flex-col items-start flex-1 gap-5'>
            <EmojiPickerPopup
                icon={expense.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />

            <div className='flex flex-col w-full'>
                <label className='mb-2'>Expense Category</label>
                <input
                    value={expense.category}
                    onChange={({ target }) => handleChange("category", target.value)}
                    label="Income Source"
                    type="text"
                    placeholder="shopping, travelling, etc"
                    className='p-2 border border-gray-300 rounded'
                />
            </div>


            <div className='flex flex-col w-full'>
                <label className='mb-2'>Choose Amount</label>
                <input
                    value={expense.amount}
                    onChange={({ target }) => handleChange("amount", target.value)}
                    label="Amount"
                    type="number"
                    placeholder="Enter amount"
                    className='p-2 border border-gray-300 rounded'
                />
            </div>


            <div className='flex flex-col w-full'>
                <label className='mb-2'>Pick Date</label>
                <input
                    value={expense.date}
                    onChange={({ target }) => handleChange("date", target.value)}
                    label="Date"
                    type="date"
                    placeholder="Select date"
                    className='p-2 border border-gray-300 rounded'
                />
            </div>

            <button type='button' onClick={() => onAddExpense(expense)} className='bg-green-500 px-4 py-2 rounded-md text-center mx-auto cursor-pointer'>
                Add Income
            </button>
        </div>
    )
}

export default AddExpenseForm
