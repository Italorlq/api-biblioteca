const express = require('express');
const router = express.Router();
const pool = require('./database');

// GET /livros — lista todos os livros
router.get('/', async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM livros ORDER BY id ASC');
    res.json(resultado.rows);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar livros' });
  }
});

// GET /livros/:id — busca um livro pelo ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await pool.query('SELECT * FROM livros WHERE id = $1', [id]);
    if (resultado.rows.length === 0) {
      return res.status(404).json({ erro: 'Livro não encontrado' });
    }
    res.json(resultado.rows[0]);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao buscar livro' });
  }
});

// POST /livros — cadastra um novo livro
router.post('/', async (req, res) => {
  try {
    const { titulo, autor, ano } = req.body;
    if (!titulo || !autor || !ano) {
      return res.status(400).json({ erro: 'Campos titulo, autor e ano são obrigatórios' });
    }
    const resultado = await pool.query(
      'INSERT INTO livros (titulo, autor, ano) VALUES ($1, $2, $3) RETURNING *',
      [titulo, autor, ano]
    );
    res.status(201).json(resultado.rows[0]);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao cadastrar livro' });
  }
});

// PUT /livros/:id — atualiza um livro
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, autor, ano } = req.body;
    const resultado = await pool.query(
      'UPDATE livros SET titulo = $1, autor = $2, ano = $3 WHERE id = $4 RETURNING *',
      [titulo, autor, ano, id]
    );
    if (resultado.rows.length === 0) {
      return res.status(404).json({ erro: 'Livro não encontrado' });
    }
    res.json(resultado.rows[0]);
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao atualizar livro' });
  }
});

// DELETE /livros/:id — remove um livro
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await pool.query('DELETE FROM livros WHERE id = $1 RETURNING *', [id]);
    if (resultado.rows.length === 0) {
      return res.status(404).json({ erro: 'Livro não encontrado' });
    }
    res.json({ mensagem: 'Livro removido com sucesso' });
  } catch (erro) {
    res.status(500).json({ erro: 'Erro ao remover livro' });
  }
});

module.exports = router;
