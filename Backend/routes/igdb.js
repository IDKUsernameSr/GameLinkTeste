const express = require('express');

const router = express.Router();

let cachedToken = null;
let tokenExpires = 0;

async function getAccessToken() {
  const now = Date.now();

  if (cachedToken && now < tokenExpires) return cachedToken;

  const res = await fetch('https://id.twitch.tv/oauth2/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.TWITCH_CLIENT_ID,
      client_secret: process.env.TWITCH_CLIENT_SECRET,
      grant_type: 'client_credentials'
    })
  });

  const data = await res.json();
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
  const query = req.query.q || 'elden ring';

  try {
    const token = await getAccessToken();

    // 1. Buscar jogos
    const gameRes = await fetch('https://api.igdb.com/v4/games', {
      method: 'POST',
      headers: {
        'Client-ID': process.env.TWITCH_CLIENT_ID,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'text/plain'
      },
      body: `search "${query}"; fields name, cover.url, genres; limit 10;`
    });

    const games = await gameRes.json();

    // 2. Pegar todos os genre IDs únicos
    const genreIds = [...new Set(games.flatMap(g => g.genres || []))];

    // 3. Buscar nomes dos gêneros
    let genreMap = {};
    if (genreIds.length) {
      const genreRes = await fetch('https://api.igdb.com/v4/genres', {
        method: 'POST',
        headers: {
          'Client-ID': process.env.TWITCH_CLIENT_ID,
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'text/plain'
        },
        body: `fields id, name; where id = (${genreIds.join(',')});`
      });

      const genres = await genreRes.json();
      genreMap = Object.fromEntries(genres.map(g => [g.id, g.name]));
      console.log("🎯 genreMap:", genreMap);
    }

    // 4. Substituir os IDs por nomes
    const enrichedGames = games.map(game => ({
        title: game.name,
        image: game.cover?.url
            ? 'https:' + game.cover.url.replace('t_thumb', 't_cover_big')
            : 'https://via.placeholder.com/300x400?text=No+Image',
        genres: (game.genres || []).map(id => {
            const english = genreMap[id] || 'Desconhecido';
            console.log("🧪 GENRE RAW:", english);
            const translated = genreTranslations[english] || english;
            return translated;
        })
        }));

    res.json(enrichedGames);
  } catch (err) {
    console.error('Erro ao buscar dados do IGDB:', err);
    res.status(500).json({ error: 'Erro ao buscar jogos do IGDB', details: err.message });
  }
});



module.exports = router;
