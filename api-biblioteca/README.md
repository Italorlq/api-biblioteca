# API Biblioteca 📚

API REST para gerenciamento de livros, desenvolvida com Node.js, Express e PostgreSQL.

## Tecnologias

- Node.js + Express
- PostgreSQL
- Docker / Docker Compose

## Como executar com Docker

### Pré-requisito
Ter o [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado.

### Passos

1. Clone o repositório:
```bash
git clone https://github.com/SEU_USUARIO/api-biblioteca.git
cd api-biblioteca
```

2. Suba os containers:
```bash
docker compose up -d
```

3. Acesse a API em: `http://localhost:3000`

## Rotas disponíveis

| Método | Rota         | Descrição              |
|--------|--------------|------------------------|
| GET    | /            | Status da API          |
| GET    | /livros      | Lista todos os livros  |
| GET    | /livros/:id  | Busca livro por ID     |
| POST   | /livros      | Cadastra novo livro    |
| PUT    | /livros/:id  | Atualiza um livro      |
| DELETE | /livros/:id  | Remove um livro        |

## Exemplos de uso

### Cadastrar livro (POST /livros)
```json
{
  "titulo": "Dom Casmurro",
  "autor": "Machado de Assis",
  "ano": 1899
}
```

### Atualizar livro (PUT /livros/1)
```json
{
  "titulo": "Dom Casmurro",
  "autor": "Machado de Assis",
  "ano": 1900
}
```

## Parar a aplicação

```bash
docker compose down
```
