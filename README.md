# 🧠 Task Manager API

API para gerenciamento de tarefas com autenticação de usuários utilizando JWT.

---

## 📌 Descrição

Esta API permite que usuários se registrem, façam login e gerenciem suas próprias tarefas de forma segura. Cada usuário possui suas próprias tarefas protegidas por autenticação.

---

## 🚀 Tecnologias utilizadas

* Node.js
* Express
* PostgreSQL
* JWT (JSON Web Token)
* Bcrypt
* CORS
* Dotenv

---

## ⚙️ Como rodar o projeto

### 🔧 1. Clonar o repositório

```bash
git clone https://github.com/n-uderson/BACKAND-TASKMANAGER.git
cd task-manager-back
```

### 📦 2. Instalar dependências

```bash
npm install
```

### 🔐 3. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3001
DATABASE_URL=sua_url_do_render
JWT_SECRET=sua_chave_secreta
```

### ▶️ 4. Rodar o servidor

```bash
npm start
```

Servidor rodando em:
http://localhost:3001

---

## 🌐 Deploy

API disponível em:
https://backand-taskmanager.onrender.com

---

## 🔐 Autenticação

A API utiliza JWT para proteger rotas.

Após o login, você receberá um token:

```json
{
  "token": "seu_token_jwt"
}
```

Para acessar rotas protegidas:
Authorization: Bearer SEU_TOKEN

---

## 📡 Rotas da API

### 👤 Registrar usuário

POST /register

```json
{
  "name": "Natan",
  "email": "natan@email.com",
  "password": "123456"
}
```

### 🔑 Login

POST /login

```json
{
  "email": "natan@email.com",
  "password": "123456"
}
```

### 📋 Listar tarefas

GET /tasks
🔒 Requer autenticação

### ➕ Criar tarefa

POST /tasks
🔒 Requer autenticação

```json
{
  "title": "Estudar Node",
  "date": "2026-05-01"
}
```

### ✏️ Atualizar tarefa

PUT /tasks/:id
🔒 Requer autenticação

### ❌ Deletar tarefa

DELETE /tasks/:id
🔒 Requer autenticação

---

## 🗄️ Banco de dados

Banco: PostgreSQL

### users

* id
* name
* email
* password

### tasks

* id
* title
* date
* completed
* user_id

---

## ⚠️ Possíveis erros

| Erro             | Causa               |
| ---------------- | ------------------- |
| ECONNREFUSED     | Banco não conectado |
| 401 Unauthorized | Token inválido      |
| 400 Bad Request  | Dados inválidos     |
| 500 Server Error | Erro interno        |

---

## 👨‍💻 Autor

Desenvolvido por Natan Uderson 🚀
