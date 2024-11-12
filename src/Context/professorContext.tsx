// import React, { createContext, useContext, useState, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { getProfessorApi } from '../services/api'; // Suponha que tenha uma função para buscar informações do professor
// import { Auth } from '../types/Token';
//
// // Interface do contexto do professor
// export interface ProfessorContextType {
//   professor: any | null; // Tipo específico para professor
//   getProfessorByUser: (userId: string, token: string) => Promise<any>;
// }
//
// export const ProfessorContext = createContext<ProfessorContextType | undefined>(
//   {} as ProfessorContextType
// );
//
// export const useProf = (): ProfessorContextType => {
//   const context = useContext(ProfessorContext);
//   if (!context) {
//     throw new Error("'useProf' deve ser usado dentro de um ProfessorProvider");
//   }
//   return context;
// };
//
// // Provider para gerenciar o estado do professor
// export const ProfessorProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [professor, setProfessor] = useState<any | null>(null);
//
//   // Carrega o estado do professor armazenado no AsyncStorage
//   useEffect(() => {
//     const loadProfessorFromStorage = async () => {
//       const storedProfessor = await AsyncStorage.getItem('professor');
//       if (storedProfessor) {
//         setProfessor(JSON.parse(storedProfessor));
//       }
//     };
//
//     loadProfessorFromStorage();
//   }, []);
//
//   // Salva o estado do professor no AsyncStorage sempre que `professor` mudar
//   useEffect(() => {
//     if (professor) {
//       AsyncStorage.setItem('professor', JSON.stringify(professor));
//     } else {
//       AsyncStorage.removeItem('professor');
//     }
//   }, [professor]);
//
//   // Função para obter dados do professor pelo userId
//   const getProfessorByUser = async (userId: string, token: string): Promise<any> => {
//     try {
//       const res = await getProfessorApi(userId, token);
//       if (res) {
//         setProfessor(res.data);
//         return res.data;
//       }
//     } catch (error) {
//       console.error('Erro ao buscar professor:', error);
//       throw new Error('Erro ao buscar professor');
//     }
//   };
//
//   return (
//     <ProfessorContext.Provider value={{ professor, getProfessorByUser }}>
//       {children}
//     </ProfessorContext.Provider>
//   );
// };
