import React, { useEffect, useState } from 'react'
import { prepareIncomeBarchartData } from '../../utils/helper'
import { LuPlus } from 'react-icons/lu'
import CustomBarChart from '../Charts/CustomBarChart'

const IncomeOverView = ({ transactions, onAddIncome}) => {
    const [chartData, setChartData] = useState([])

    useEffect(() => {
        const result = prepareIncomeBarchartData(transactions); 
        setChartData(result)

        return () => {}
    },[transactions])
  return (
    <div className='card'>
      <div className='flex max-md:flex-col max-md:items-start items-center justify-between'>
        <div>
            <h5 className='font-semibold text-xl'>Income OverView</h5>
            <p className='text-xs text-gray-600'>Track your earnings over time and have full control over your money..</p>
        </div>
        <button onClick={onAddIncome} className='cursor-pointer max-md:mt-2 flex items-center gap-1 bg-primary text-white p-2 rounded-md max-md:text-xs'>
            <LuPlus />
            Add Income 
        </button>
      </div>

      <div className='mt-10'>
        <CustomBarChart 
        data={chartData}
        />
      </div>
    </div>
  )
}

export default IncomeOverView
