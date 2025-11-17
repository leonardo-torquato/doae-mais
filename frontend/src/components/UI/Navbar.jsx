import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => (
  <header className="navbar">
    <nav className="navbar-container">
      <NavLink exact to="/" activeClassName="active-link" className="nav-btn">
        Página Inicial
      </NavLink>
      <NavLink to="/donor" activeClassName="active-link" className="nav-btn">
        Área do Doador
      </NavLink>
      <NavLink to="/admin" activeClassName="active-link" className="nav-btn">
        Área da Igreja
      </NavLink>
      <NavLink to="/needs" activeClassName="active-link" className="nav-btn">
        Necessidades
      </NavLink>
    </nav>
  </header>
);

export default Navbar;
