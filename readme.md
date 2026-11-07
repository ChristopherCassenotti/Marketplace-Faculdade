# Marketplace-Faculdade

> Projeto acadêmico de marketplace desenvolvido no curso de Engenharia de Software, com aplicação web em React, API REST em Node.js e banco de dados PostgreSQL. O ambiente de desenvolvimento é executado com Docker Compose.

## Sobre o projeto

O **Marketplace-Faculdade** tem como objetivo desenvolver e integrar as funcionalidades de um marketplace, permitindo que usuários se cadastrem, façam login e interajam com anúncios. O projeto também explora gerenciamento de categorias, tags, favoritos, empresas, caronas e relatórios.

A aplicação é dividida em três serviços: **frontend** (React + Vite), **backend** (Node.js + Express) e **banco de dados** (PostgreSQL). O Sequelize é utilizado para modelagem e migrações do banco. O Docker Compose orquestra os serviços para simplificar o desenvolvimento em equipe.

> **Estado do projeto:** aplicação acadêmica em desenvolvimento. A presença de rotas e telas não significa que todos os fluxos foram homologados para uso em produção.

## Integrantes

- João Vitor dos Santos
- Christopher Cassenoti

## Tecnologias utilizadas

| Camada | Tecnologias |
| --- | --- |
| Frontend | React, Vite, React Router, Axios, Tailwind CSS |
| Backend | Node.js, Express, JavaScript (ES Modules) |
| Banco de dados | PostgreSQL 16, Sequelize, Sequelize CLI |
| Autenticação | JWT e bcrypt |
| Documentação da API | Swagger UI e swagger-jsdoc |
| Ambiente de desenvolvimento | Docker e Docker Compose |

## Funcionalidades e módulos presentes no código

- **Autenticação:** cadastro, login e consulta dos dados do usuário autenticado.
- **Usuários:** endpoints de listagem, consulta, criação, atualização e exclusão, protegidos por autenticação.
- **Anúncios:** rotas da API e páginas de listagem e criação no frontend.
- **Categorias e tags:** módulos para classificação dos anúncios.
- **Favoritos:** módulo de favoritos e contexto correspondente no frontend.
- **Empresas e caronas:** rotas próprias na API.
- **Relatórios:** resumo de anúncios por categoria, com consulta baseada em view do PostgreSQL.
- **Documentação interativa:** Swagger UI disponibilizado pelo backend.

O frontend inclui páginas de **login**, **registro**, **anúncios**, **criação de anúncio** e **resumo por categorias**. Algumas dessas páginas utilizam rotas protegidas por autenticação.

> O envio e armazenamento persistente de **imagens dos anúncios** ainda não estão documentados aqui como funcionalidade concluída; dependem da implementação e validação do fluxo de upload.

## Estrutura do projeto

```text
Marketplace-Faculdade/
├── backend/
│   ├── src/
│   │   ├── config/         # Banco de dados, Sequelize e Swagger
│   │   ├── controllers/    # Regras e operações dos endpoints
│   │   ├── middlewares/    # Autenticação e demais middlewares
│   │   ├── migrations/     # Evolução da estrutura do banco
│   │   ├── models/         # Modelos do Sequelize
│   │   ├── routes/         # Rotas da API REST
│   │   ├── seeders/        # Dados de exemplo (quando disponíveis)
│   │   ├── utils/          # Funções utilitárias
│   │   └── server.js       # Inicialização da API
│   ├── .env.example        # Referência para configuração local
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/            # Integração com a API
│   │   ├── components/     # Componentes reutilizáveis
│   │   ├── context/        # Estado compartilhado, como autenticação
│   │   ├── pages/          # Páginas da aplicação
│   │   └── App.jsx         # Rotas do frontend
│   ├── Dockerfile
│   ├── vite.config.js
│   └── package.json
├── docker-compose.yml
└── readme.md
```

## Pré-requisitos

- Git;
- Docker Desktop (Windows/macOS) ou Docker Engine com Docker Compose (Linux);
- Portas locais **3000**, **5173** e **5433** disponíveis.

