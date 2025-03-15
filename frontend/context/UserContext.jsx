import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    // Initialize state with localStorage data
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    // Function to update the user and store it in localStorage
    const UpdateUser = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData)); // Store user in localStorage
    };

    // Function to remove the user (e.g., Logout)
    const ClearUser = () => {
        setUser(null);
        localStorage.removeItem("user"); // Remove user from localStorage
    };

    return (
        <UserContext.Provider value={{ user, UpdateUser, ClearUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
