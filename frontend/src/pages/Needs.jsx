import React, { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { mockNeeds } from "../constants";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Needs() {
  const chartData = useMemo(() => {
    const labels = mockNeeds.map((n) => n.title);
    const values = mockNeeds.map((n) => n.goal - n.raised);
    return {
      labels,
      datasets: [
        {
          label: "Quantidade necessária (unidades)",
          data: values,
          backgroundColor: "#6ee7b7",
          borderRadius: 8,
          barThickness: 60,
        },
      ],
    };
  }, []);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom", labels: { color: "#e8eef8" } },
      title: {
        display: true,
        text: "Maiores Necessidades de Doações",
        color: "#e8eef8",
        font: { size: 18, weight: "bold" },
      },
    },
    scales: {
      x: {
        ticks: { color: "#a8b3c7", font: { size: 13 } },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
      y: {
        beginAtZero: true,
        ticks: { color: "#a8b3c7", stepSize: 20 },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
    },
  };

  return (
    <main className="home-wrapper">
      <section className="needs-section">
        <h2 className="home-section-title">Necessidades Atuais</h2>
        <div className="needs-chart-container">
          <Bar data={chartData} options={options} />
        </div>
      </section>
    </main>
  );
}