**Não é necessário instalar Node.js ou PostgreSQL no computador para executar o projeto com Docker.**

## Instalação e execução com Docker

### 1. Clonar o repositório

```bash
git clone https://github.com/ChristopherCassenotti/Marketplace-Faculdade.git
cd Marketplace-Faculdade
```

### 2. Configurar as variáveis de ambiente

Crie o arquivo `backend/.env` a partir do modelo:

```powershell
Copy-Item backend/.env.example backend/.env
```

No Linux ou macOS, o equivalente é `cp backend/.env.example backend/.env`.

**Atenção:** o `.env.example` publicado atualmente contém apenas as variáveis `DB_*` e `JWT_SECRET`. Para o `docker-compose.yml`, inclua também as variáveis `POSTGRES_*` no arquivo **local** `backend/.env`.

Exemplo de estrutura para desenvolvimento local (substitua as credenciais e a chave por valores privados):

```dotenv
# Conexão utilizada pelo backend dentro da rede do Docker
DB_HOST=db
DB_PORT=5432
DB_NAME=marketplace
DB_USER=marketplace
DB_PASS=defina_uma_senha_local

# Inicialização do PostgreSQL
POSTGRES_DB=marketplace
POSTGRES_USER=marketplace
POSTGRES_PASSWORD=defina_uma_senha_local

# Autenticação
JWT_SECRET=substitua_por_uma_chave_longa_aleatoria_e_privada
```

O valor de `DB_PASS` deve corresponder a `POSTGRES_PASSWORD`, e `DB_NAME`/`DB_USER` devem corresponder a `POSTGRES_DB`/`POSTGRES_USER`.

**Não publique o arquivo `.env` nem credenciais reais no GitHub.** Mantenha apenas valores de exemplo no `.env.example`.

### 3. Iniciar os serviços

Com o Docker Desktop em execução, rode na raiz do projeto:

```bash
docker compose up -d --build
```

O Compose inicia o banco e, após ele ficar saudável, inicia a API. O comando do backend **já executa as migrations automaticamente** antes de iniciar o servidor:

```bash
npx sequelize-cli db:migrate && npm run dev
```

Portanto, **não é necessário executar as migrations manualmente a cada inicialização**.

### 4. Verificar os containers

```bash
docker compose ps
```

Os serviços esperados são `marketplace_db`, `marketplace_app` e `marketplace_frontend`.

### 5. Acessar o projeto

| Serviço | Endereço no computador |
| --- | --- |
| Frontend | http://localhost:5173 |
| Backend | http://localhost:3000 |
| Swagger UI | http://localhost:3000/api-docs |
| PostgreSQL | `localhost:5433` (porta exposta para ferramentas externas) |

Dentro da rede do Docker, a API se conecta ao PostgreSQL por **`db:5432`**. O frontend utiliza um proxy Vite para encaminhar requisições iniciadas por `/api` ao serviço `app:3000`.

## Comandos úteis

| Comando | Finalidade |
| --- | --- |
| `docker compose up -d` | Iniciar os serviços em segundo plano |
| `docker compose up -d --build` | Reconstruir imagens quando necessário e iniciar |
| `docker compose ps` | Verificar o estado dos containers |
| `docker compose logs -f app` | Acompanhar logs do backend |
| `docker compose logs -f db` | Acompanhar logs do PostgreSQL |
| `docker compose logs -f frontend` | Acompanhar logs do frontend |
| `docker compose down` | Parar e remover containers sem apagar o volume nomeado do banco |
| `docker compose exec app npx sequelize-cli db:migrate` | Executar migrations manualmente, se necessário |
| `docker compose exec app npx sequelize-cli db:seed:all` | Executar seeders, caso estejam preparados para o ambiente |

> **Cuidado:** `docker compose down -v` remove também os volumes gerenciados pelo Compose, incluindo o volume de dados do PostgreSQL. Evite esse comando caso queira preservar seu banco.

