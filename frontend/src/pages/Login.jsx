import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const { login } = useContext(AuthContext);
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setError(false);

    try {
      await login(email, password);
      history.push("/admin"); // Redireciona para Admin após sucesso
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Estilos inline para o formulário Dark
  const inputStyle = {
    background: "#0f1623",
    border: "1px solid #2b3a58",
    color: "#e8eef8",
    padding: "12px",
    borderRadius: "8px",
    width: "100%",
    marginTop: "8px",
    outline: "none",
  };

  const labelStyle = {
    color: "#a8b3c7",
    fontSize: "14px",
    fontWeight: "bold",
  };

  return (
    <div className="home-wrapper" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="home-card" style={{ maxWidth: "400px", width: "100%", padding: "40px" }}>
        <h2 style={{ textAlign: "center", color: "#e8eef8", marginBottom: "30px" }}>
          Acesso Restrito
        </h2>

        {error && (
          <div style={{ 
            background: "rgba(252, 165, 165, 0.1)", 
            color: "#fca5a5", 
            padding: "10px", 
            borderRadius: "8px", 
            marginBottom: "20px",
            textAlign: "center",
            fontSize: "14px"
          }}>
            Credenciais inválidas. Tente novamente.
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group" style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>E-mail</label>
            <input
              type="email"
              style={inputStyle}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@igreja.com"
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: "30px" }}>
            <label style={labelStyle}>Senha</label>
            <input
              type="password"
              style={inputStyle}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            className="button"
            style={{ width: "100%", padding: "14px", fontSize: "16px", opacity: isLoggingIn ? 0.7 : 1 }}
            disabled={isLoggingIn}
          >
            {isLoggingIn ? "Entrando..." : "Entrar no Sistema"}
          </button>
        </form>
        
        <div style={{ marginTop: "20px", textAlign: "center" }}>
            <a href="/" style={{ color: "#a8b3c7", fontSize: "14px", textDecoration: "none" }}>← Voltar para o site</a>
        </div>
      </div>
    </div>
  );
};

export default Login;