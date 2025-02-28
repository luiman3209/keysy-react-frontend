import React, { createContext, useState, useEffect } from "react";
import { loginUser, getAuthToken } from "../services/authService";

interface AuthContextType {
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}

// Create context
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(getAuthToken());

    useEffect(() => {
        setToken(getAuthToken());
    }, []);

    // Login function
    const login = async (email: string, password: string) => {
        const token = await loginUser(email, password);
        setToken(token);
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem("jwt");
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token }}>
            {children}
        </AuthContext.Provider>
    );
};
