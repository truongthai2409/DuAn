import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
    token: string;
    loginAuth: (response: { status: string; message: string; token: string }) => void;
    logoutAuth: () => void;
    loading: boolean;
}

const defaultContextValue: AuthContextType = {
    token: null,
    loginAuth: () => {},
    logoutAuth: () => {},
    loading: true,
};

const AuthContext = createContext<AuthContextType>(defaultContextValue);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getToken = async () => {
            let token = localStorage.getItem('authToken');
            if (token) {
                setToken(token);
            }
            setLoading(false);
        };

        getToken();
    }, []);

    const loginAuth = (response: { status: string; message: string; token: string }) => {
        if (response.status === 'success') {
            const { token } = response;
            setToken(token);
            localStorage.setItem('authToken', token);

            // Save authToken to Chrome extension storage
            if (chrome && chrome.storage && chrome.storage.local) {
                chrome.storage.local.set({ authToken: token }, () => {
                    console.log('authToken saved to Chrome extension storage.');
                });
            }
        }
    };

    const logoutAuth = () => {
        setToken(null);
        localStorage.removeItem('authToken');

        // Remove authToken from Chrome extension storage
        if (chrome && chrome.storage && chrome.storage.local) {
            chrome.storage.local.remove('authToken', () => {
                console.log('authToken removed from Chrome extension storage.');
            });
        }
    };

    return (
        <AuthContext.Provider value={{ token, loginAuth, logoutAuth, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
