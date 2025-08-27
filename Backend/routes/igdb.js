// routes/igdb.js
const express = require('express');
const axios = require('axios');

const router = express.Router();
let cachedToken, tokenExpires = 0;

/* ===================== Config / Helpers ===================== */

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

function translateGenre(name) {
  return genreTranslations[name] || name;
}

function normalizeCoverUrl(cover, size = 't_cover_big') {
  if (!cover) return '';
  if (cover.url) {
    const u = typeof cover.url === 'string' ? cover.url : '';
    if (!u) return '';
    const httpsUrl = u.startsWith('//') ? `https:${u}` : u;
    return httpsUrl.replace('t_thumb', size);
  }
  if (cover.image_id) {
    return `https://images.igdb.com/igdb/image/upload/${size}/${cover.image_id}.jpg`;
  }
  return '';
}

async function fetchGenreMap(token, ids) {
  if (!ids?.length) return {};
  const { data } = await axios.post(
    'https://api.igdb.com/v4/genres',
    `fields id,name; where id = (${ids.join(',')});`,
    {
      headers: {
        'Client-ID': process.env.TWITCH_CLIENT_ID,
        Authorization: `Bearer ${token}`,
        'Content-Type': 'text/plain'
      }
    }
  );
  return Object.fromEntries(data.map(g => [g.id, g.name]));
}

function normalizeGame(game, genreMap) {
  const coverUrl = normalizeCoverUrl(game.cover, 't_cover_big');
  const artworks = Array.isArray(game.artworks)
    ? game.artworks.map(a => ({ image_id: a.image_id })).filter(a => a.image_id)
    : [];

  const genres = (game.genres || [])
    .map(id => translateGenre(genreMap[id]))
    .filter(Boolean);

  return {
    id: game.id,
    name: game.name,
    coverUrl,
    cover: {
      url: coverUrl || (game.cover?.url ? (game.cover.url.startsWith('//') ? `https:${game.cover.url}` : game.cover.url) : ''),
      image_id: game.cover?.image_id || null
    },
    artworks,
    genres,
    rating: game.rating ?? 0,
    total_rating: game.total_rating ?? 0,
    follows: game.follows ?? 0,
    hypes: game.hypes ?? 0
  };
}

/* ===================== Popular core (janelas) ===================== */

function unixNow() { return Math.floor(Date.now() / 1000); }
function spanSeconds(window) {
  const spans = { day: 86400, week: 7*86400, month: 30*86400, year: 365*86400 };
  return spans[window] || spans.day;
}

/**
 * Busca jogos populares numa janela, com fallbacks:
 * total_rating_count → hypes → follows → top geral (sem janela)
 */
async function fetchPopularGames(token, { window = 'day', limit = 60 }) {
  const now = unixNow();
  const since = now - spanSeconds(window);
  const fields = [
    'id','name','genres',
    'rating','total_rating','total_rating_count',
    'follows','hypes',
    'cover.url','cover.image_id','artworks.image_id',
    'updated_at','first_release_date'
  ].join(',');

  const headers = {
    'Client-ID': process.env.TWITCH_CLIENT_ID,
    Authorization: `Bearer ${token}`,
    'Content-Type': 'text/plain'
  };

  const whereBase =
    (window === 'month' || window === 'year')
      ? `first_release_date != null & first_release_date >= ${since}`
      : `updated_at != null & updated_at >= ${since}`;

  // 1) total_rating_count
  let body = `fields ${fields}; where ${whereBase} & (total_rating_count != null | hypes != null | follows != null); sort total_rating_count desc; limit ${limit};`;
  let { data: games } = await axios.post('https://api.igdb.com/v4/games', body, { headers });

  // 2) hypes
  if (!games || games.length === 0) {
    body = `fields ${fields}; where ${whereBase} & hypes != null; sort hypes desc; limit ${limit};`;
    ({ data: games } = await axios.post('https://api.igdb.com/v4/games', body, { headers }));
  }

  // 3) follows
  if (!games || games.length === 0) {
    body = `fields ${fields}; where ${whereBase} & follows != null; sort follows desc; limit ${limit};`;
    ({ data: games } = await axios.post('https://api.igdb.com/v4/games', body, { headers }));
  }

  // 4) top geral
  if (!games || games.length === 0) {
    body = `fields ${fields}; sort total_rating_count desc; limit ${limit};`;
    ({ data: games } = await axios.post('https://api.igdb.com/v4/games', body, { headers }));
  }

  return games || [];
}

/* ===================== Rotas ===================== */

// Sanity check
router.get('/health', (_req, res) => res.json({ ok: true }));

