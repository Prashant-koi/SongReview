import React, { createContext, useState, useEffect, useContext } from "react";
import axios from 'axios';

axios.defaults.withCredentials = true;

const API_URL = 'http://localhost:5000';
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/auth/status`);
                if (response.data.isAuthenticated) {
                    setUser(response.data.user);
                }
            } catch (err) {
                console.error('Auth check failed:', err);
            } finally {
                setLoading(false);
            }
        };

        checkAuthStatus();
    }, []);

    const login = () => {
        window.location.href = `${API_URL}/auth/google`;
    };

    const logout = async () => {
        try {
            await axios.get(`${API_URL}/api/auth/logout`);
            setUser(null);
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    const value = {
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Create a hook for using the auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default AuthContext;