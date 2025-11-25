import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", //TODO: Configurar base de URL de produção no main.ts do NestJS
  timeout: 10000,
});

// Interceptor de Requisição
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("@IgrejaAuth:token");
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;