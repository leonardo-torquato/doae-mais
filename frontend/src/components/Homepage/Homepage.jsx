import React from "react";
import "./Homepage.css";
import { tiposDoacao } from "../../constants";

const Homepage = () => (
  <div className="homepage">
    <h1 className="homepage-title">
      Bem-vindo ao Sistema de Doações para Igrejas
    </h1>
    <p className="homepage-description">
      Facilite suas doações para igrejas! Escolha o tipo de doação e ajude quem
      mais precisa.
    </p>
    <div className="donation-types">
      {tiposDoacao.map((tipo) => ( 
        <div key={tipo.id} className="donation-card">
          {tipo.nome}
        </div>
      ))}
    </div>
    <p>
      <strong>Cadastre sua igreja</strong> ou <strong>faça uma doação</strong>{" "}
      agora mesmo!
    </p>
  </div>
);

export default Homepage;
