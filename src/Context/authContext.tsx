import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";
import { Auth, RefreshToken } from "../types/Token"; // Certifique-se de que essas interfaces estejam bem definidas

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
            const decodedToken: any = jwt_decode(token);
            const currentTime = Date.now() / 1000;
            return decodedToken.exp < currentTime;
        } catch (error) {
            console.error("Error decoding token:", error);
            return true;
        }
    };

    // Função de login (temporário com e-mail e senha fixos)
    const login = async (email: string, password: string): Promise<Auth> => {
        // Login hardcoded (substituir com a API quando disponível)
        const validEmail = "test@domain.com";
        const validPassword = "123456";

        if (email === validEmail && password === validPassword) {
            // Simulando uma resposta de login bem-sucedido
            const authResponse: Auth = {
                token: "mocked-jwt-token", // Mock do token
                refreshToken: {
                    createdAt: "2024-01-01T00:00:00Z", // Mock do createdAt como string (ISO 8601)
                    expiresIn: "3600", // Mock de tempo de expiração em segundos
                    id: "mocked-refresh-token-id", // Mock do id do refresh token
                    userId: "mocked-user-id", // Mock do userId
                },
            };
            setAuth(authResponse);
            setIsAuthenticated(true);
            await AsyncStorage.setItem("auth", JSON.stringify(authResponse)); // Salva o token no AsyncStorage
            return authResponse;
        } else {
            throw new Error("Credenciais inválidas");
        }
    };

    // Função de logout
    const logout = async () => {
        setAuth(null);
        setIsAuthenticated(false);
        await AsyncStorage.removeItem("auth"); // Remove as credenciais do AsyncStorage
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
