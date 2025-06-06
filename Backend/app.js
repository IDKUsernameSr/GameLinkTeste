const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const igdbRoutes = require('./routes/igdb');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/igdb', igdbRoutes);

// Sample route
app.get('/', (req, res) => {
  res.send('GameLink Backend está rodando');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});