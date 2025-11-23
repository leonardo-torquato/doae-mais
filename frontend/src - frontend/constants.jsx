// Dados que virão do backend, mas que mockamos aqui por enquanto.

export const tiposDoacao = [
  { id: "alimentos", nome: "Alimentos" },
  { id: "roupas", nome: "Roupas" },
  { id: "calcados", nome: "Calçados" },
  { id: "dinheiro", nome: "Dinheiro" },
  { id: "utensilios", nome: "Utensílios" },
  { id: "outros", nome: "Outros" },
];

export const mockNeeds = [
    { id: 1, title: "Cestas Básicas de Abril", description: "Precisamos de 50 cestas básicas para famílias cadastradas.", goal: 50, raised: 12 },
    { id: 2, title: "Cobertores para o Inverno", description: "Arrecadação de cobertores novos ou usados em bom estado.", goal: 200, raised: 50 },
    { id: 3, title: "Material Escolar", description: "Kits de material escolar para o projeto de reforço.", goal: 150, raised: 150 },
];

// Dados mockados para o gráfico que você já tinha.
export const mockDonationsData = {
  labels: ['Alimentos', 'Roupas', 'Dinheiro', 'Utensílios'],
  data: [120, 50, 30, 15],
};