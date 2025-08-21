const express = require('express');
const router = express.Router();
const { igdbPost } = require('../lib/igdbClient');

function imgUrl(id, size='t_cover_big') {
  return id ? `https://images.igdb.com/igdb/image/upload/${size}/${id}.jpg` : null;
}

router.get('/igdb/popular', async (req, res) => {
  try {
    const window = (req.query.window || 'day').toLowerCase(); // day|week|month|year
    const limit  = Math.min(12, Number(req.query.limit || 6));

    const now = Math.floor(Date.now()/1000);
    const spans = { day: 86400, week: 7*86400, month: 30*86400, year: 365*86400 };
    const since = now - (spans[window] || spans.day);

    const fields = [
      'id','name','slug','first_release_date','updated_at',
      'total_rating_count','hypes','follows',
      'cover.image_id','artworks.image_id','screenshots.image_id'
    ].join(',');

    // janela principal
    let where = (window === 'month' || window === 'year')
      ? `first_release_date != null & first_release_date >= ${since}`
      : `updated_at != null & updated_at >= ${since}`;

    // 1ª tentativa: ordenar por total de avaliações
    let body  = `fields ${fields}; where ${where} & (total_rating_count != null | hypes != null | follows != null); sort total_rating_count desc; limit ${limit};`;
    let games = await igdbPost('games', body);

    // fallback 1: ordenar por hypes (pré-lançamento)
    if (!games || games.length === 0) {
      body  = `fields ${fields}; where ${where} & hypes != null; sort hypes desc; limit ${limit};`;
      games = await igdbPost('games', body);
    }

    // fallback 2: ordenar por follows
    if (!games || games.length === 0) {
      body  = `fields ${fields}; where ${where} & follows != null; sort follows desc; limit ${limit};`;
      games = await igdbPost('games', body);
    }

    // fallback 3: top geral por total_rating_count (sem janela)
    if (!games || games.length === 0) {
      body  = `fields ${fields}; sort total_rating_count desc; limit ${limit};`;
      games = await igdbPost('games', body);
    }

    const out = (games || []).map(g => {
      const cover =
        imgUrl(g?.cover?.image_id, 't_cover_big') ||
        imgUrl(g?.artworks?.[0]?.image_id, 't_screenshot_med') ||
        imgUrl(g?.screenshots?.[0]?.image_id, 't_screenshot_med') ||
        null;
      return {
        id: g.id,
        name: g.name,
        coverUrl: cover,
        total_rating_count: g.total_rating_count || 0,
        hypes: g.hypes || 0,
        follows: g.follows || 0
      };
    });

    res.json(out);
  } catch (err) {
    console.error('popular route error', err.response?.data || err.message);
    res.status(500).json({ error: 'IGDB popular failed', details: err.response?.data || err.message });
  }
});

module.exports = router;