## API e autenticação

A API utiliza **JSON** para as rotas convencionais. O cadastro e o login públicos ficam sob `/auth`, e as demais rotas podem exigir um token JWT.

### Rotas principais

| Grupo | Prefixo | Descrição |
| --- | --- | --- |
| Autenticação | `/auth` | Cadastro, login e usuário autenticado |
| Usuários | `/usuarios` | Gerenciamento de usuários |
| Anúncios | `/anuncios` | Operações com anúncios |
| Categorias | `/categorias` | Classificação dos anúncios |
| Tags | `/tags` | Organização por tags |
| Favoritos | `/favoritos` | Favoritos de usuários |
| Empresas | `/empresas` | Operações relacionadas a empresas |
| Caronas | `/caronas` | Operações relacionadas a caronas |
| Relatórios | `/relatorios` | Consultas e resumos por categoria |

Para ver os **métodos, parâmetros e respostas** documentados, consulte a interface Swagger em http://localhost:3000/api-docs.

### Exemplo: cadastrar um usuário

`POST http://localhost:3000/auth/cadastro`

```json
{
  "nome": "Usuario Teste",
  "email": "teste@example.com",
  "cpf": "12345678909",
  "telefone": "42999999999",
  "senha": "UmaSenhaForteDeTeste123!"
}
```

O endpoint de cadastro gera o hash da senha com **bcrypt**; não envie `senha_hash` ao endpoint `/auth/cadastro`. Para autenticar, utilize `POST /auth/login`, enviando `email` e `senha`.

As rotas protegidas esperam autenticação JWT no cabeçalho `Authorization: Bearer <token>`.

## Banco de dados e persistência

O PostgreSQL utiliza o volume nomeado `db_data`, montado em `/var/lib/postgresql/data`. Isso permite preservar os dados ao recriar os containers, desde que o volume não seja removido.

As migrations do Sequelize definem a evolução do esquema do banco. O projeto também inclui diretórios para **seeders** e **models**.

**Importante para bancos já existentes:** alterar `POSTGRES_USER`, `POSTGRES_PASSWORD` ou `POSTGRES_DB` no `.env` **não recria usuários, senhas ou bancos** em um volume PostgreSQL que já foi inicializado. Nesses casos, é preciso ajustar o banco existente com cuidado.

## Desenvolvimento

O Compose monta as pastas `backend/` e `frontend/` nos containers, permitindo refletir alterações locais durante o desenvolvimento. O backend utiliza `node --watch`, e o frontend executa o servidor de desenvolvimento do Vite.

Para executar serviços fora do Docker, consulte os scripts de cada `package.json` e ajuste a conexão com o banco conforme o ambiente. Por exemplo, `DB_HOST=localhost` só faz sentido para uma API executada no próprio computador, e a porta acessível para o PostgreSQL publicado pelo Compose é `5433`.

## Solução de problemas

**A API não inicia:**

```bash
docker compose logs --tail=100 app
```

Confira `backend/.env` e a instalação das dependências do backend. Não apague volumes de dados para tentar corrigir erros de aplicação.

**O banco não está saudável:**

```bash
docker compose logs --tail=100 db
```

Verifique as credenciais e se o volume já contém um banco inicializado anteriormente.

**As portas estão ocupadas:** verifique se os serviços que usam `3000`, `5173` e `5433` já estão abertos no computador.

## Próximas melhorias

Possíveis etapas de evolução do projeto:

- Implementar e validar o upload de múltiplas imagens dos anúncios e sua persistência;
- Ampliar testes automatizados e validações dos fluxos do sistema;
- Revisar segurança, tratamento de erros e controles de acesso para publicação;
- Preparar backups e configuração de armazenamento para um eventual ambiente de produção.

## Licença e finalidade

Projeto desenvolvido para fins acadêmicos no curso de Engenharia de Software. Consulte os integrantes antes de reutilizar ou redistribuir partes do trabalho; o repositório não apresenta aqui um arquivo de licença separado.
