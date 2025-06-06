const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'GameLink',
  password: 'Aluno123',
  port: 5432,
});

module.exports = pool;