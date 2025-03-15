import React from 'react'
import { LuArrowRight } from 'react-icons/lu'
import moment from "moment"
import TransactionInfoCard from '../Cards/TransactionInfoCard'

const RecentTransaction = ({
    transaction,
    onSeemore
}) => {
    return (
        <div className='card h-full '>
            <div className='flex items-center justify-between'>
                <h5>Recent Transactions</h5>
                <button className='card-btn' onClick={onSeemore}>See more <LuArrowRight className='text-base' /> </button>
            </div>

            {/* <div className='mt-6 h-[380px] bg-green-100'> */}
            <div className='mt-6'>
                {transaction?.slice(0, 5)?.map((item) => (
                    <TransactionInfoCard
                        key={item._id}
                        title={item.type == "expense" ? item.category : item.source}
                        date={moment(item.date).format("Do MMM YYYY")}
                        icon={item.icon}
                        amount={item.amount}
                        type={item.type}
                        hideDeleteBtn
                    />
                ))}
            </div>
        </div>
    )
}

export default RecentTransaction
