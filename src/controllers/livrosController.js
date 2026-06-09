const pool = require("../config/database");

const getAll = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM livros ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM livros WHERE id = $1", [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ erro: "Livro nao encontrado" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

const create = async (req, res) => {
  const { titulo, autor, ano } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO livros (titulo, autor, ano) VALUES ($1, $2, $3) RETURNING *",
      [titulo, autor, ano]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

const update = async (req, res) => {
  const { titulo, autor, ano } = req.body;
  try {
    const result = await pool.query(
      "UPDATE livros SET titulo=$1, autor=$2, ano=$3 WHERE id=$4 RETURNING *",
      [titulo, autor, ano, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ erro: "Livro nao encontrado" });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const result = await pool.query("DELETE FROM livros WHERE id=$1 RETURNING *", [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ erro: "Livro nao encontrado" });
    res.json({ mensagem: "Livro removido com sucesso" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

module.exports = { getAll, getById, create, update, remove };
