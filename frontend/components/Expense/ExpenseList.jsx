import moment from 'moment'
import React from 'react'
import { LuDownload } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'

const ExpenseList = ({ transactions, onDelete, onDownload }) => {
    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5>Expense Sources</h5>
                <button onClick={onDownload} className='flex items-center gap-1 cursor-pointer bg-blue-100 p-1 rounded-md hover:scale-110 transition-all'>
                    <LuDownload className='text-xl' /> Download
                </button>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {
                    transactions && (
                        transactions.map((income) => (
                            <TransactionInfoCard
                                key={income._id}
                                title={income.category}
                                icon={income.icon}
                                date={moment(income.date).format("Do MMM YYYY")}
                                amount={income.amount}
                                type={"expense"}
                                ondelete={() => onDelete(income._id)}
                            />
                        ))
                    )
                }
            </div>
        </div>
    )
}

export default ExpenseList
