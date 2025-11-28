# Sistema de Doações - Igreja Esperança

Uma plataforma Full Stack completa para gestão de doações, transparência financeira e engajamento de doadores para a Igreja Esperança. O sistema permite que doadores registrem intenções de doação, visualizem campanhas ativas e que a administração gerencie o fluxo de entrada e gere códigos PIX para arrecadação.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Configuração e Instalação](#configuração-e-instalação)
  - [Backend (API)](#1-backend-api)
  - [Frontend (Web)](#2-frontend-web)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Documentação da API](#documentação-da-api)
- [Estrutura do Projeto](#estrutura-do-projeto)

---

## 🔭 Visão Geral

O projeto foi desenhado para modernizar a arrecadação da igreja, oferecendo:
1.  **Transparência:** Gráficos públicos mostrando metas vs. arrecadado.
2.  **Facilidade:** Geração de PIX Copy & Paste e QR Code instantâneo.
3.  **Gestão:** Painel administrativo para controle de status das doações (Pendente/Coletado).

---

## 🚀 Funcionalidades

### 🌍 Público (Doador)
* **Homepage Dinâmica:** Exibição de estatísticas reais de doações e famílias atendidas.
* **Campanhas (Necessidades):** Visualização de campanhas ativas com barra de progresso (Meta x Arrecadado).
* **Registro de Doação:** Formulário para registrar doações de itens físicos ou dinheiro, vinculados ou não a campanhas específicas.

### 🔐 Administrativo (Privado)
* **Autenticação Segura:** Login via JWT (JSON Web Token).
* **Dashboard Gerencial:** Gráficos exclusivos (Chart.js) detalhando doações por categoria.
* **Gerador de PIX:** Ferramenta para criar QR Codes e payloads PIX com valor e descrição personalizados.
* **Gestão de Campanhas:** CRUD completo (Criar, Listar, Excluir) de necessidades/campanhas.
* **Controle de Doações:** Tabela para alterar status das doações recebidas (`PENDING` -> `COLLECTED`).

---

## 🛠 Tecnologias Utilizadas

### Backend
* **Framework:** NestJS (Node.js)
* **Linguagem:** TypeScript
* **Banco de Dados:** PostgreSQL (via TypeORM)
* **Autenticação:** Passport.js (Local & JWT Strategies)
* **Pagamentos:** Biblioteca `qrcode-pix` para geração de payloads estáticos.

### Frontend
* **Biblioteca:** React.js
* **Estilização:** CSS Modules com tema "Dark Modern UI".
* **Gráficos:** Chart.js e React-Chartjs-2.
* **Requisições:** Axios com Interceptors para injeção de Token.
* **Roteamento:** React Router Dom (com rotas protegidas).

---

## 📦 Pré-requisitos

* Node.js (v14 ou superior)
* PostgreSQL (Instalado localmente ou via Docker)
* Gerenciador de pacotes (NPM ou Yarn)

---

## ⚙️ Configuração e Instalação

### 1. Backend (API)

Navegue até a pasta do backend:

```bash
cd backend
npm install

Configure as variáveis de ambiente (crie um arquivo `.env` na raiz do backend):

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=sua_senha
DB_NAME=church_db
JWT_SECRET=seu_segredo_super_seguro
```

Inicie o servidor (o TypeORM criará as tabelas automaticamente devido ao `synchronize: true`):

```bash
npm run start:dev
```

*O servidor rodará em `http://localhost:3000`.*

### 2\. Frontend (Web)

Navegue até a pasta do frontend:

```bash
cd frontend
npm install
```

Inicie a aplicação React:

```bash
npm start
```

*A aplicação abrirá em `http://localhost:3001` (ou porta disponível).*

-----

## 📡 Documentação da API

Principais endpoints disponíveis no Backend:

### Autenticação

  * `POST /api/auth/login` - Realiza login e retorna Token JWT.

### Dashboard & Stats

  * `GET /api/dashboard/public-summary` - Estatísticas gerais para a Home (Público).
  * `GET /api/dashboard/admin-summary` - Dados para gráficos do Admin (Privado).

### Campanhas (Needs)

  * `GET /api/needs` - Lista todas as campanhas ativas.
  * `POST /api/needs` - Cria nova campanha (Admin).
  * `DELETE /api/needs/:id` - Remove uma campanha (Admin).

### Doações

  * `POST /api/donations` - Registra uma nova doação (Doador).
  * `GET /api/donations` - Lista histórico de doações (Admin).
  * `PATCH /api/donations/:id/status` - Atualiza status (Admin).

### Pagamentos

  * `POST /api/payment/pix` - Gera imagem Base64 e Payload de um Pix Copia e Cola.

-----

## 📂 Estrutura do Projeto

A estrutura foi organizada para manter separação de responsabilidades:

```
/
├── src - backend/          # API NestJS
│   ├── auth/               # Módulo de Autenticação (Guards, Strategies)
│   ├── dashboard/          # Agregação de dados para gráficos
│   ├── donation_categories/# Categorias (Alimentos, Roupas, etc.)
│   ├── donations/          # Core: Gestão de doações
│   ├── needs/              # Campanhas e Metas
│   ├── payment/            # Integração PIX
│   └── users/              # Gestão de usuários do sistema
│
└── src - frontend/         # Aplicação React
    ├── components/
    │   ├── Admin/          # Dashboards e Tabelas de Gestão
    │   ├── Auth/           # Rotas Protegidas
    │   ├── Donor/          # Área do Doador
    │   ├── Homepage/       # Landing Page
    │   └── UI/             # Layout, Navbar, Footer
    ├── context/            # AuthContext e DataContext
    ├── pages/              # Telas (AdminArea, Login, Home...)
    └── services/           # Configuração do Axios (api.js)
```

-----

## 🛡️ Segurança

  * As rotas administrativas (`/admin`, criação de campanhas, visualização de lista de doadores) são protegidas pelo `JwtAuthGuard` no Backend e pelo `ProtectedRoute` no Frontend.
  * Senhas de usuários são hasheadas utilizando `bcrypt` antes de serem salvas no banco.

-----

Desenvolvido para o projeto extensionista do semestre final de Ciência da Computação.