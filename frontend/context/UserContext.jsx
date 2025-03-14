import { createContext, useState } from "react";

export const UserContext = createContext(); 

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); 

    // function to Update the user  
    const UpdateUser = (userData) => {
        setUser(userData); 
    }

    // function to remove user (e.g. Logout)
    const ClearUser = () => {
        setUser(null); 
    }

    return(
        <UserContext.Provider value={{ user, UpdateUser, ClearUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;