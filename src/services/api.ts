// import axios from 'axios';
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const api = axios.create({
//     baseURL: 'http://192.168.1.8:3000/',
// });

// api.interceptors.request.use(
//     async (config) => {
//         const token = await AsyncStorage.getItem('authToken');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );


// export default api
