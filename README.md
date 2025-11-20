* **Back-end:** **Node.js com NestJS (TypeScript)**.
    * **Por quê?** Você já está usando React (que é comumente usado com TS). O NestJS é um framework "opinativo" e estruturado (baseado em Módulos, Controladores e Serviços), o que é excelente para documentação e manutenibilidade. Ele tem integração nativa com TypeORM, autenticação (via Passport.js) e validação de dados (class-validator), cobrindo seus requisitos de "segurança" e "robustez" de forma muito profissional.
* **Banco de Dados:** **PostgreSQL**.
    * **Por quê?** Seu sistema é inerentemente relacional (Usuários, Doações, Necessidades). O PostgreSQL é poderoso, confiável e o padrão-ouro da indústria para dados relacionais, sendo uma escolha muito mais forte para um projeto acadêmico do que um NoSQL.
* **ORM:** **TypeORM**.
    * **Por quê?** É o ORM padrão do NestJS e funciona perfeitamente com TypeScript, permitindo que você defina seus modelos de banco de dados usando Classes.
* **Containerização:** **Docker e Docker Compose**.
    * **Por quê?** Como você mencionou, é essencial. Isso garante que sua aplicação (Back-end, Front-end e Banco de Dados) rode de forma idêntica em qualquer máquina (a sua, a do professor) com um único comando.

Abaixo está a documentação completa e o guia de implementação.

---

### Documentação e Roadmap do Sistema de Doações

#### 1. Visão Geral do Sistema

O projeto é uma plataforma de gerenciamento de doações para uma entidade (Igreja Esperança), conectando doadores e necessidades. A aplicação se divide em três visões principais:

1.  **Visão Pública (Homepage, Needs):** Usuários não autenticados podem ver o impacto das doações e as necessidades atuais.
2.  **Visão do Doador (DonorDashboard):** Uma área pública onde qualquer pessoa pode registrar uma intenção de doação.
3.  **Visão do Administrador (AdminDashboard):** Uma área protegida onde a gestão da igreja pode gerenciar necessidades, visualizar doações e extrair relatórios.

#### 2. Estado Atual (Implementado - Front-end)

* **Fundação:** Aplicação React com `react-router-dom` para navegação.
* **Layout:** Estrutura visual consistente com `Navbar`, `Footer` e `CleanLayout`.
* **Gerenciamento de Estado:** O estado da aplicação (lista de necessidades, dados do gráfico) é centralizado no `DataContext`.
* **Páginas (Mockadas):**
    * `Homepage`: Exibe tipos de doação estáticos.
    * `Needs`: Lista necessidades vindas do contexto.
    * `DonorDashboard`: Um formulário que envia dados (tipo, descrição) para a função `addDonation` do contexto.
    * `AdminDashboard`: Exibe um gráfico de impacto (com dados do contexto) e um QR Code estático.

#### 3. O Gap (O que falta para ser Funcional)

1.  **Persistência:** Todos os dados (needs, donations) são mockados e perdidos ao recarregar a página.
2.  **API (Back-end):** Não existe um servidor para processar a lógica de negócios (registrar doação, criar necessidade).
3.  **Autenticação:** A rota `/admin` está aberta ao público.
4.  **Funcionalidades Avançadas:** Geração de PIX e gráficos públicos não existem.

---

### Guia de Implementação Full-Stack (O Que Fazer)

Este é o plano de ação, dividido em etapas lógicas, para construir sua aplicação completa.

#### Etapa 1: Estrutura do Back-end e Banco de Dados

O primeiro passo é definir como seus dados serão armazenados.

1.  **Setup (NestJS + TypeORM):**
    * Crie um novo projeto NestJS (`nest new backend`).
    * Configure o `AppModule` para se conectar ao PostgreSQL usando TypeORM.
2.  **Definição dos Modelos (Entities):**
    * `User.entity.ts`: Representa o administrador (email, password_hash).
    * `DonationCategory.entity.ts`: Representa os "Tipos de Doação" (substitui `tiposDoacao` de `constants.jsx`).
    * `Need.entity.ts`: Representa as "Necessidades" (title, description, goal_value, raised_value).
    * `Donation.entity.ts`: O registro de uma doação (description, amount, status - "pendente", "coletado") e suas relações (Ex: `belongsTo: DonationCategory`, `belongsTo: Need`).

#### Etapa 2: Containerização (Docker)

Faça isso agora para facilitar todo o desenvolvimento.

1.  **Crie um `docker-compose.yml`** na raiz do seu monorepo (pasta que contém `frontend` e `backend`).
2.  **Defina 3 Serviços:**
    * `db`: Usa a imagem oficial do `postgres`. Define volumes para persistir os dados do banco.
    * `backend`: Constrói a partir de um `Dockerfile` na pasta do NestJS. Expõe a porta da API (ex: 3000).
    * `frontend`: Constrói a partir de um `Dockerfile` na pasta do React (usando `nginx` para servir o build de produção). Expõe a porta 80 (ou 8080).
