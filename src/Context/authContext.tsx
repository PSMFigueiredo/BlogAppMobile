import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userLoginApi } from "../services/api";
import jwtDecode from "jwt-decode";
import { Auth } from "../types/Token";

// Interface do contexto de autenticação
export interface AuthContextType {
    isAuthenticated: boolean;
    auth: Auth | null;
    login: (email: string, password: string) => Promise<Auth>;
    logout: () => void;
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

    // Carrega o estado de autenticação armazenado no AsyncStorage
    useEffect(() => {
        const loadAuthFromStorage = async () => {
            const storedAuth = await AsyncStorage.getItem("auth");
            if (storedAuth) {
                const parsedAuth: Auth = JSON.parse(storedAuth);
                setAuth(parsedAuth);
                setIsAuthenticated(!isTokenExpired(parsedAuth.token));
            }
        };

        loadAuthFromStorage();
    }, []);

    // Salva o estado de autenticação no AsyncStorage sempre que `auth` muda
    useEffect(() => {
        if (auth) {
            AsyncStorage.setItem("auth", JSON.stringify(auth));
        } else {
            AsyncStorage.removeItem("auth");
        }
    }, [auth]);

    // Função para verificar se o token expirou
    const isTokenExpired = (token: string): boolean => {
        if (!token) return true;
        try {
            const decodedToken: any = jwtDecode(token);
            const currentTime = Date.now() / 1000;
            return decodedToken.exp < currentTime;
        } catch (error) {
            console.error("Error decoding token:", error);
            return true;
        }
    };

    // Função de login
    const login = async (email: string, password: string): Promise<Auth> => {
        const res = await userLoginApi({ email, password });
        if (res) {
            const authResponse: Auth = {
                token: res.data.token,
                refreshToken: {
                    createdAt: res.data.refreshToken.createdAt,
                    expiresIn: res.data.refreshToken.expiresIn,
                    id: res.data.refreshToken.id,
                    userId: res.data.refreshToken.userId,
                },
            };
            setAuth(authResponse);
            setIsAuthenticated(true);
            return authResponse;
        }
        throw new Error('Falha no login');
    };

    // Função de logout
    const logout = async () => {
        setAuth(null);
        setIsAuthenticated(false);
        await AsyncStorage.removeItem("auth");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
