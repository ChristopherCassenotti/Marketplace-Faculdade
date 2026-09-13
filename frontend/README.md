# UGV Marketplace — Frontend

Interface web do Marketplace-Faculdade: login, registro, cadastro de anúncios
e listagem de anúncios. React + Vite + Tailwind CSS v4, consumindo a API do
`backend/`.

## Rodando com Docker (recomendado)

Na raiz do repositório:

```bash
docker compose up --build
```

Isso sobe `db`, `app` (API em `http://localhost:3000`) e `frontend`
(`http://localhost:5173`) juntos, com hot-reload — alterações em `src/`
refletem direto no container.

## Rodando localmente (sem Docker)

Requer o backend já rodando em `http://localhost:3000` (via
`docker compose up db app` ou `npm run dev` dentro de `backend/`).

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`. As chamadas para `/api/*` são
redirecionadas pelo proxy do Vite ([vite.config.js](vite.config.js)) até o
backend.

## Estrutura

```
src/
├── api/          # client axios + funções de chamada à API
├── components/   # Navbar, FormField, Logo, AuthLayout, AnuncioCard...
├── context/      # AuthContext (login/registro/logout, token JWT)
├── pages/        # Login, Registro, CriarAnuncio, Anuncios
└── App.jsx       # rotas (react-router-dom)
```
