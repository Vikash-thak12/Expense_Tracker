import React, { useState } from 'react'
import EmojiPickerPopup from '../EmojiPickerPopup';

const AddIncomeForm = ({ onAddIncome }) => {
    const [income, setIncome] = useState({
        source: "",
        amount: 0,
        date: "",
        icon: ""
    });

    const handleChange = (key, value) => setIncome({ ...income, [key]: value });

    // const Input = ({ value, onChange, label, type, placeholder }) => (
    //     <div className='flex flex-col w-full'>
    //         <label className='mb-2'>{label}</label>
    //         <input
    //             type={type}
    //             placeholder={placeholder}
    //             className='p-2 border border-gray-300 rounded'
    //             value={value}
    //             onChange={onChange}
    //         />
    //     </div>
    // );

    return (
        <div className='flex flex-col items-start flex-1 gap-5'>
            <EmojiPickerPopup
                icon={income.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />

            <div className='flex flex-col w-full'>
                <label className='mb-2'>Income Source</label>
                <input
                    value={income.source}
                    onChange={({ target }) => handleChange("source", target.value)}
                    label="Income Source"
                    type="text"
                    placeholder="Freelancing, salary, etc"
                    className='p-2 border border-gray-300 rounded'
                />
            </div>


            <div className='flex flex-col w-full'>
                <label className='mb-2'>Choose Amount</label>
                <input
                    value={income.amount}
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
                    value={income.date}
                    onChange={({ target }) => handleChange("date", target.value)}
                    label="Date"
                    type="date"
                    placeholder="Select date"
                    className='p-2 border border-gray-300 rounded'
                />
            </div>

            <button type='button' onClick={() => onAddIncome(income)} className='bg-green-500 px-4 py-2 rounded-md text-center mx-auto cursor-pointer'>
                Add Income
            </button>
        </div>
    );
}

export default AddIncomeForm
