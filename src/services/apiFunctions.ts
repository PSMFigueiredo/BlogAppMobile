import api from "./api";

export const createProfessorApi = async (body: object) => {
    try {
        const response = await api.post('professors', body);
        return response.data;
    } catch (error) {
        console.error('Ocorreu um erro:', error);
        throw error
    }
};

export const updateProfessorApi = async (id: string, body: object) => {
    try {
        const response = await api.put(`professors/${id}`, body);
        return response.data;
    } catch (error) {
        console.error('Ocorreu um erro:', error);
        throw error
    }
};

export const getProfessorApi = async (id: string, body: object) => {
    try {
        const response = await api.get(`users/professor/${id}`);
        return response.data;
    } catch (error) {
        console.error('Ocorreu um erro:', error);
        throw error
    }
};

export const getProfessorsApi = async () => {
    try {
        const response = await api.get('professors');
        return response.data;
    } catch (error) {
        console.error('Ocorreu um erro:', error);
        throw error
    }
};

export const userLoginApi = async (body: object) => {
    try {
        const response = await api.post('users/login', body);
        return response.data;
    } catch (error) {
        console.error('Ocorreu um erro:', error);
        throw error
    }
};