const express = require('express');
const pool = require('./database');
const livrosRouter = require('./livros');
require('dotenv').config();

const app = express();
app.use(express.json());

// Rota de status (para testar se a API está no ar)
app.get('/', (req, res) => {
  res.json({ mensagem: 'API Biblioteca funcionando!' });
});

// Rotas de livros
app.use('/livros', livrosRouter);

// Cria a tabela se não existir e inicia o servidor
async function iniciar() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS livros (
        id SERIAL PRIMARY KEY,
        titulo VARCHAR(200) NOT NULL,
        autor VARCHAR(100) NOT NULL,
        ano INTEGER NOT NULL
      )
    `);
    console.log('Tabela "livros" pronta.');

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (erro) {
    console.error('Erro ao iniciar:', erro.message);
    setTimeout(iniciar, 3000); // tenta novamente em 3s (aguarda o banco subir)
  }
}

iniciar();
