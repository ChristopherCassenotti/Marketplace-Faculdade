# Marketplace-Faculdade

## 1. Sistema e integrantes

**Nome do sistema:** Marketplace-Faculdade

**Integrantes:**

- João Vitor dos Santos
- Christopher Cassenoti

---

## 2. Sobre o projeto

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

## 3. Como executar o projeto

### Pré-requisitos

É necessário ter instalado:

- Docker
- Docker Compose

Não é necessário instalar o Node.js ou PostgreSQL diretamente na máquina, pois essas dependências são executadas através dos containers Docker.

### 3.1 Clonar o repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd Marketplace-Faculdade
```

### 3.2 Configurar as variáveis de ambiente

O arquivo `.env` **não é versionado no Git**, pois pode conter informações sensíveis e configurações específicas do ambiente.

Utilize o arquivo `.env.example` como modelo:

```bash
cp .env.example .env
```

Depois, abra o `.env` e preencha ou ajuste as variáveis necessárias para a execução do projeto.

Exemplo:

```env
DB_HOST=db
DB_PORT=5432
DB_NAME=marketplace
DB_USER=postgres
DB_PASSWORD=postgres
```

> Os valores utilizados no `.env` devem estar de acordo com as configurações definidas no `docker-compose.yml` e na configuração do Sequelize.

### 3.3 Executar com Docker Compose

Na raiz do projeto, execute:

```bash
docker compose up --build
```

O Docker irá:

1. Criar a imagem da aplicação;
2. Instalar as dependências do Node.js;
3. Criar o container da aplicação;
4. Criar o container do PostgreSQL;
5. Criar a rede entre os containers;
6. Criar o volume para persistência dos dados do banco.

Após a inicialização, os serviços estarão disponíveis conforme as portas configuradas no `docker-compose.yml`.

### 3.4 Parar os containers

Para parar a execução:

```bash
docker compose down
```

Para parar os containers e também remover os volumes do projeto:

```bash
docker compose down -v
```

> **Atenção:** utilizar `docker compose down -v` remove os volumes associados ao projeto e, consequentemente, os dados armazenados no banco PostgreSQL.

---

## Estrutura básica do projeto

```text
Marketplace-Faculdade/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── server.js
│   ├── Dockerfile
│   ├── package.json
│   └── package-lock.json
├── .env.example
├── .gitignore
├── docker-compose.yml
└── README.md
```

## Observações

O arquivo `.env` não deve ser enviado para o repositório. Cada integrante deve criar seu próprio arquivo `.env` localmente utilizando o `.env.example` como referência.

O projeto utiliza Docker Compose para padronizar o ambiente de execução e facilitar a configuração do backend e do banco de dados PostgreSQL.

---
