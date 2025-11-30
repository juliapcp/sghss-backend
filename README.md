# SGHSS - Backend

Este repositório contém a implementação backend do projeto SGHSS (Sistema de Gestão Hospitalar e de Serviços de Saúde) com ênfase em Back-end.

Visão geral
- Node.js + Express (TypeScript)
- Sequelize (SQLite)
- Autenticação JWT, hashing de senhas (bcryptjs)
- Validações com Zod
- Testes com Jest + Supertest

Endpoints principais
- POST /api/auth/register - registra novo usuário (retorna token)
- POST /api/auth/login - autentica e retorna token
- GET /api/auth/me - retorna usuário autenticado
- CRUD /api/pacientes - protegido por token (update/delete exigem perfis 'profissional' ou 'admin')

Como rodar localmente
1. Instalar dependências:
```bash
npm install
```

2. Rodar em modo dev:
```bash
npm run dev
```

3. Rodar testes:
```bash
npm test
```

Documentação da API
- A API possui especificação OpenAPI em `docs/openapi.yaml` e interface Swagger em `/api/docs` quando a aplicação estiver rodando.

Arquivos úteis para entrega acadêmica
- Diagramas UML/DER: `docs/plantuml/*.puml` (renderize com PlantUML para incluir em PDF)
- OpenAPI: `docs/openapi.yaml` (inclua um trecho ou link no PDF)
- Testes automatizados: `tests/*.test.ts`

Sugestões para o PDF final (obrigatório na entrega):
1. Capa e sumário
2. Introdução e escopo (explique que o foco foi Back-end)
3. Requisitos (liste os funcionais e não-funcionais contemplados)
4. Modelagem e DER (incluir imagem gerada a partir de `docs/plantuml/der.puml`)
5. Implementação (principais arquivos, endpoints, fluxos de autenticação)
6. Plano de testes (descrever casos de teste e anexar resultados/Jest)
7. Conclusão e próximos passos (monitoramento, backups, LGPD)

Link do repositório: inclua o link público do seu GitHub aqui.

---
> Observação: para a entrega, gere um único PDF contendo o conteúdo acima e os anexos (diagramas, prints de testes). Use ferramentas como PlantUML para gerar imagens dos arquivos `*.puml`.
# 🏥 SGHSS – Backend  
API REST desenvolvida em **Node.js + TypeScript + Express**, utilizando **SQLite** como banco de dados.  
Este backend atende ao Sistema de Gestão Hospitalar e Serviços de Saúde (SGHSS).

---

## 🚀 Tecnologias Utilizadas

- Node.js  
- TypeScript  
- Express  
- SQLite  
- dotenv  
- helmet  
- cors  
- morgan  
- ts-node  
- nodemon  

---

## 📂 Estrutura do Projeto

```
/webapi/
  /src/
    /controllers/
    /models/
    /repositories/
    /routers/
    app.ts
    server.ts
  /config/
    database.ts
  .env
  package.json
  tsconfig.json
```

---

## ⚙️ Pré-requisitos

Antes de rodar o projeto, instale:

- **Node.js** versão 16+
- **npm**
- (Opcional) **SQLite3** para visualizar o banco via terminal

---

## 📦 Instalação

### 1️⃣ Clonar o repositório
```sh
git clone https://github.com/juliapcp/sghss-backend.git
cd sghss-backend
```

### 2️⃣ Instalar dependências
```sh
npm install
```

---

## 🔧 Configuração do Ambiente

Crie na raiz do projeto um arquivo `.env` contendo:

```
PORT=3000
```

---

## 🗄️ Banco de Dados

O banco SQLite será criado automaticamente na primeira execução.

Local:
```
src/config/database.sqlite
```

Para acessar via terminal:

```sh
sqlite3 src/config/database.sqlite
```

Comandos úteis:

```sql
.tables;
SELECT * FROM pacientes;
```

---

## ▶️ Executando o Projeto

### Ambiente de desenvolvimento (hot reload):
```sh
npm run dev
```

### Compilar o TypeScript:
```sh
npm run compile
```

### Rodar versão compilada:
```sh
npm start
```

---

## 🌐 Endpoints Principais

### **Pacientes**
```
POST   /pacientes
GET    /pacientes
GET    /pacientes/:id
PUT    /pacientes/:id
DELETE /pacientes/:id
```

---

## 🧪 Exemplo de JSON para criação de paciente

```json
{
  "nome": "João da Silva",
  "cpf": "12345678901",
  "data_nascimento": "1990-05-20",
  "email": "joao@email.com",
  "telefone": "11999990000",
  "endereco": "Rua das Flores, 123"
}
```

---

## 🛠️ Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Executa com nodemon (hot reload) |
| `npm run compile` | Compila TypeScript para JavaScript na pasta dist |
| `npm start` | Inicia o servidor compilado |

---

## 🔒 Segurança

Este projeto utiliza:

- `helmet` para cabeçalhos HTTP seguros  
- `cors` para controle de acesso  
- `morgan` para logs de requisições  

---

## 📄 Licença

Projeto sob licença **ISC**.  
Criado por **Julia Pontes Cardoso Pereira - RU 4574183**