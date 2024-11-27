import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userLoginApi } from "../services/apiFunctions";
import jwtDecode from "jwt-decode";
import { Professor } from "../types/Professor";

// Interface do contexto de autenticação
export interface ProfessorContextType {
    professor: Professor | null;
    setProfessor(professor: Professor): void;
}

export const ProfessorContext = createContext<ProfessorContextType | undefined>(
    {} as ProfessorContextType
);

export const useProfessor = (): ProfessorContextType => {
    const context = useContext(ProfessorContext);
    if (!context) {
        throw new Error("'useProfessor' deve ser usado dentro de um ProfessorProvider");
    }
    return context;
};

// ProfessorProvider para gerenciar a autenticação
export const ProfessorProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [professor, setProfessor] = useState<Professor | null>(null);


    return (
        <ProfessorContext.Provider value={{ professor, setProfessor }}>
            {children}
        </ProfessorContext.Provider>
    );
};
