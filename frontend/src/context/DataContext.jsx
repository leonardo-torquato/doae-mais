import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api'; // Importamos o serviço que acabamos de criar

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  // Estados para armazenar dados vindos do Backend
  const [needs, setNeeds] = useState([]);
  const [publicStats, setPublicStats] = useState({ totalDonations: 0, totalRaised: 0 });
  const [donationsData, setDonationsData] = useState({ labels: [], data: [] }); // Para o gráfico admin

  // Função para buscar dados públicos (Home e Needs)
  const refreshPublicData = async () => {
    try {
      // Busca as necessidades (NeedsController)
      const needsResponse = await api.get('/needs');
      setNeeds(needsResponse.data);

      // Busca resumo do dashboard (DashboardController)
      const statsResponse = await api.get('/dashboard/public-summary');
      setPublicStats(statsResponse.data);

    } catch (error) {
      console.error("Erro ao buscar dados públicos:", error);
    }
  };

  // Carrega os dados assim que o App abre
  useEffect(() => {
    refreshPublicData();
  }, []);

  // Função placeholder para adicionar doação (será implementada na Fase 2)
  const addDonation = async (donation) => {
     console.log('Fase 2: Implementar POST /donations', donation);
     //TODO: Aqui faremos api.post(...) futuramente
  };

  return (
    <DataContext.Provider value={{
      needs,
      publicStats,
      donationsData, // Usado no AdminDashboard (ainda mockado por enquanto ou vazio)
      addDonation,
      refreshPublicData
    }}>
      {children}
    </DataContext.Provider>
  );
};