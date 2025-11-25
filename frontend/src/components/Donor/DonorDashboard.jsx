import React, { useState, useEffect, useContext } from "react";
import api from "../../services/api";
import { DataContext } from "../../context/DataContext";

const DonorDashboard = () => {
  // Estados do formulário
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedNeed, setSelectedNeed] = useState(""); // ID da necessidade (opcional)
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // Consumimos as 'needs' do contexto para preencher o select de campanhas
  const { needs, refreshPublicData } = useContext(DataContext);

  // 1. Buscar Categorias ao carregar a tela
  useEffect(() => {
    api.get("/donation-categories")
      .then((response) => {
        setCategories(response.data);
        // Seleciona a primeira categoria por padrão se houver
        if (response.data.length > 0) {
          setSelectedCategory(response.data[0].id);
        }
      })
      .catch((error) => console.error("Erro ao buscar categorias:", error));
  }, []);

  // 2. Enviar a Doação Real
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        description,
        categoryId: parseInt(selectedCategory), // Garante que é número
        // Só envia needId se o usuário tiver selecionado alguma (string vazia = null)
        needId: selectedNeed ? parseInt(selectedNeed) : undefined, 
      };

      await api.post("/donations", payload);

      alert("Doação registrada com sucesso! Muito obrigado.");
      
      // Limpar formulário
      setDescription("");
      setSelectedNeed("");
      if (categories.length > 0) setSelectedCategory(categories[0].id);

      // Atualiza os dados globais (para o gráfico da home atualizar se o admin aprovasse na hora, etc)
      refreshPublicData();

    } catch (error) {
      console.error("Erro ao doar:", error);
      alert("Houve um erro ao registrar sua doação. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Estilos inline para inputs no tema Dark (complementando o CSS global)
  const inputStyle = {
    background: "#0f1623",
    border: "1px solid #2b3a58",
    color: "#e8eef8",
    padding: "12px",
    borderRadius: "8px",
    width: "100%",
    marginTop: "8px",
    outline: "none"
  };

  const labelStyle = {
    color: "#a8b3c7",
    fontSize: "14px",
    fontWeight: "bold"
  };

  return (
    // Usamos 'home-wrapper' para o fundo escuro global
    <div className="home-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '40px' }}>
      
      {/* Usamos 'home-card' para o container do formulário */}
      <div className="home-card" style={{ maxWidth: "500px", width: "100%", padding: "32px" }}>
        
        <h2 style={{ marginTop: 0, fontSize: "24px", color: "#e8eef8" }}>Fazer uma Doação</h2>
        <p style={{ color: "#a8b3c7", marginBottom: "24px" }}>
          Preencha os dados abaixo para registrar sua intenção de doação.
        </p>

        <form onSubmit={handleSubmit}>
          {/* SELEÇÃO DE CATEGORIA */}
          <div className="form-group" style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>O que você vai doar?</label>
            <select
              style={inputStyle}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* SELEÇÃO DE CAMPANHA (Opcional) */}
          <div className="form-group" style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>É para uma campanha específica? (Opcional)</label>
            <select
              style={inputStyle}
              value={selectedNeed}
              onChange={(e) => setSelectedNeed(e.target.value)}
            >
              <option value="">-- Não, é uma doação geral --</option>
              {needs.map((need) => (
                <option key={need.id} value={need.id}>
                  {need.title}
                </option>
              ))}
            </select>
          </div>

          {/* DESCRIÇÃO */}
          <div className="form-group" style={{ marginBottom: "24px" }}>
            <label style={labelStyle}>Descrição (Qtd e detalhes):</label>
            <input
              type="text"
              style={inputStyle}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex: 2 cestas básicas, 5 casacos..."
              required
            />
          </div>

          <button 
            type="submit" 
            className="button" 
            style={{ width: "100%", padding: "14px", fontSize: "16px", opacity: loading ? 0.7 : 1 }}
            disabled={loading}
          >
            {loading ? "Enviando..." : "Confirmar Doação"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DonorDashboard;