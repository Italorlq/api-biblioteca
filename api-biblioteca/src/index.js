const express = require('express');
const pool = require('./database');
const livrosRouter = require('./livros');
require('dotenv').config();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensagem: 'API Biblioteca funcionando!' });
});

app.use('/livros', livrosRouter);

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

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (erro) {
    console.error('Erro ao iniciar:', erro.message);
    setTimeout(iniciar, 3000);
  }
}

iniciar();