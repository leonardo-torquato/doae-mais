import React, { useEffect, useState } from "react";
import api from "../../services/api";

const NeedsManager = () => {
  const [needs, setNeeds] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", goal: "" });
  const [loading, setLoading] = useState(false);

  // Busca necessidades
  useEffect(() => {
    loadNeeds();
  }, []);

  const loadNeeds = async () => {
    const res = await api.get("/needs");
    setNeeds(res.data);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // POST /needs
      await api.post("/needs", {
        ...form,
        goal: parseFloat(form.goal), // Converte para número
      });
      alert("Campanha criada com sucesso!");
      setForm({ title: "", description: "", goal: "" }); // Limpa form
      loadNeeds(); // Recarrega lista
    } catch (error) {
      console.error(error);
      alert("Erro ao criar campanha.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir esta campanha?")) return;
    try {
      await api.delete(`/needs/${id}`);
      setNeeds(needs.filter((n) => n.id !== id));
    } catch (error) {
      console.error(error);
      alert("Erro ao excluir.");
    }
  };

  // Estilos
  const inputStyle = {
    background: "#0f1623", border: "1px solid #2b3a58", color: "#e8eef8",
    padding: "10px", borderRadius: "8px", width: "100%", marginBottom: "10px"
  };

  return (
    <div>
      {/* FORMULÁRIO DE CRIAÇÃO */}
      <div className="home-card" style={{ marginBottom: "24px" }}>
        <h3 style={{ marginTop: 0 }}>Nova Campanha</h3>
        <form onSubmit={handleCreate}>
          <div style={{ display: "grid", gap: "10px", gridTemplateColumns: "1fr 1fr" }}>
            <input
              type="text" placeholder="Título (Ex: Cestas Básicas)"
              style={inputStyle} required
              value={form.title} onChange={(e) => setForm({...form, title: e.target.value})}
            />
            <input
              type="number" placeholder="Meta (Quantidade ou Valor)"
              style={inputStyle} required min="1"
              value={form.goal} onChange={(e) => setForm({...form, goal: e.target.value})}
            />
          </div>
          <input
            type="text" placeholder="Descrição curta..."
            style={inputStyle} required
            value={form.description} onChange={(e) => setForm({...form, description: e.target.value})}
          />
          <button className="button" disabled={loading}>
            {loading ? "Criando..." : "Criar Campanha"}
          </button>
        </form>
      </div>

      {/* LISTA DE CAMPANHAS EXISTENTES */}
      <h3 style={{ color: "#e8eef8" }}>Campanhas Ativas</h3>
      <div style={{ display: "grid", gap: "16px", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
        {needs.map((need) => (
          <div key={need.id} className="home-card" style={{ position: "relative" }}>
            <h4 style={{ margin: "0 0 8px 0" }}>{need.title}</h4>
            <p style={{ color: "#a8b3c7", fontSize: "14px" }}>{need.description}</p>
            <div style={{ marginTop: "12px", fontSize: "14px" }}>
              <strong>Meta:</strong> {need.goal} <br />
              <strong>Arrecadado:</strong> {need.raised}
            </div>
            <button
              onClick={() => handleDelete(need.id)}
              style={{
                position: "absolute", top: "16px", right: "16px",
                background: "transparent", border: "none", color: "#fca5a5", cursor: "pointer"
              }}
            >
              Excluir 🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NeedsManager;