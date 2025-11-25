import React, { createContext, useState, useEffect } from "react";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ao carregar a página, verifica se já existe token salvo
    const recoveredToken = localStorage.getItem("@IgrejaAuth:token");

    if (recoveredToken) {
      // Se tem token, define que o usuário está logado (podemos melhorar validando o token no back futuramente)
      setUser({ token: recoveredToken });
      
      // Configura o token no header padrão do axios para casos de refresh
      api.defaults.headers.common["Authorization"] = `Bearer ${recoveredToken}`;
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Chamada ao Backend
    const response = await api.post("/auth/login", {
      email,
      password,
    });

    const { access_token } = response.data;

    // Salva no localStorage e no estado
    localStorage.setItem("@IgrejaAuth:token", access_token);
    
    // Configura o Axios para usar esse token nas próximas requisições
    api.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
    
    setUser({ token: access_token, email });
  };

  const logout = () => {
    localStorage.removeItem("@IgrejaAuth:token");
    api.defaults.headers.common["Authorization"] = null;
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        signed: !!user, // Booleano: true se user existe
        user,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};