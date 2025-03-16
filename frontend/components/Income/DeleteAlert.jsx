import React from 'react'
import { LuTrash } from 'react-icons/lu'

const DeleteAlert = ({content, onDelete}) => {
  return (
    <div className='w-full'>
      <p className='text-lg text-red-500'>{content}</p>
      <button onClick={onDelete} type='button' className='bg-red-500 px-2 py-1 rounded-md flex items-center gap-1 mx-auto cursor-pointer mt-2 text-black'>
        <LuTrash className='text-lg' /> Delete
      </button>
    </div>
  )
}

export default DeleteAlert
