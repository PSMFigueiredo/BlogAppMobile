import axios from 'axios';

const url = 'http://192.168.18.5:3000/';

const api = axios.create({
    baseURL: url,  // Altere para a URL do seu back-end
});

export const createStudentApi = async (body: object) => {
    try {
        const response = await api.post('students', body);
        return response.data;
    } catch (error) {
        console.error('Ocorreu um erro:', error);
        throw error
    }
};

export const updateStudentApi = async (id: string, body: object) => {
    try {
        const response = await api.put(`students/${id}`, body);
        return response.data;
    } catch (error) {
        console.error('Ocorreu um erro:', error);
        throw error
    }
};

export const getStudentByUserApi = async (id: string, token: string) => {
    try {
        const response = await api.get(`users/student/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Ocorreu um erro:', error);
        throw error
    }
};

export const getStudentsApi = async (token: string) => {
    try {
        const response = await api.get('students', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        return response.data;
    } catch (error) {
        console.error('Ocorreu um erro:', error);
        throw error
    }
};

export const deleteStudentApi = async (id: string, token: string) => {
    try {
        const response = await api.delete(`students/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        return response.data;
    } catch (error) {
        console.error('Ocorreu um erro:', error);
        throw error
    }
};

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

export const getProfessorByUserApi = async (id: string, token: string) => {
    try {
        const response = await api.get(`users/professor/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Ocorreu um erro:', error);
        throw error
    }
};

export const getProfessorsApi = async (token: string) => {
    try {
        const response = await api.get('professors', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        return response.data;
    } catch (error) {
        console.error('Ocorreu um erro:', error);
        throw error
    }
};

export const deleteProfessorApi = async (id: string, token: string) => {
    try {
        const response = await api.delete(`professors/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
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

export const getClassesApi = async (token: string) => {
    try {
        const response = await api.get('classes', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        return response.data;
    } catch (error) {
        console.error('Ocorreu um erro:', error);
        throw error
    }
};

export const createClassApi = async (body: object, token: string) => {
    try {
        const response = await api.post(`classes`, body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        return response.data;
    } catch (error) {
        console.error('Ocorreu um erro:', error);
        throw error
    }
};

export const editClassApi = async (id: string, body: object, token: string) => {
    try {
        const response = await api.put(`classes/${id}`, body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        return response.data;
    } catch (error) {
        console.error('Ocorreu um erro:', error);
        throw error
    }
};

export const deleteClassApi = async (id: string, token: string) => {
    try {
        const response = await api.delete(`classes/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        return response.data;
    } catch (error) {
        console.error('Ocorreu um erro:', error);
        throw error
    }
};




export const createPostApi = async (body: object, token: string) => {
    try {
        const response = await api.post(`posts`, body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        return response.data;
    } catch (error) {
        console.error('Ocorreu um erro:', error);
        throw error
    }
};

export const editPostApi = async (id: string, body: object, token: string) => {
    try {
        const response = await api.put(`posts/${id}`, body, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        return response.data;
    } catch (error) {
        console.error('Ocorreu um erro:', error);
        throw error
    }
};

export const getPostsApi = async (token: string) => {
    try {
        const response = await api.get(`posts`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        return response.data;
    } catch (error) {
        console.error('Ocorreu um erro:', error);
        throw error
    }
};

export const getPostsAdminApi = async (token: string) => {
    try {
        const response = await api.get(`posts/admin`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        return response.data;
    } catch (error) {
        console.error('Ocorreu um erro:', error);
        throw error
    }
};

export const deletePostApi = async (id: string, token: string) => {
    try {
        const response = await api.delete(`posts/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        return response.data;
    } catch (error) {
        console.error('Ocorreu um erro:', error);
        throw error
    }
};




