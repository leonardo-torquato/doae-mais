import React, { useContext } from "react";
import { QRCodeSVG } from 'qrcode.react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { DataContext } from "../../context/DataContext"; // 2. Importar o Contexto

ChartJS.register(ArcElement, Tooltip, Legend);

const AdminDashboard = () => {

  const { donationsData } = useContext(DataContext);

  const chartData = {
    labels: donationsData.labels,
    datasets: [
      {
        label: 'Doações Recebidas',
        data: donationsData.data,
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="container">
      <h2>Painel da Igreja</h2>
      <p>
        Visualize todas as doações recebidas, filtre por tipo e atualize suas
        necessidades prioritárias.
      </p>

        <div className="card" style={{ maxWidth: '400px', margin: '20px auto' }}>
          <h3>Impacto das Doações</h3>
          <Doughnut data={chartData} /> 
        </div>

      <div className="card" style={{ textAlign: 'center' }}>
        <h3>Divulgue o Sistema!</h3>
        <p>Use este QR Code para levar os doadores ao site:</p>
        <QRCodeSVG value="https://google.com" /> {/* TODO:  Trocar pela URL real quando tiver */}
        <p style={{ fontSize: '0.8rem' }}> (Atualmente linka para 'https://seusite.com') </p>
      </div>

    </div>
  );
};

export default AdminDashboard;