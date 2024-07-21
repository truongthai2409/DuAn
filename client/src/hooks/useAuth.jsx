import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const loginAuth = (userData) => {
        setUser(userData);
    };

    const logoutAuth = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loginAuth, logoutAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