3.  **Resultado:** Com um `docker-compose up`, você terá todo o ambiente (DB, API, Front) rodando.

#### Etapa 3: Implementação da API (Endpoints)

No NestJS, você criará "Módulos" para cada funcionalidade.

1.  **`AuthModule` (Segurança):**
    * `POST /auth/login`: Endpoint para o admin fazer login. Recebe email/senha, valida e retorna um JWT (JSON Web Token).
    * `POST /auth/register`: (Opcional) Um endpoint protegido ou script para criar o primeiro admin.
    * **AuthGuard:** Crie um "Guard" global que protegerá todos os endpoints que precisam de autenticação.
2.  **`NeedsModule` (Público):**
    * `GET /needs`: Endpoint público que busca no DB e retorna todas as necessidades ativas.
    * `POST /needs`: (Protegido) Admin cria uma nova necessidade.
    * `PUT /needs/:id`: (Protegido) Admin atualiza uma necessidade.
    * `DELETE /needs/:id`: (Protegido) Admin remove uma necessidade.
3.  **`DonationsModule` (Público/Protegido):**
    * `GET /donations`: (Protegido) Admin visualiza todas as doações registradas.
    * `POST /donations`: Endpoint público que o `DonorDashboard` usará. Recebe `{ tipo, descricao, needId? }`, valida e salva no banco.
    * `GET /donation-categories`: (Público) Retorna os tipos de doação do DB.
4.  **`DashboardModule` (Público/Protegido):**
    * `GET /dashboard/admin-summary`: (Protegido) Retorna dados agregados para o gráfico do admin (Ex: total de doações por categoria).
    * `GET /dashboard/public-summary`: (Público) Retorna dados agregados para o novo gráfico da Homepage (Ex: total de cestas básicas arrecadadas).

#### Etapa 4: Adaptação do Front-end (React)

Agora, conectamos o React à API. O único arquivo que você *realmente* precisa mudar é o `src/context/DataContext.jsx`.

1.  **Configure o `axios`** (ou `fetch`) para se comunicar com sua API (ex: `http://localhost:3000/api`).
2.  **Modifique `src/context/DataContext.jsx`:**
    * No `useEffect`, substitua os `setNeeds(mockNeeds)` e `setDonationsData(mockDonationsData)` por chamadas `fetch` (ou `axios.get`) aos seus novos endpoints: `GET /needs` e `GET /dashboard/admin-summary`.
    * Na função `addDonation(donation)`, substitua o `console.log` por uma chamada `fetch` (ou `axios.post`) para `POST /donations`, enviando o objeto `donation` no *body* da requisição.
3.  **Implemente Autenticação:**
    * Crie um `AuthContext` separado para gerenciar o estado de login (token, usuário).
    * Crie uma página `/login` (que não usa o `CleanLayout`).
    * Crie um componente `ProtectedRoute` que verifica se existe um token no `AuthContext`.
    * No `App.jsx`, envolva a rota `<Route path="/admin" ... />` com o `ProtectedRoute`.

#### Etapa 5: Implementação das Novas Funcionalidades

1.  **Gráfico na Homepage (Novo):**
    * **Back-end:** Crie o endpoint `GET /dashboard/public-summary` (já planejado na Etapa 3).
    * **Front-end:** No componente `Homepage.jsx`, use `useEffect` e `useState` para buscar dados desse endpoint e passe-os para um novo componente de gráfico (você pode reutilizar o `Doughnut` do `AdminDashboard`).
2.  **Geração de PIX (Novo):**
    * **Back-end:**
        * Instale uma biblioteca de geração de PIX (ex: `qrcode-pix` no npm).
        * Crie um novo módulo `PaymentModule`.
        * Crie um endpoint `POST /payment/pix` (Protegido). Ele recebe `{ value, description }` e retorna a string (copia-e-cola) e o QR Code (em base64) do PIX.
    * **Front-end:**
        * No `AdminDashboard.jsx`, adicione um novo formulário ("Gerar PIX").
        * Ao submeter, chame o `POST /payment/pix`, armazene a resposta em um estado e exiba o QR Code e o código "copia-e-cola" para o admin.
3.  **Responsividade (Mobile-friendly):**
    * Você já tem uma base no `main.css` com `@media (max-width: 768px)`.
    * **Guia:** Continue usando Flexbox e CSS Grid. No `Homepage.css`, seu `.donation-types` já usa `flex-wrap`, o que é ótimo. Teste todas as páginas (especialmente os formulários) em uma janela de navegador estreita (DevTools) e ajuste o CSS (ex: `flex-direction: column`) onde for necessário.

---