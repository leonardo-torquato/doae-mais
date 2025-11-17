import React, { useMemo } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { mockNeeds, mockDonationsData } from "../../constants";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const StatCard = ({ label, value, sub }) => (
  <div className="home-card">
    <div className="home-card-value">{value}</div>
    <div className="home-card-label">{label}</div>
    {sub && <div className="home-card-sub">{sub}</div>}
  </div>
);

const ProgressBar = ({ current, total }) => {
  const pct = Math.max(0, Math.min(100, Math.round((current / total) * 100)));
  return (
    <div className="home-progress">
      <div className="home-progress-bar">
        <div className="home-progress-fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="home-progress-text">{pct}%</div>
    </div>
  );
};

export default function Homepage() {
  // KPIs mockados (poderão vir do backend depois)
  const familiasMes = 74;
  const quilosAcumulado = 1280;
  const metaCestas = { current: 124, total: 200 };

  // Charts
  const doughnutData = useMemo(() => {
    return {
      labels: mockDonationsData.labels,
      datasets: [
        {
          data: mockDonationsData.data,
          backgroundColor: ["#6ee7b7", "#93c5fd", "#fca5a5", "#fcd34d"],
          borderWidth: 0,
        },
      ],
    };
  }, []);

  const needsBarData = useMemo(() => {
    const labels = mockNeeds.map((n) => n.title);
    const current = mockNeeds.map((n) => n.raised);
    const total = mockNeeds.map((n) => n.goal);
    return {
      labels,
      datasets: [
        {
          label: "Arrecadado",
          data: current,
          backgroundColor: "#93c5fd",
          borderWidth: 0,
        },
        {
          label: "Meta",
          data: total,
          backgroundColor: "#1f2937",
          borderWidth: 0,
        },
      ],
    };
  }, []);

  const doughnutOptions = {
    plugins: { legend: { position: "bottom", labels: { boxWidth: 12 } } },
    maintainAspectRatio: false,
  };

  const barOptions = {
    plugins: { legend: { position: "bottom" } },
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { stacked: true, ticks: { maxRotation: 0, minRotation: 0 } },
      y: { stacked: false, beginAtZero: true },
    },
  };

  return (
    <main className="home-wrapper">
      {/* HERO */}
      <section className="home-hero">
        <div className="home-hero-left">
          <h1 className="home-hero-title">
            Doe alimento. Alimente uma família.
          </h1>
          <p className="home-hero-sub">
            Projeto social da <strong>Igreja Esperança</strong>. Transparência e
            impacto real na comunidade.
          </p>
          <div className="home-hero-cta">
            <a className="button" href="/donor">
              Fazer doação agora
            </a>
            <a className="button button--ghost" href="#como-doar">
              Como doar
            </a>
          </div>
        </div>
        <div className="home-hero-right">
          <QRCodeCanvas
            value="https://sua-url-de-doacao"
            size={140}
            bgColor="#ffffff"
            fgColor="#000000"
            includeMargin={true}
          />

          <span className="home-qr-caption">
            Aponte a câmera para doar por Pix
          </span>
        </div>
      </section>

      {/* STATS */}
      <section className="home-stats">
        <StatCard
          label="Famílias atendidas (mês)"
          value={familiasMes}
          sub="+12 esta semana"
        />
        <StatCard
          label="Quilos arrecadados (2025)"
          value={`${quilosAcumulado} kg`}
        />
        <div className="home-card">
          <div className="home-card-value">
            {metaCestas.current}/{metaCestas.total}
          </div>
          <div className="home-card-label">Meta de cestas do mês</div>
          <ProgressBar current={metaCestas.current} total={metaCestas.total} />
        </div>
      </section>

      {/* GRÁFICOS */}
      <section className="home-charts">
        <div className="home-chart">
          <h3 className="home-section-title">Tipos de doação</h3>
          <div className="home-chart-box">
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </div>
        <div className="home-chart">
          <h3 className="home-section-title">Metas x Arrecadado</h3>
          <div className="home-chart-box">
            <Bar data={needsBarData} options={barOptions} />
          </div>
        </div>
      </section>

      {/* CAMPANHAS ATIVAS */}
      <section className="home-campaigns">
        <h3 className="home-section-title">Campanhas ativas</h3>
        <div className="home-campaign-grid">
          {mockNeeds.map((n) => (
            <article key={n.id} className="home-campaign-card">
              <div className="home-campaign-head">
                <h4>{n.title}</h4>
                <span className="home-chip">ATIVA</span>
              </div>
              <p className="home-campaign-desc">{n.description}</p>
              <div className="home-campaign-progress">
                <span>
                  {n.raised}/{n.goal}
                </span>
                <ProgressBar current={n.raised} total={n.goal} />
              </div>
              <div className="home-campaign-actions">
                <a className="button" href="/donor">
                  Doar
                </a>
                <a className="button button--ghost" href="/needs">
                  Ver detalhes
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* COMO DOAR */}
      <section id="como-doar" className="home-howto">
        <h3 className="home-section-title">Como doar</h3>
        <div className="home-howto-grid">
          <div className="home-howto-card">
            <h4>Pix</h4>
            <p>
              Use o QR do topo ou a chave: <strong>pix@igreja.org</strong>
            </p>
            <a className="button" href="/donor">
              Doar por Pix
            </a>
          </div>
          <div className="home-howto-card">
            <h4>Entrega presencial</h4>
            <p>Seg–Sáb, 9h–18h. Rua das Flores, 123.</p>
            <a
              className="button button--ghost"
              target="_blank"
              rel="noreferrer"
              href="https://maps.google.com?q=Rua das Flores, 123"
            >
              Ver no mapa
            </a>
          </div>
          <div className="home-howto-card">
            <h4>Agendar retirada</h4>
            <p>Podemos retirar sua doação em domicílio.</p>
            <a className="button button--ghost" href="/donor">
              Agendar retirada
            </a>
          </div>
        </div>
      </section>

      {/* SOBRE / TRANSPARÊNCIA CURTA */}
      <section className="home-about">
        <div className="home-about-card">
          <img
            src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=900&q=80"
            alt="Projeto social na comunidade"
          />
          <div>
            <h3 className="home-section-title">Sobre a Igreja</h3>
            <p>
              A Igreja Esperança atua há 15 anos com projetos de assistência
              social, focada em alimentação e dignidade. Toda doação é
              registrada e publicada mensalmente.
            </p>
            <div className="home-about-actions">
              <a className="button button--ghost" href="/admin">
                Prestação de contas
              </a>
              <a className="button" href="/donor">
                Quero doar
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer" style={{ position: "static", marginTop: 24 }}>
        Igreja Esperança • CNPJ 00.000.000/0000-00 • Rua das Flores, 123
      </footer>
    </main>
  );
}
