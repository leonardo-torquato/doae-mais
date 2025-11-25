### 📅 Fase 1: Infraestrutura e Leitura de Dados Públicos
*O foco inicial é fazer o Front-end "ler" o Back-end, substituindo os dados estáticos da Homepage e da lista de Necessidades.*

**1. Configuração do Cliente HTTP (Axios)**
* [X] Instalar a biblioteca `axios`.
* [X] Criar arquivo `src/services/api.js`.
    * Definir `baseURL` apontando para `http://localhost:3000/api`.
    * Configurar timeout padrão (ex: 10s).
    * (Preparação) Deixar o espaço para o `interceptor` que injetará o token JWT (será ativado na Fase 3).

**2. Migração do DataContext (O Coração dos Dados)**
* [X] Editar `src/context/DataContext.jsx`:
    * Importar a instância do `api.js`.
    * Remover as importações de `mockNeeds` e `mockDonationsData`.
    * Criar estado `needs` (inicia vazio `[]`).
    * Criar estado `publicStats` (inicia `{ totalDonations: 0, totalRaised: 0 }`).
    * Criar função assíncrona `refreshPublicData()`:
        * `GET /needs` -> Atualiza estado `needs`.
        * `GET /dashboard/public-summary` -> Atualiza estado `publicStats`.
    * Adicionar `useEffect` para chamar `refreshPublicData()` ao montar o componente.
    * Exportar `needs`, `publicStats` e `refreshPublicData` no Provider.

**3. Conexão da Homepage**
* [X] Editar `src/components/Homepage/Homepage.jsx`:
    * Consumir `publicStats` do contexto em vez das variáveis estáticas (`familiasMes`, `quilosAcumulado`).
    * Substituir o array `mockNeeds` pelo array `needs` do contexto para renderizar os cards de "Campanhas ativas".
    * Atualizar o gráfico de barras para usar os dados reais de `needs` (Meta vs Arrecadado).

**4. Conexão da Página de Necessidades**
* [X] Editar `src/pages/Needs.jsx` (e/ou `NeedsList.jsx`):
    * Substituir `mockNeeds` pelos dados reais do Contexto.
    * Garantir que o gráfico de barras reflita os dados reais.

---

### 🎨 Fase 2: Área do Doador (Funcionalidade e Visual Dark)
*O foco é permitir que doações reais sejam feitas e que a tela deixe de ser um formulário branco simples para seguir o tema "Dark Modern" da Home.*

**1. Busca de Categorias Dinâmicas**
* [X] No componente `DonorDashboard.jsx`:
    * Criar estado `categories` (inicia vazio).
    * Usar `useEffect` para fazer `GET /donation-categories` ao carregar a tela.
    * Substituir o `<select>` estático (que usava `tiposDoacao`) para renderizar as categorias vindas do banco.

**2. Envio de Doação Real**
* [X] Atualizar função `handleSubmit` em `DonorDashboard.jsx`:
    * Montar o payload JSON: `{ description, categoryId: number, needId?: number }`.
    * Chamar `api.post('/donations', payload)`.
    * Tratar sucesso: Limpar formulário e exibir alerta de sucesso.
    * Tratar erro: Exibir alerta de falha.

**3. Redesign Visual (Dark UI)**
* [X] Editar CSS do formulário em `DonorDashboard.jsx` para usar as variáveis da Home:
    * Container principal: usar classe `home-wrapper` (fundo escuro).
    * Cartão do formulário: usar estilo similar a `home-card` (fundo #111722, borda #223048).
    * Inputs e Selects:
        * Background: `#0f1623`.
        * Borda: `#2b3a58`.
        * Texto: `#e8eef8`.
    * Botão: Manter o verde padrão, mas com hover mais suave.

---

### 🔐 Fase 3: Autenticação e Segurança
*Implementar a barreira de login para que apenas a Igreja acesse o painel administrativo.*

**1. Tela de Login**
* [X] Criar nova página `src/pages/Login.jsx`:
    * Layout centralizado (Card no meio da tela).
    * Campos: Email e Senha.
    * Botão "Entrar".

**2. Lógica de Autenticação**
* [X] No `Login.jsx` (ou em um novo `AuthContext`):
    * Função `handleLogin`:
        * `POST /auth/login` com email e senha.
        * Receber `{ access_token }`.
        * Salvar token no `localStorage`.
        * Redirecionar para `/admin`.

**3. Proteção de Rotas e Requisições**
* [X] Atualizar `src/services/api.js`:
    * Ativar o `interceptor` para ler o token do localStorage e anexar no header `Authorization: Bearer ...` de todas as requisições.
* [X] Criar componente `src/components/Auth/ProtectedRoute.jsx`:
    * Verificar se o token existe.
    * Se sim -> Renderiza os filhos (`<AdminArea />`).
    * Se não -> Redireciona para `/login`.
* [X] Atualizar `App.jsx`:
    * Envolver a rota `/admin` com o `ProtectedRoute`.

---

### 📊 Fase 4: Área Administrativa (Dashboard e Gestão)
*Transformar a tela de admin em um centro de comando real.*

**1. Dashboard Administrativo Real**
* [ ] Editar `AdminDashboard.jsx`:
    * Criar estado `adminStats` (para os dados do gráfico).
    * `useEffect` -> `GET /dashboard/admin-summary`.
    * Atualizar o gráfico `Doughnut` com os dados retornados (Doações por Categoria).

**2. Funcionalidade PIX (Gerador)**
* [ ] Adicionar novo card em `AdminDashboard.jsx` (ou sub-componente):
    * Formulário: Valor, Chave PIX (padrão da igreja ou editável), Descrição.
    * Botão "Gerar QR Code".
    * Ação: `POST /payment/pix`.
    * Exibição: Mostrar a imagem Base64 retornada e o código "Copia e Cola" em um campo de texto fácil de copiar.

**3. Gestão de Doações (Nova Tabela)**
* [ ] Criar componente `DonationsTable.jsx` (na AdminArea):
    * `GET /donations` para listar todas.
    * Exibir tabela com colunas: Data, Descrição, Categoria, Status Atual.
    * Ação: Botão/Dropdown para alterar status (`PENDING` -> `COLLECTED`).
    * Ao alterar: `PATCH /donations/:id/status`.

**4. Gestão de Necessidades (CRUD)**
* [ ] Criar componente `NeedsManager.jsx` (na AdminArea):
    * Formulário para criar nova necessidade (`POST /needs`).
    * Lista de necessidades existentes com botão "Excluir" (`DELETE /needs/:id`).

---

### ✨ Fase 5: Refinamento
* [ ] **Feedback Visual:** Adicionar loadings (spinners) enquanto as requisições (axios) estão em andamento.
* [ ] **Notificações:** (Opcional) Substituir `alert()` por uma biblioteca de "Toast" (notificações bonitas no canto da tela) para sucessos e erros.
* [ ] **Responsividade:** Testar as novas tabelas e formulários no modo mobile do navegador.