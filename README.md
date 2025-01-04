# The Best YouTube Video of All Time

Este projeto é uma aplicação web full-stack para gerenciar e votar nos melhores vídeos do YouTube de todos os tempos. Inclui uma API backend construída com **NestJS** e um frontend construído com **React**.

---

## Configuração do Projeto

### Pré-requisitos

- **Node.js**
- **npm**
- **PostgreSQL**

### Variáveis de Ambiente

Crie um arquivo `.env` no diretório raiz e adicione as seguintes variáveis de ambiente:

```env
DB_HOST=your_database_host 
DB_PORT=your_database_port 
DB_USERNAME=your_database_username 
DB_PASSWORD=your_database_password 
DB_NAME=your_database_name 

SECRET_KEY=your_jwt_secret_key 
JWT_EXPIRE=your_jwt_expiration_time
```

---

## Executando a aplicação

### Desenvolvimento
```bash
npm run start
```

### Modo Watch
```bash
npm run start:dev
```

### Produção
```bash
npm run start:prod
```

---

## Documentação da API

A documentação da API está disponível em `/api` quando o servidor está em execução. Ela é gerada usando **Swagger**.

---

## Endpoints da API

### Autenticação

#### Login

- **URL**: `/auth/login`
- **Método**: `POST`
- **Corpo**:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

- **Resposta**:

```json
{
  "access_token": "your_jwt_token",
  "isAdmin": true
}
```

#### Criar Admin

- **URL**: `/auth/admin`
- **Método**: `POST`
- **Corpo**:

```json
{
  "name": "Admin",
  "email": "admin@example.com",
  "password": "admin123",
  "role": "admin"
}
```

- **Resposta**:

```json
{
  "type": "success",
  "message": "Admin has been created successfully",
  "data": {
    "id": 1,
    "name": "Admin",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

---

### Usuários

#### Criar Usuário

- **URL**: `/users`
- **Método**: `POST`
- **Corpo**:

```json
{
  "name": "User",
  "email": "user@example.com",
  "password": "password123",
  "role": "user"
}
```

- **Resposta**:

```json
{
  "type": "success",
  "message": "User has been created successfully",
  "data": {
    "id": 1,
    "name": "User",
    "email": "user@example.com",
    "role": "user"
  }
}
```

#### Obter Todos os Usuários

- **URL**: `/users`
- **Método**: `GET`

- **Resposta**:

```json
{
  "type": "success",
  "message": "Users has been found successfully",
  "data": [
    {
      "id": 1,
      "name": "User",
      "email": "user@example.com",
      "role": "user"
    }
  ]
}
```

#### Deletar Usuário

- **URL**: `/users/:id`
- **Método**: `DELETE`

- **Resposta**:

```json
{
  "type": "success",
  "message": "User has been deleted successfully"
}
```

---

### Vídeos

#### Criar Vídeo

- **URL**: `/video`
- **Método**: `POST`
- **Corpo**:

```json
{
  "title": "My Video Title",
  "rating": 5,
  "url": "https://www.youtube.com/watch?v=123"
}
```

- **Resposta**:

```json
{
  "type": "success",
  "message": "Video has been created successfully",
  "data": {
    "id": 1,
    "title": "My Video Title",
    "rating": 5,
    "url": "https://www.youtube.com/watch?v=123"
  }
}
```

#### Obter Vídeos Classificados

- **URL**: `/video`
- **Método**: `GET`

- **Resposta**:

```json
{
  "type": "success",
  "message": "Ranked videos retrieved successfully",
  "data": [
    {
      "id": 1,
      "title": "My Video Title",
      "rating": 5,
      "url": "https://www.youtube.com/watch?v=123"
    }
  ]
}
```

#### Obter Dois Vídeos para Votação

- **URL**: `/video/vote`
- **Método**: `GET`

- **Resposta**:

```json
{
  "type": "success",
  "message": "Two videos for voting retrieved successfully",
  "data": [
    {
      "id": 1,
      "title": "My Video Title",
      "rating": 5,
      "url": "https://www.youtube.com/watch?v=123"
    },
    {
      "id": 2,
      "title": "Another Video Title",
      "rating": 3,
      "url": "https://www.youtube.com/watch?v=456"
    }
  ]
}
```

#### Deletar Vídeo

- **URL**: `/video/:id`
- **Método**: `DELETE`

- **Resposta**:

```json
{
  "type": "success",
  "message": "Video has been deleted successfully"
}
```

---

### Votos

#### Registrar Voto

- **URL**: `/vote`
- **Método**: `POST`
- **Corpo**:

```json
{
  "videoId": 1,
  "vote": 1
}
```

- **Resposta**:

```json
{
  "type": "success",
  "message": "Vote registered successfully"
}
