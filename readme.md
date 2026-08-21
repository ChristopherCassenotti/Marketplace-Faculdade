# Marketplace-Faculdade

## Sistema e integrantes

**Nome do sistema:** Marketplace-Faculdade

**Integrantes:**

- João Vitor dos Santos
- Christopher Cassenoti

---

## Sobre o projeto

O **Marketplace-Faculdade** é um sistema desenvolvido como projeto acadêmico para a disciplina de desenvolvimento de software.

A aplicação tem como objetivo implementar um **marketplace**, permitindo o gerenciamento de produtos e demais informações relacionadas ao sistema.

O projeto utiliza uma arquitetura baseada em **backend Node.js**, com **Express**, **Sequelize** como ORM e **PostgreSQL** como banco de dados.

A aplicação também utiliza **Docker e Docker Compose** para facilitar a configuração e execução do ambiente de desenvolvimento, evitando a necessidade de instalar e configurar manualmente as dependências do projeto.

### Tecnologias utilizadas

- Node.js
- Express
- Sequelize
- PostgreSQL
- Docker
- Docker Compose

---

## Funcionalidades implementadas

- CRUD de Usuários (consulta, inserção, alteração e exclusão via Sequelize)

## Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/) e Docker Compose instalados

Não é necessário instalar Node.js ou PostgreSQL na máquina — tudo roda dentro dos containers.

## Como rodar o projeto

1. Clone o repositório:

```bash
   git clone <link-do-repositorio>
   cd Marketplace-Faculdade
```

2. Copie o arquivo de variáveis de ambiente de exemplo e preencha:

```bash
   cp backend/.env.example backend/.env
```

3. Suba os containers:

```bash
   docker compose up --build
```

4. Em outro terminal, rode as migrations pra criar as tabelas:

```bash
   docker compose exec app npx sequelize-cli db:migrate
```

5. (Opcional) Popule o banco com dados de teste:

```bash
   docker compose exec app npx sequelize-cli db:seed:all
```

A API estará disponível em `http://localhost:3000`.

## Endpoints da API

### Usuários

| Método | Rota          | Descrição                     |
| ------ | ------------- | ----------------------------- |
| GET    | /usuarios     | Lista todos os usuários       |
| GET    | /usuarios/:id | Busca um usuário pelo ID      |
| POST   | /usuarios     | Cria um novo usuário          |
| PUT    | /usuarios/:id | Atualiza um usuário existente |
| DELETE | /usuarios/:id | Remove um usuário             |

**Exemplo de corpo para POST/PUT:**

```json
{
  "nome": "João Santos",
  "email": "joao@teste.com",
  "cpf": "11111111111",
  "telefone": "42999990000",
  "senha_hash": "senha_fake_para_teste"
}
```

## Estrutura do projeto

backend/
├── src/
│ ├── config/ # Configuração de conexão com o banco (Sequelize)
│ ├── models/ # Models do Sequelize
│ ├── controllers/ # Lógica de negócio das rotas
│ ├── routes/ # Definição das rotas da API
│ ├── migrations/ # Migrations do Sequelize
│ ├── seeders/ # Dados de teste (seeds)
│ └── server.js # Ponto de entrada da aplicação
├── Dockerfile
└── .env.example
docker-compose.yml

## Observações sobre o banco de dados

Os dados armazenados no banco (via volume Docker) são locais a cada máquina onde o projeto é executado. A estrutura das tabelas é garantida igual para todos através das migrations; para popular o banco com dados de exemplo, utilize os seeders.
