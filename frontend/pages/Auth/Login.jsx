/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { validateEmail, validatePassword } from "../../utils/helper"
import axios from "axios"
import { UserContext } from "../../context/UserContext";
import { API_BASE_URL } from "../../utils/apiPath";
import Loader from "../../components/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); 


  // calling userContext 
  const { UpdateUser }  = useContext(UserContext)


  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); 
    // setLoading(true)
    console.log("Email: ", email)
    console.log("Password: ", password)

    if(!validateEmail(email)){
      setError("Please enter a valid Email")
      return
    }

    // API Call for login 
    try {
      setLoading(true)
      const response = await axios.post(`${API_BASE_URL}/api/v1/auth/login`, {
        email, 
        password
      })

      const { token, user } = response.data;
      if(token){
        localStorage.setItem("token", token); 
        UpdateUser(user); 
        navigate("/dashboard")
      }
    } catch (error) {
      if(error.response && error.response.data.message) {
        setError(error.response.data.message)
      } else {
        setError("Something went wrong", error)
      }
    } finally{
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Expense Tracker</h2>
        <p className="text-sm text-gray-500 text-center mb-6 py-2">Enter your credentials below</p>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </button>
            </div>
          </div>

          {
            error && <div className="text-red-500 text-[12px]">{error}</div>
          }

          <button
            type="submit"
            className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition"
          >
            {loading ? <Loader /> : "Sign In"}
          </button>
        </form>

        <p className="text-sm text-gray-500 text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
