import React, { useState, createContext } from 'react';

const UserContext = createContext({
    userEmail: "",
    setUserEmail: () => {}
});

const UserProvider = ({ children }) => {
    const [userEmail, setUserEmail] = useState("");
    
    const value = { userEmail, setUserEmail };
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};

export { UserContext, UserProvider };