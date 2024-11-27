import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userLoginApi } from "../services/apiFunctions";
import jwtDecode from "jwt-decode";
import { Auth } from "../types/Token";

// Interface do contexto de autenticação
export interface AuthContextType {
    auth: Auth | null;
    setAuth(auth: Auth): void;
    logout(): void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
    {} as AuthContextType
);

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("'useAuth' deve ser usado dentro de um AuthProvider");
    }
    return context;
};

// AuthProvider para gerenciar a autenticação
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [auth, setAuth] = useState<Auth | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    // Função de logout
    const logout = async () => {
        setAuth(null);
        await AsyncStorage.removeItem("auth");
        await AsyncStorage.removeItem("professor");
        await AsyncStorage.removeItem("student");
    };

    return (
        <AuthContext.Provider value={{ auth, setAuth, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
