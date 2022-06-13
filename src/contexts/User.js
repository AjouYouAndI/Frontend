import React, { useState, createContext } from 'react';

const UserContext = createContext({
    userEmail: "",
    setUserEmail: () => {},
    baseUrl: "http://3.39.39.31:8080",
    userName: "",
    setUserName: () => {},
    token: "",
    setToken: () => {},
    rToken: "",
    setRToken: () => {},
    userRegion: "",
    setUserRegion: () => {},
    userLati: "",
    setUserLati: () => {},
    userLongi: "",
    setUserLongi: () => {}
});

const UserProvider = ({ children }) => {
    const [userEmail, setUserEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [token, setToken] = useState("");
    const [rToken, setRToken] = useState("");
    const [userRegion, setUserRegion] = useState("");
    const [userLati, setUserLati] = useState("");
    const [userLongi, setUserLongi] = useState("");

    const baseUrl = "http://3.39.39.31:8080";
    const value = { userEmail, setUserEmail, baseUrl, userName, setUserName, 
        token, setToken, setRToken, rToken, userRegion, setUserRegion, setUserLati, userLati, userLongi, setUserLongi };
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
};

export { UserContext, UserProvider };