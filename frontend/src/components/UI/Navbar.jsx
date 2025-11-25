import React, { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"; // Importar contexto
import "./Navbar.css";

const Navbar = () => {
  const { signed, logout } = useContext(AuthContext);
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push("/login");
  };

  return (
    <header className="navbar">
      <nav className="navbar-container">
        <NavLink exact to="/" activeClassName="active-link" className="nav-btn">
          Página Inicial
        </NavLink>
        <NavLink to="/donor" activeClassName="active-link" className="nav-btn">
          Área do Doador
        </NavLink>
        <NavLink to="/needs" activeClassName="active-link" className="nav-btn">
          Necessidades
        </NavLink>

        {/* Lógica condicional do botão Admin/Login */}
        {signed ? (
          <>
            <NavLink to="/admin" activeClassName="active-link" className="nav-btn">
              Painel Admin
            </NavLink>
            <button 
              onClick={handleLogout} 
              className="nav-btn" 
              style={{ cursor: "pointer", background: "rgba(239, 68, 68, 0.2)", color: "#fca5a5", border: "1px solid rgba(239, 68, 68, 0.3)" }}
            >
              Sair
            </button>
          </>
        ) : (
          <NavLink to="/login" activeClassName="active-link" className="nav-btn">
            Login
          </NavLink>
        )}
      </nav>
    </header>
  );
};

export default Navbar;