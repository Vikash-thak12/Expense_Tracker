import React from 'react'
import { LuTrash2, LuTrendingDown, LuTrendingUp, LuUtensils } from 'react-icons/lu'

const TransactionInfoCard = ({
    title,
    date,
    icon,
    amount,
    type,
    hideDeleteBtn
}) => {
    const ondelete = () => {

    }
    return (
        <div className='group relative flex items-center gap-4 mt-2 p-3 rounded-lg hover:bg-gray-200/50'>
            <div className='w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded-full'>
                {icon ? (
                    <img src={icon} alt={title} className='w-6 h-6' />
                ): (
                    <LuUtensils />
                )}
            </div>
            <div className='flex flex-1 items-center justify-between'>
                <div>
                    <p className='text-sm text-gray-700 font-medium'>{title}</p>
                    <p className='text-xs text-gray-400 mt-1'>{date}</p>
                </div>

                <div>
                    {!hideDeleteBtn && (
                        <button onClick={ondelete}>
                            <LuTrash2 />
                        </button>
                    )}

                    <div className={`flex items-center gap-2 px-2 py-1 rounded-md w-[120px] text-center ${type == 'income' ? 'bg-green-50 text-green-500': 'bg-red-50 text-red-500'}`}>
                        <h6>{type == 'income' ? "+" : "-"} ${amount}</h6>
                        {type == "income" ? <LuTrendingUp /> : <LuTrendingDown />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TransactionInfoCard
