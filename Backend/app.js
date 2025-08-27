const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const igdbRoutes = require('./routes/igdb');
const router = express.Router();


require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/igdb', igdbRoutes);
app.use('/api', require('./routes/igdb-popular'));
app.use('/api', igdbRoutes);

app.get('/api/health', (req,res)=>res.json({ok:true}));

// Sample route
app.get('/', (req, res) => {
  res.send('GameLink Backend está rodando');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`[BOOT] API on http://localhost:${PORT}`);
}).on('error', (e) => {
  console.error('[BOOT] listen error:', e);
});