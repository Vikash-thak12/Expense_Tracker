import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext';

const Expense = () => {
  // const user = "vikash"; 
  const { user } = useContext(UserContext)
  console.log("user", user)
  return (
    <div>
      Expense
      <p>{user}</p>
    </div>
  )
}

export default Expense
