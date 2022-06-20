import React, { useState, createContext } from 'react';

const ProgressContext = createContext({
    inProgress: false,
    spinner: () => {},
    isLogin: false,
    setLogin: () => {},
});

const ProgressProvider = ({ children }) => {
    const [inProgress, setInProgress] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
    const spinner = {
        start: () => setInProgress(true),
        stop: () => setInProgress(false),
    };
    const setLogin = {
        login: () => setIsLogin(true),
        logout: () => setIsLogin(false),
    };
    const value = { inProgress, spinner, isLogin, setLogin };
    return (
        <ProgressContext.Provider value={value}>
            {children}
        </ProgressContext.Provider>
    );
};

export { ProgressContext, ProgressProvider};