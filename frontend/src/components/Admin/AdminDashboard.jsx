import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import api from "../../services/api";

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminDashboard = () => {
  // --- ESTADOS DO DASHBOARD ---
  const [chartData, setChartData] = useState({ labels: [], data: [] });
  const [loadingChart, setLoadingChart] = useState(true);

  // --- ESTADOS DO GERADOR DE PIX ---
  const [pixForm, setPixForm] = useState({ key: "", value: "", description: "" });
  const [generatedPix, setGeneratedPix] = useState(null); // { payload, base64 }
  const [loadingPix, setLoadingPix] = useState(false);

  // 1. BUSCAR DADOS DO GRÁFICO (ADMIN SUMMARY)
  useEffect(() => {
    async function fetchAdminStats() {
      try {
        const response = await api.get("/dashboard/admin-summary");
        // O backend retorna: { labels: [...], data: [...] }
        setChartData(response.data);
      } catch (error) {
        console.error("Erro ao carregar estatísticas do admin:", error);
      } finally {
        setLoadingChart(false);
      }
    }
    fetchAdminStats();
  }, []);

  // 2. FUNÇÃO PARA GERAR O PIX
  const handleGeneratePix = async (e) => {
    e.preventDefault();
    setLoadingPix(true);
    setGeneratedPix(null);

    try {
      // Converte valor para number
      const payload = {
        ...pixForm,
        value: parseFloat(pixForm.value),
      };

      const response = await api.post("/payment/pix", payload);
      setGeneratedPix(response.data); // { payload, base64 }
    } catch (error) {
      console.error("Erro ao gerar PIX:", error);
      alert("Erro ao gerar o QR Code. Verifique os dados.");
    } finally {
      setLoadingPix(false);
    }
  };

  // CONFIGURAÇÃO DO CHART.JS
  const chartConfig = {
    labels: chartData.labels.length > 0 ? chartData.labels : ["Sem dados"],
    datasets: [
      {
        label: "Doações",
        data: chartData.data.length > 0 ? chartData.data : [1], // Mock visual se vazio
        backgroundColor: ["#6ee7b7", "#60a5fa", "#fca5a5", "#fcd34d"],
        borderColor: "transparent",
        borderWidth: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: { color: "#e8eef8", padding: 16 },
      },
      tooltip: {
        backgroundColor: "#111722",
        titleColor: "#e8eef8",
        bodyColor: "#e8eef8",
      },
    },
  };

  // ESTILOS INLINE (Para manter consistência com o tema Dark sem criar novo CSS agora)
  const inputStyle = {
    background: "#0f1623",
    border: "1px solid #2b3a58",
    color: "#e8eef8",
    padding: "10px",
    borderRadius: "8px",
    width: "100%",
    marginBottom: "10px",
    outline: "none",
  };

  return (
    <main className="home-wrapper">
      <section className="admin-section">
        <h2 className="admin-title">Painel Administrativo</h2>
        <p className="admin-subtitle">
          Visão geral das doações e ferramentas de arrecadação.
        </p>

        <div className="admin-content">
          
          {/* CARD 1: GRÁFICO DE DOAÇÕES */}
          <div className="admin-chart-card">
            <h3>Doações por Categoria</h3>
            <div className="admin-chart-box">
              {loadingChart ? (
                <p style={{ color: "#a8b3c7", marginTop: "40%" }}>Carregando dados...</p>
              ) : (
                <Doughnut data={chartConfig} options={chartOptions} />
              )}
            </div>
          </div>

          {/* CARD 2: GERADOR DE PIX */}
          <div className="admin-qr-card" style={{ textAlign: "left" }}>
            <h3 style={{ textAlign: "center" }}>Gerador de Pix</h3>
            <p className="admin-text" style={{ textAlign: "center", fontSize: "0.9rem" }}>
              Crie um QR Code rápido para projetar ou enviar via Zap.
            </p>

            <form onSubmit={handleGeneratePix} style={{ marginTop: "20px" }}>
              <div>
                <label style={{ fontSize: "12px", color: "#a8b3c7" }}>Chave Pix (CPF/Email/Tel)</label>
                <input
                  type="text"
                  style={inputStyle}
                  placeholder="Ex: pix@igreja.com"
                  required
                  value={pixForm.key}
                  onChange={(e) => setPixForm({ ...pixForm, key: e.target.value })}
                />
              </div>

              <div>
                <label style={{ fontSize: "12px", color: "#a8b3c7" }}>Valor (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  style={inputStyle}
                  placeholder="0.00"
                  required
                  value={pixForm.value}
                  onChange={(e) => setPixForm({ ...pixForm, value: e.target.value })}
                />
              </div>

              <div>
                <label style={{ fontSize: "12px", color: "#a8b3c7" }}>Descrição (Opcional)</label>
                <input
                  type="text"
                  style={inputStyle}
                  placeholder="Ex: Campanha Cobertores"
                  value={pixForm.description}
                  onChange={(e) => setPixForm({ ...pixForm, description: e.target.value })}
                />
              </div>

              <button
                type="submit"
                className="button"
                style={{ width: "100%", marginTop: "10px", opacity: loadingPix ? 0.7 : 1 }}
                disabled={loadingPix}
              >
                {loadingPix ? "Gerando..." : "Gerar QR Code"}
              </button>
            </form>

            {/* RESULTADO DO PIX GERADO */}
            {generatedPix && (
              <div style={{ marginTop: "24px", background: "#0b0f14", padding: "16px", borderRadius: "8px", textAlign: "center" }}>
                <p style={{ color: "#6ee7b7", marginBottom: "10px", fontWeight: "bold" }}>QR Code Gerado!</p>
                <img 
                  src={generatedPix.base64} 
                  alt="QR Code Pix" 
                  style={{ width: "100%", maxWidth: "150px", borderRadius: "8px", border: "4px solid #fff" }} 
                />
                
                <div style={{ marginTop: "12px" }}>
                  <label style={{ fontSize: "12px", color: "#a8b3c7", display: "block", marginBottom: "4px" }}>Copia e Cola:</label>
                  <textarea
                    readOnly
                    rows={3}
                    style={{ ...inputStyle, fontSize: "10px", resize: "none" }}
                    value={generatedPix.payload}
                    onClick={(e) => e.target.select()} // Seleciona tudo ao clicar
                  />
                </div>
              </div>
            )}
          </div>
          
        </div>
      </section>
    </main>
  );
};

export default AdminDashboard;