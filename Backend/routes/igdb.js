const express = require('express');
const axios = require('axios');

const router = express.Router();
let cachedToken, tokenExpires = 0;

const genreTranslations = {
  "Role-playing (RPG)": "RPG",
  "Shooter": "Tiro",
  "Platform": "Plataforma",
  "Adventure": "Aventura",
  "Indie": "Independente",
  "Fighting": "Luta",
  "Racing": "Corrida",
  "Strategy": "Estratégia",
  "Arcade": "Arcade",
  "Simulator": "Simulador",
  "Hack and slash/Beat 'em up": "Ação Hack and Slash",
  "Turn-based strategy (TBS)": "Estratégia por Turnos",
  "Real Time Strategy (RTS)": "Estratégia em Tempo Real",
  "Point-and-click": "Aponte e Clique",
  "Puzzle": "Quebra-Cabeça",
  "Tactical": "Tático",
  "Music": "Música",
  "Pinball": "Pinball",
  "Visual Novel": "Romance Visual",
  "Sport": "Esporte",
  "MOBA": "MOBA",
  "Quiz/Trivia": "Quiz",
  "Card & Board Game": "Cartas/Tabuleiro",
  "MMORPG": "MMORPG",
  "Massively Multiplayer": "Multiplayer Massivo",
  "Stealth": "Furtividade"
};

async function getAccessToken() {
  const now = Date.now();
  if (cachedToken && now < tokenExpires) return cachedToken;
  const res = await axios.post(
    'https://id.twitch.tv/oauth2/token',
    new URLSearchParams({
      client_id: process.env.TWITCH_CLIENT_ID,
      client_secret: process.env.TWITCH_CLIENT_SECRET,
      grant_type: 'client_credentials'
    }),
    { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
  );
  cachedToken = res.data.access_token;
  tokenExpires = now + res.data.expires_in * 1000;
  return cachedToken;
}

router.get('/gamesWithGenres', async (req, res) => {
  const query = (req.query.q || '').trim();

  try {
    const token = await getAccessToken();
    let games;

    if (query) {
      // Search flow
      const { data } = await axios.post(
        'https://api.igdb.com/v4/games',
        `search "${query}"; fields name,cover.url,genres; limit 30;`,
        { headers: { 'Client-ID': process.env.TWITCH_CLIENT_ID, Authorization: `Bearer ${token}`, 'Content-Type': 'text/plain' } }
      );
      games = data;
    } else {
      // Popularity flow using Steam Total Reviews (popularity_type = 8)
      const popRes = await axios.post(
        'https://api.igdb.com/v4/popularity_primitives',
        `fields game_id,value; where popularity_type = 3; sort value desc; limit 30;`,
        { headers: { 'Client-ID': process.env.TWITCH_CLIENT_ID, Authorization: `Bearer ${token}`, 'Content-Type': 'text/plain' } }
      );
      const ids = popRes.data.map(p => p.game_id).join(',');
      const { data } = await axios.post(
        'https://api.igdb.com/v4/games',
        `fields name,cover.url,genres; where id = (${ids}); limit 30;`,
        { headers: { 'Client-ID': process.env.TWITCH_CLIENT_ID, Authorization: `Bearer ${token}`, 'Content-Type': 'text/plain' } }
      );
      games = data;
    }

    // Get genre names and translate
    const genreIds = [...new Set(games.flatMap(g => g.genres || []))];
    let genreMap = {};
    if (genreIds.length) {
      const { data: genreData } = await axios.post(
        'https://api.igdb.com/v4/genres',
        `fields id,name; where id = (${genreIds.join(',')});`,
        { headers: { 'Client-ID': process.env.TWITCH_CLIENT_ID, Authorization: `Bearer ${token}`, 'Content-Type': 'text/plain' } }
      );
      genreMap = Object.fromEntries(genreData.map(g => [g.id, g.name]));
    }

    const enriched = games.map(game => ({
      title: game.name,
      image: game.cover?.url ? 'https:' + game.cover.url.replace('t_thumb', 't_cover_big') : 'https://via.placeholder.com/300x400?text=No+Image',
      genres: (game.genres || [])
        .map(id => {
          const english = genreMap[id];
          return genreTranslations[english] || english;
        })
        .filter(name => name !== undefined && name !== 'Desconhecido')
    }));

    res.json(enriched);

  } catch (err) {
    console.error('Error in /gamesWithGenres:', err.response?.data || err.message);
    res.status(500).json({ error: 'Erro ao buscar jogos', details: err.message });
  }
});

module.exports = router;