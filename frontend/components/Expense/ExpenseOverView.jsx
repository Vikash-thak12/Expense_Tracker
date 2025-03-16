import React, { useEffect, useState } from 'react'
import { prepareExpenseLineChartData } from '../../utils/helper'
import { LuPlus } from 'react-icons/lu'
import CustomBarChart from '../Charts/CustomBarChart'

const ExpenseOverView = ({ transactions, onAddExpense }) => {
    const [chartdata, setChartdata] = useState([])

    useEffect(() => {
        const result = prepareExpenseLineChartData(transactions)
        setChartdata(result)

        return () => []
    }, [transactions])
    return (
        <div className='card'>
            <div className='flex max-md:flex-col max-md:items-start items-center justify-between'>
                <div>
                    <h5 className='font-semibold text-xl'>Expense OverView</h5>
                    <p className='text-xs text-gray-600'>Track your spending over time and have full control over your money..</p>
                </div>
                <button onClick={onAddExpense} className='cursor-pointer max-md:mt-2 flex items-center gap-1 bg-primary text-white p-2 rounded-md max-md:text-xs'>
                    <LuPlus />
                    Add Expense
                </button>
            </div>

            <div className='mt-10'>
                <CustomBarChart
                    data={chartdata}
                />
            </div>
        </div>
    )
}

export default ExpenseOverView
