import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import Login from "../pages/Auth/Login"
import Signup from "../pages/Auth/Signup"
import Dashboard from "../pages/Dashboard/Home"
import Income from "../pages/Dashboard/Income"
import Expense from "../pages/Dashboard/Expense"
import UserProvider from '../context/UserContext'

const App = () => {
  return (
    <UserProvider>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Root />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/income' element={<Income />} />
            <Route path='/expense' element={<Expense />} />
          </Routes>
        </BrowserRouter>
      </div>
    </UserProvider>
  )
}

export default App


const Root = () => {
  // check if token exists in localStorage
  const isAuthenticated = !!localStorage.getItem("token");


  // if authenticated redirect to dashboard page else login page 
  return isAuthenticated ? (
    <Navigate to={"/dashboard"} />
  ) : (
    <Navigate to={"/signup"} />
  )
}