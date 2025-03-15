import { useContext, useEffect } from "react"
import { UserContext } from "../context/UserContext"
import { useNavigate } from "react-router-dom";
import axios from "axios"

export const useUserAuth = () => {
    const {user, UpdateUser, ClearUser} = useContext(UserContext); 
    const navigate = useNavigate();

    useEffect(() => {
        if(user) return;  
        let isMounted = true; 

        const fetchUserInfo = async () => {
            try {
                const token = localStorage.getItem("token")
                const response = await axios.get("http://localhost:3000/api/v1/auth/getuser", {
                        headers: { Authorization: `Bearer ${token}` }
                }); 
                // console.log("API Response:", response.data);
                if(isMounted && response.data){
                    UpdateUser(response.data)
                }
            } catch (error) {
                console.log("Failed to fetch User Information", error)
                if(isMounted){
                    ClearUser(); 
                    navigate("/login"); 
                }
            }
        }
        fetchUserInfo();

        return () => {
            isMounted = false; 
        }
    },[UpdateUser, ClearUser, navigate])
}