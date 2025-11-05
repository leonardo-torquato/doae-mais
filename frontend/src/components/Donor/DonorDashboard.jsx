import React, { useState, useContext } from "react";
import { DataContext } from "../../context/DataContext"; 
import { tiposDoacao } from "../../constants";

const DonorDashboard = () => {

  const [tipo, setTipo] = useState(tiposDoacao[0].id);
  const [descricao, setDescricao] = useState("");

  const { addDonation } = useContext(DataContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newDonation = {
      tipo,
      descricao,
    };
    
    // 7. Chamar a função do Contexto (que simula o POST) 
    // TODO: corrigir
    addDonation(newDonation);

    alert(`Doação enviada: ${tipo} - ${descricao}`);
    setDescricao("");
    setTipo(tiposDoacao[0].id);
  };

  return (
    <div className="container" style={{ paddingBottom: "100px" }}>
      <h2>Área do Doador</h2>
      <h3>Painel de Doações — Igreja Esperança</h3>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tipo de Doação:</label>
          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            {tiposDoacao.map((tipo) => (
              <option key={tipo.id} value={tipo.id}>
                {tipo.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Descrição / Quantidade:</label>
          <input
            type="text"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            placeholder="Ex: 5kg de arroz, 3 pacotes de feijão..."
            required
          />
        </div>

        <button type="submit" className="button">
          Doar
        </button>
      </form>
    </div>
  );
};

export default DonorDashboard;