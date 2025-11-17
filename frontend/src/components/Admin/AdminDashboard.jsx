import React, { useContext } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { DataContext } from "../../context/DataContext";

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminDashboard = () => {
  const { donationsData } = useContext(DataContext);

  const chartData = {
    labels: donationsData.labels,
    datasets: [
      {
        label: "Doações Recebidas",
        data: donationsData.data,
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

  return (
    <main className="home-wrapper">
      <section className="admin-section">
        <h2 className="admin-title">Painel da Igreja</h2>
        <p className="admin-subtitle">
          Visualize todas as doações recebidas e compartilhe o sistema com seus
          fiéis.
        </p>

        <div className="admin-content">
          {/* Gráfico */}
          <div className="admin-chart-card">
            <h3>Impacto das Doações</h3>
            <div className="admin-chart-box">
              <Doughnut data={chartData} options={chartOptions} />
            </div>
          </div>

          {/* QR Code */}
          <div className="admin-qr-card">
            <h3>Divulgue o Sistema!</h3>
            <p className="admin-text">
              Escaneie o QR Code abaixo para acessar o sistema de doações.
            </p>
            <div className="admin-qr-wrapper">
              <QRCodeSVG
                value="https://google.com"
                size={160}
                bgColor="#0b0f14"
                fgColor="#ffffff"
                includeMargin={true}
              />
            </div>
            <div className="admin-bar"></div>
            <p className="admin-link">
              (Atualmente linka para “https://seusite.com”)
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AdminDashboard;
