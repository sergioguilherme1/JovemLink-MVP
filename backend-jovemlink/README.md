# Backend JovemLink

API em Node.js + Express + MySQL (mysql2).

## Passos

1. Copie `.env.example` para `.env` e preencha as variáveis.
2. `npm install`
3. `npm run start`

Rotas:
- `POST /auth/register` { nome, email, senha, tipo }
- `POST /auth/login` { email, senha }
- `GET /vagas`
- `POST /vagas` (Bearer token) { id_empresa, titulo, descricao, requisitos }
