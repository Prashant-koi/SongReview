import { createContext, useState, useEffect, useContext, Children } from "react";
import axios from 'axios';

axios.defaults.withCredentials = true;

const API_URL = 'http://localhost:5000';

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [use, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        const checkAuthStatus = async () => {
            try{
                const response = await axios.get(`${API_URL}/api/auth/status`);
                if (response.data.isAuthenticated) {
                    setUser(response.data.user);
                }
            } catch (err) {
                console.err('Auth check failed:', err);
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
            console.err('Logout Failed:', err)
        }
    };

    return(
        {children}
    )
};

export const useAuth = () => useContext(AuthContext);