/**
 * GET /games  (busca por ?q=... ou lista trending)
 * Query:
 *  - q?: string
 *  - limit?: number (default 30)
 */
router.get('/games', async (req, res) => {
  const q = (req.query.q || '').trim();
  const limit = Math.min(120, Number(req.query.limit || 30));

  try {
    const token = await getAccessToken();
    const headers = {
      'Client-ID': process.env.TWITCH_CLIENT_ID,
      Authorization: `Bearer ${token}`,
      'Content-Type': 'text/plain'
    };

    let games = [];

    if (q) {
      const body = [
        `search "${q}";`,
        'fields id,name,cover.url,cover.image_id,genres,rating,total_rating,follows,hypes,artworks.image_id;',
        `limit ${limit};`
      ].join(' ');
      const { data } = await axios.post('https://api.igdb.com/v4/games', body, { headers });
      games = data;
    } else {
      // “trending” via popularity_primitives (type=3 = total rating)
      const { data: pop } = await axios.post(
        'https://api.igdb.com/v4/popularity_primitives',
        `fields game_id,value; where popularity_type = 3; sort value desc; limit ${limit};`,
        { headers }
      );
      const ids = pop.map(p => p.game_id);
      if (ids.length) {
        const body = [
          'fields id,name,cover.url,cover.image_id,genres,rating,total_rating,follows,hypes,artworks.image_id;',
          `where id = (${ids.join(',')});`,
          `limit ${limit};`
        ].join(' ');
        const { data } = await axios.post('https://api.igdb.com/v4/games', body, { headers });
        games = data;
      }
    }

    const genreIds = [...new Set(games.flatMap(g => g.genres || []))];
    const genreMap = await fetchGenreMap(token, genreIds);
    const enriched = games.map(g => normalizeGame(g, genreMap));
    res.json(enriched);
  } catch (err) {
    console.error('Error /games:', err.response?.data || err.message);
    res.status(500).json({ error: 'Erro ao buscar jogos', details: err.response?.data || err.message });
  }
});

/** Alias “/games/trending” -> /games sem q */
router.get('/games/trending', (req, res, next) => {
  req.query.q = '';
  return router.handle(req, res, next);
});

/**
 * GET /games/categories
 * Query:
 *  - window: day|week|month|year (default: day)
 *  - limit:  base pool (default 60, máx 120)
 *  - per:    máx por categoria (default 12, máx 24)
 */
router.get('/games/categories', async (req, res) => {
  try {
    const window = String(req.query.window || 'day').toLowerCase();
    const limit  = Math.min(120, Number(req.query.limit || 60));
    const per    = Math.min(24,  Number(req.query.per   || 12));

    const token = await getAccessToken();
    const base  = await fetchPopularGames(token, { window, limit });

    const genreIds = [...new Set(base.flatMap(g => g.genres || []))];
    const genreMap = await fetchGenreMap(token, genreIds);

    const normalized = base.map(g => normalizeGame(g, genreMap));

    const buckets = {};
    for (const g of normalized) {
      const gens = g.genres?.length ? g.genres : ['Outros'];
      for (const name of gens) {
        if (!buckets[name]) buckets[name] = [];
        if (buckets[name].length < per) buckets[name].push(g);
      }
    }

    for (const k of Object.keys(buckets)) {
      buckets[k].sort((a, b) =>
        (b.rating || 0) - (a.rating || 0) ||
        (b.hypes  || 0) - (a.hypes  || 0) ||
        (b.follows|| 0) - (a.follows|| 0)
      );
    }

    res.json(buckets);
  } catch (err) {
    console.error('Error /games/categories:', err.response?.data || err.message);
    res.status(500).json({ error: 'Erro ao montar categorias populares', details: err.response?.data || err.message });
  }
});

/**
 * GET /igdb/popular  (lista plana para Sidebar)
 * Query:
 *  - window: day|week|month|year (default: day)
 *  - limit:  (default 12, máx 60)
 */
router.get('/igdb/popular', async (req, res) => {
  try {
    const window = String(req.query.window || 'day').toLowerCase();
    const limit  = Math.min(60, Number(req.query.limit || 12));

    const token = await getAccessToken();
    const base  = await fetchPopularGames(token, { window, limit });

    const genreIds = [...new Set(base.flatMap(g => g.genres || []))];
    const genreMap = await fetchGenreMap(token, genreIds);

    const normalized = base.map(g => normalizeGame(g, genreMap));
    res.json(normalized);
  } catch (err) {
    console.error('Error /igdb/popular:', err.response?.data || err.message);
    res.status(500).json({ error: 'Erro ao listar populares', details: err.response?.data || err.message });
  }
});

module.exports = router;
