import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'

const Home = () => {
  const { user } = useContext(UserContext)
  console.log("The user is", user)
  return (
    <div>
      This is home page
      <p>{user?.fullName}</p>
    </div>
  )
}

export default Home
