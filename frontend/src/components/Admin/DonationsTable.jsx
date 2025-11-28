import React, { useEffect, useState } from "react";
import api from "../../services/api";

const DonationsTable = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Busca doações ao carregar
  useEffect(() => {
    loadDonations();
  }, []);

  const loadDonations = async () => {
    try {
      const response = await api.get("/donations");
      setDonations(response.data);
    } catch (error) {
      console.error("Erro ao buscar doações:", error);
    } finally {
      setLoading(false);
    }
  };

  // Função para atualizar status (Pendente -> Coletado)
  const handleStatusChange = async (id, newStatus) => {
    try {
      // Atualiza visualmente antes (otimista) ou espera a request
      // Vamos esperar a request para garantir
      await api.patch(`/donations/${id}/status`, { status: newStatus });
      
      // Atualiza a lista localmente para refletir a mudança
      setDonations((prev) =>
        prev.map((d) => (d.id === id ? { ...d, status: newStatus } : d))
      );
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      alert("Erro ao atualizar status.");
    }
  };

  // Estilos simples para Tabela Dark
  const tableStyle = { width: "100%", borderCollapse: "collapse", marginTop: "16px", color: "#e8eef8" };
  const thStyle = { textAlign: "left", padding: "12px", borderBottom: "1px solid #2b3a58", color: "#a8b3c7" };
  const tdStyle = { padding: "12px", borderBottom: "1px solid #1b2838" };
  const selectStyle = { 
    background: "#0f1623", color: "#e8eef8", border: "1px solid #2b3a58", 
    padding: "4px 8px", borderRadius: "4px" 
  };

  if (loading) return <p style={{color: "#a8b3c7"}}>Carregando doações...</p>;

  return (
    <div className="home-card">
      <h3 style={{ marginTop: 0 }}>Histórico de Doações</h3>
      {donations.length === 0 ? (
        <p style={{ color: "#a8b3c7" }}>Nenhuma doação registrada.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Data</th>
                <th style={thStyle}>Doador (Desc)</th>
                <th style={thStyle}>Categoria</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((d) => (
                <tr key={d.id}>
                  <td style={tdStyle}>
                    {new Date(d.createdAt).toLocaleDateString("pt-BR")}
                  </td>
                  <td style={tdStyle}>{d.description}</td>
                  <td style={tdStyle}>
                    {d.category ? d.category.name : "-"}
                  </td>
                  <td style={tdStyle}>
                    <select
                      style={selectStyle}
                      value={d.status}
                      onChange={(e) => handleStatusChange(d.id, e.target.value)}
                    >
                      <option value="pendente">Pendente</option>
                      <option value="coletado">Coletado</option>
                      <option value="cancelado">Cancelado</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DonationsTable;