/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import ProfilePhotoSelector from "../../components/Auth/ProfilePhotoSelector";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import uploadImage from "../../utils/uploadImage.js";
import { API_BASE_URL } from "../../utils/apiPath.js";

const Signup = () => {
  const [profilePic, setProfilePic] = useState(null)
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("")

  // calling the User Context 
  const { UpdateUser } = useContext(UserContext)


  const [showPassword, setShowPassword] = useState(false);
  const [isUploading, setIsUploading] = useState(false);


  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    let profileImageUrl = "";
    setError("");

    try {
      setIsUploading(true); // Start upload

      if (profilePic) {
        const imageUploadRes = await uploadImage(profilePic);
        profileImageUrl = imageUploadRes.imageUrl || "";
      }

      setIsUploading(false); // End upload

      const response = await axios.post(`${API_BASE_URL}/api/v1/auth/register`, {
        fullName,
        email,
        password,
        profileImageUrl
      });

      const { token, user } = response.data;
      if (token) {
        localStorage.setItem("token", token);
        UpdateUser(user);
        navigate("/dashboard");
      }
    } catch (error) {
      setIsUploading(false); // Reset state in case of error
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong");
      }
    }
  };


  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800">Create an Account</h2>
        <p className="text-sm text-gray-500 text-center mb-6 py-2">
          Fill in your details below
        </p>

        <form className="space-y-4" onSubmit={handleSignup}>
          {/* Profilepic */}
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Email Field */}
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

          {/* Password Field with Toggle Visibility */}
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
          <button
            type="submit"
            disabled={isUploading}
            className={`w-full ${isUploading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"} text-white font-semibold py-3 rounded-lg transition`}
          >
            {isUploading ? "Uploading..." : "Sign Up"}
          </button>

        </form>

        <p className="text-sm text-gray-500 text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
