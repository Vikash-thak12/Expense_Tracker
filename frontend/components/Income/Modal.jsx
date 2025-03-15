import React from 'react'
import { MdCancel } from "react-icons/md";

const Modal = ({ children, isOpen, onClose, title }) => {
    if(!isOpen) return null; 
    return (
        <div className='fixed top-0 left-0 right-0 z-50 flex items-center justify-center w-full h-[calc(100%)] max-h-full overflow-y-auto overflow-x-hidden bg-black/20 bg-opacity-50'>
            <div className='relative p-4 w-full max-w-2xl max-h-full'>
                <div className='relative  bg-white rounded-lg shadow-sm dark:bg-gray-200'>
                    {/* modal header */}
                    <div className='flex items-center justify-between p-4 md:p-5 border-b rounded-xs dark:border-gray-600 border-gray-600'>
                        <h1>{title}</h1>
                        <button type='button' onClick={onClose} className='cursor-pointer p-1 rounded-full'>
                            <MdCancel className='text-3xl hover:scale-110' />
                        </button>
                    </div>

                    {/* modal body */}
                    <div className='p-4 md:p-5 space-y-4'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
