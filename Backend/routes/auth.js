const express = require('express');
const bcrypt = require('bcryptjs');
const pool = require('../db');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExists = await pool.query('SELECT * FROM users WHERE username = $1 OR email = $2', [username, email]);
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'Usuário ou email já existe.' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await pool.query(
      'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email',
      [username, email, hashed]
    );

    res.json(newUser.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({ error: 'Usuário não encontrado' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: 'Senha incorreta' });
    }

    res.json({
      message: 'Login realizado com sucesso',
      user: { id: user.id, username: user.username, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




// Adicionar Carrinho para o usuario
router.get('/:user_id', async (req, res) => {
  const { user_id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM carts WHERE user_id = $1', [user_id]);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Adicionar item para o carrinho
router.post('/', async (req, res) => {
  const { user_id, product_id, product_name, quantity } = req.body;
  try {
    await pool.query(
      `INSERT INTO carts (user_id, product_id, product_name, quantity)
       VALUES ($1, $2, $3, $4)`,
      [user_id, product_id, product_name, quantity]
    );
    res.json({ message: 'Item adicionado ao carrinho!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT id, username, email, password FROM users');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;