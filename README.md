# SGHSS - Backend 

Implementação do back-end do SGHSS (Sistema de Gestão Hospitalar e de Serviços de Saúde) com ênfase em Back-end. Este README explica como rodar o projeto, executar um ciclo de autenticação, endpoints disponíveis, tecnologias utilizadas.

Sumário
- Visão geral
- Requisitos
- Configuração (variáveis de ambiente)
- Como rodar (dev / produção / docker)
- Ciclo de autenticação (exemplos curl)
- Endpoints disponíveis
- Testes
- Documentação (Swagger / OpenAPI)
- Tecnologias usadas
- Boas práticas de segurança e LGPD
- Como gerar artefatos para o PDF de entrega

## Visão geral

O projeto fornece:
- Autenticação JWT (registro, login, rota `/me`).
- Hashing de senhas (bcryptjs) e não exposição da senha nas respostas.
- CRUD de pacientes protegido por autenticação; operações sensíveis (update/delete) protegidas por autorização por `perfil` (roles: `paciente`, `profissional`, `admin`).
- Validações de entrada com Zod.
- Testes automatizados com Jest + Supertest.
- Especificação OpenAPI (arquivo `docs/openapi.yaml`) e Swagger UI em `/api/docs`.

## Requisitos

- Node.js >= 16 recomendado
- npm
- (opcional) Docker para executar em container

## Configuração (variáveis de ambiente)

Crie um arquivo `.env` na raiz com pelo menos as variáveis:

- `PORT` — porta onde a API irá rodar (default: 3000)
- `JWT_SECRET` — segredo para assinar os tokens JWT

Exemplo `.env`:

```env
PORT=3000
JWT_SECRET=uma_chave_super_secreta
```

## Como rodar

1) Instalar dependências:

```bash
npm install
```

2) Rodar em modo desenvolvimento (recarrega com alterações):

```bash
npm run dev
```

3) Build e rodar em produção (compila para `dist`):

```bash
npm run compile
npm start
```

## Ciclo de autenticação — exemplo (curl)

1) Registrar um usuário (signup):

```bash
curl -s -X POST http://localhost:3000/api/auth/register \
  -H 'Content-Type: application/json' \
  -d '{"nome":"Julia","email":"julia@example.com","senha":"senha123","perfil":"paciente"}' | jq
```

Resposta esperada (exemplo):

```json
{
  "id": 1,
  "nome": "Julia",
  "email": "julia@example.com",
  "token": "<JWT_TOKEN_AQUI>"
}
```

2) Login (obter token):

```bash
curl -s -X POST http://localhost:3000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"julia@example.com","senha":"senha123"}' | jq
```

Resposta contém `token` (JWT). Guarde-o para chamadas autenticadas.

3) Usar token para acessar `/api/auth/me` (obter dados do usuário):

```bash
curl -s http://localhost:3000/api/auth/me -H "Authorization: Bearer <TOKEN>" | jq
```

4) Exemplo de chamada autenticada para listar pacientes:

```bash
curl -s http://localhost:3000/api/pacientes -H "Authorization: Bearer <TOKEN>" | jq
```

## Endpoints principais

Autenticação
- POST /api/auth/register — Registrar usuário (body: nome, email, senha, perfil)
- POST /api/auth/login — Autenticar (body: email, senha)
- GET /api/auth/me — Retornar usuário autenticado (Bearer token)

Pacientes (todos protegidos por JWT)
- POST /api/pacientes — Criar paciente (qualquer usuário autenticado)
- GET /api/pacientes — Listar pacientes
- GET /api/pacientes/:id — Obter paciente por id
- PUT /api/pacientes/:id — Atualizar paciente (apenas `profissional` ou `admin`)
- DELETE /api/pacientes/:id — Excluir paciente (apenas `profissional` ou `admin`)

## Testes

Executar a suíte de testes automatizados:

```bash
npm test
```

Os testes usam Jest + Supertest e cobrem fluxo de autenticação e regras de autorização (ex.: paciente não pode deletar paciente criado, profissional pode).

## Documentação (Swagger / OpenAPI)

Especificação OpenAPI: `docs/openapi.yaml`.

Ao executar a API localmente, a interface Swagger fica disponível em:

```
http://localhost:3000/api/docs
```

Use essa interface para visualizar endpoints e testar chamadas diretamente no navegador.

## Tecnologias usadas

- Node.js + Express (TypeScript)
- Sequelize ORM com SQLite (para desenvolvimento / testes)
- bcryptjs (hashing de senha)
- jsonwebtoken (JWT)
- zod (validação de entrada)
- jest + supertest (testes)
- swagger-ui-express + js-yaml (documentação Swagger)