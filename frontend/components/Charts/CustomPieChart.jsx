import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, Text } from "recharts"
import CustomLegend from './CustomLegend'

const CustomPieChart = ({
    data = [],
    label,
    totalAmount,
    colors,
    showTextAnchor
}) => {
    return (
        <ResponsiveContainer width="100%" height={380}>
            <PieChart>
                <Pie
                    data={data}
                    dataKey={"amount"}
                    nameKey={"name"}
                    cx={"50%"}
                    cy={"50%"}
                    outerRadius={130}
                    innerRadius={100}
                    labelLine={false}
                >
                    {
                        data && (
                            data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                            ))
                        )
                    }
                </Pie>
                <Tooltip />
                <Legend content={<CustomLegend />} />
                {
                    showTextAnchor && (
                        <>
                            <Text x={"50%"} y={"50%"} dy={-25} textAnchor="middle" fill="#666" fontsize={"14px"}>
                                {label}
                            </Text>

                            <Text x={"50%"} y={"50%"} dy={8} textAnchor="middle" fill="#333" fontsize={"24px"} fontWeight={"semi-bold"}>
                                {totalAmount}
                            </Text>

                        </>
                    )
                }
            </PieChart>
        </ResponsiveContainer>
    )
}

export default CustomPieChart
