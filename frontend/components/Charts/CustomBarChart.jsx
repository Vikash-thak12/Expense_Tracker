import React from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell
} from "recharts"

const CustomBarChart = ({ data }) => {
    const getBarColor = (index) => {
        return index % 2 == 0 ? "#875cf5" : "#cfbefb";
    }

    const CustomTooltip = ({ active, payload}) => {
        if(active && payload && payload.length){
            return (
                <div className='bg-white shadow-md rounded-md p-2 border border-gray-300'>
                    <p className='text-sm font-semibold text-purple-800 mb-1'>{payload[0].payload.category || payload[0].payload.source}</p>
                    <p className='text-xs text-gray-600 font-semibold'>
                        Amount: <span className='text-gray-900 text-xs'>Rs. {payload[0].payload.amount}</span>
                    </p>
                </div>
            )
        }
        return null
    }
    return (
        <div className='bg-white mt-6'>
            <ResponsiveContainer width={"100%"} height={300}>
                <BarChart data={data}>
                    <CartesianGrid stroke='none' />

                    <XAxis dataKey={"month"} tick={{ fontSize: 12, fill: "#555" }} stroke='none' />
                    <YAxis tick={{ fontSize: 12, fill: "#555" }} stroke='none' />

                    <Tooltip content={CustomTooltip} /> 

                    <Bar dataKey="amount" fill='#FF8042' radius={[10, 10, 0, 0]} activeDot={{ r: 8, fill: "yellow" }} activeStyle={{ fill: "green" }}>
                        {
                            data && (

                                data.map((entry, index) => (
                                    <Cell key={index} fill={getBarColor(index)} />  
                                ))
                            )
                        }
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default CustomBarChart
