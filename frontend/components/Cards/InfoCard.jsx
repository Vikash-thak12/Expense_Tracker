import React from 'react'

const InfoCard = ({
    icon,
    label,
    value,
    color
}) => {
  return (
    <div className='flex gap-6 bg-white shadow-md shadow-gray-200 p-6 rounded-2xl border border-gray-200/50'>
        <div className={`w-14 h-14 flex items-center justify-center rounded-full ${color} text-white text-[26px]`}>
            {icon}
        </div>
        <div>
            <h6 className='text-base text-gray-500 mb-1'>{label}</h6>
            <span className='text-[20px] font-semibold'>Rs. {value}</span>
        </div>
    </div>
  )
}

export default InfoCard
