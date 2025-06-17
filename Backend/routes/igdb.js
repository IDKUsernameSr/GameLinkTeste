const express = require('express');
const axios = require('axios');

const router = express.Router();

let cachedToken = null;
let tokenExpires = 0;

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
    {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }
  );

  const data = res.data;
  cachedToken = data.access_token;
  tokenExpires = now + (data.expires_in * 1000);
  return cachedToken;
}

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

router.get('/gamesWithGenres', async (req, res) => {
  const query = (req.query.q || '').trim();

  try {
    const token = await getAccessToken();
    let games = [];

    if (query) {
      // Regular search
      const gameRes = await axios.post(
        'https://api.igdb.com/v4/games',
        `search "${query}"; fields name, cover.url, genres; limit 10;`,
        {
          headers: {
            'Client-ID': process.env.TWITCH_CLIENT_ID,
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'text/plain'
          }
        }
      );
      games = gameRes.data;
    } else {
      // 🧠 Get top games by Steam Total Reviews (PopScore)
      const popScoreRes = await axios.post(
        'https://api.igdb.com/v4/popularity_types',
        `
          fields game, value;
          where popularity_type = 1;
          sort value desc;
          limit 10;
        `,
        {
          headers: {
            'Client-ID': process.env.TWITCH_CLIENT_ID,
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'text/plain'
          }
        }
      );

      const gameIds = popScoreRes.data.map(p => p.game);

      const gameRes = await axios.post(
        'https://api.igdb.com/v4/games',
        `
          fields name, cover.url, genres;
          where id = (${gameIds.join(',')});
        `,
        {
          headers: {
            'Client-ID': process.env.TWITCH_CLIENT_ID,
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'text/plain'
          }
        }
      );

      games = gameRes.data;
    }

    // 👇 Get unique genre IDs
    const genreIds = [...new Set(games.flatMap(g => g.genres || []))];

    // 👇 Map genre names
    let genreMap = {};
    if (genreIds.length) {
      const genreRes = await axios.post(
        'https://api.igdb.com/v4/genres',
        `fields id, name; where id = (${genreIds.join(',')});`,
        {
          headers: {
            'Client-ID': process.env.TWITCH_CLIENT_ID,
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'text/plain'
          }
        }
      );

      const genres = genreRes.data;
      genreMap = Object.fromEntries(genres.map(g => [g.id, g.name]));
    }

    // 👇 Enrich game data
    const enrichedGames = games.map(game => ({
      title: game.name,
      image: game.cover?.url
        ? 'https:' + game.cover.url.replace('t_thumb', 't_cover_big')
        : 'https://via.placeholder.com/300x400?text=No+Image',
      genres: (game.genres || []).map(id => {
        const english = genreMap[id] || 'Desconhecido';
        return genreTranslations[english] || english;
      })
    }));

    res.json(enrichedGames);
  } catch (err) {
    console.error('Erro ao buscar dados do IGDB:', err);
    res.status(500).json({ error: 'Erro ao buscar jogos do IGDB', details: err.message });
  }
});


module.exports = router;
