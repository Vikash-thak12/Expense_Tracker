import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'
import moment from 'moment'

const ExpenseTransactions = ({ transactions, onSeeMore}) => {
  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h4 className='text-lg'>Expenses</h4>
        <button className='card-btn' onClick={onSeeMore}>
            See More <LuArrowRight />
        </button>
      </div>

    <div className='mt-6'>
      {transactions && (
        transactions?.slice(0,5)?.map((expense) => (
          <TransactionInfoCard
            key={expense._id}
            title={expense.category}
            date={moment(expense.date).format("Do MMM YYYY")}
            icon={expense.icon}
            amount={expense.amount}
            type="expense"
            hideDeleteBtn
          />
        ))
      )}
    </div>
    </div>
  )
}

export default ExpenseTransactions
