import React, { createContext, useState, useEffect } from 'react';
import { mockNeeds, mockDonationsData } from '../constants';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [needs, setNeeds] = useState([]);
  const [donationsData, setDonationsData] = useState({ labels: [], data: [] });

  useEffect(() => {
    // No futuro, isso será: fetch('/api/needs').then(...)
    setNeeds(mockNeeds);
    
    // No futuro, isso será: fetch('/api/donations/summary').then(...)
    setDonationsData(mockDonationsData);
  }, []);

  // 4. Função para adicionar doação (pronta para o backend)
  const addDonation = (donation) => {
    // donation será o objeto: { tipo, descricao, needId }
    console.log('Enviando para API:', donation);
    
    // No futuro, aqui teremos a lógica de POST:
    // fetch('/api/donations', { method: 'POST', body: JSON.stringify(donation) })
    //   .then(...)
    
    // Por enquanto, apenas exibimos o alerta e (no futuro) o modal.
  };

  return (
    <DataContext.Provider value={{
      needs,
      donationsData,
      addDonation
    }}>
      {children}
    </DataContext.Provider>
  );
};