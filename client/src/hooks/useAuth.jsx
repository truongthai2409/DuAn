import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const token = Cookies.get('authToken');
        if (token) {
            const userData = { name: 'User' }; 
            setUser(userData);
        }
        setLoading(false); 
    }, []);

    const loginAuth = (userData) => {
        setUser(userData);
        Cookies.set('authToken', userData.token);
    };

    const logoutAuth = () => {
        setUser(null);
        Cookies.remove('authToken');
    };

    return (
        <AuthContext.Provider value={{ user, loginAuth, logoutAuth, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
