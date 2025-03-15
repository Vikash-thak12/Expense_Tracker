import React, { useEffect, useState } from 'react'
import { prepareExpenseBarChartData } from '../../utils/helper'
import CustomBarChart from '../Charts/CustomBarChart'

const Last30daysExpenses = ({ data }) => {
    // here two array is coming 
    // console.log('Data', data)  

    const [chartData, setChartData] = useState([])

    useEffect(() => {
        // from the below function i'm taking only amount and category for chart 
        const result = prepareExpenseBarChartData(data); 
        setChartData(result)
    },[data])

    useEffect(() => {
        console.log("ChartData", chartData)
    },[chartData])
  return (
    <div className='card col-span-1'>
      <div className='flex items-center justify-between'>
        <h5 className='text-lg'>Last 30 Days Expenses</h5>
      </div>

      <CustomBarChart data={chartData} />
    </div>
  )
}

export default Last30daysExpenses
