import React, { useEffect, useState } from 'react'
import CustomPieChart from '../Charts/CustomPieChart'

const RecentIncomeWithChart = ({ data, totalIncome}) => {
    const [chartData, setChartData] = useState([]); 
    const Colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']

    const prepareChartData = () => {
        let dataArr = []; 
        if (data) {
            dataArr = data.map((item) => ({
                name: item?.source, 
                amount: item?.amount
            }));
        }

        setChartData(dataArr)
    }

    

    useEffect(() => {
        prepareChartData(); 
        return () => {}
    },[data])
  return (
    <div className='card'>
      <div className='flex items-center justify-between'>
        <h5>Last 60 Days Income</h5>
      </div>

      <CustomPieChart
      data={chartData}
      label={"Total Income"}
      totalAmount={`${totalIncome}`}
      showTextAnchor
      colors={Colors}
      />
    </div>
  )
}

export default RecentIncomeWithChart
