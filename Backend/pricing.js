// const express = require('express');
// const { igdbPost } = require('../lib/igdbClient');
// const { computePriceDailyCents, periodsFromDaily } = require('../services/pricing');
// const repo = process.env.PRICING_STORAGE === 'postgres'
//   ? require('../repos/pricesRepo')
//   : require('../repos/pricesRepo.memory');
// const fallbackRule = require('../config/priceRules');

// const router = express.Router();

// async function fetchGame(igdbId) {
//   const fields = [
//     'id','name','first_release_date','total_rating_count',
//     'platforms','cover.image_id'
//   ].join(',');
//   const body = `fields ${fields}; where id = ${Number(igdbId)}; limit 1;`;
//   const arr = await igdbPost('games', body);
//   return arr[0];
// }

// async function fetchGame(igdbId) {
//   const fields = [
//     'id','name','first_release_date','total_rating_count',
//     'platforms','cover.image_id'
//   ].join(',');
//   const body = `fields ${fields}; where id = ${Number(igdbId)}; limit 1;`;
//   const arr = await igdbPost('games', body);
//   return arr[0];
// }

// function coverUrl(imageId, size = 't_cover_big') {
//   return imageId ? `https://images.igdb.com/igdb/image/upload/${size}/${imageId}.jpg` : null;
// }

// function platformName(id) {
//   const map = {
//     6: 'PC (Windows)', 48: 'PlayStation 4', 167: 'PlayStation 5',
//     49: 'Xbox One', 169: 'Xbox Series', 130: 'Nintendo Switch'
//   };
//   return map[id] || `Platform ${id}`;
// }

// // GET /api/games/:igdbId/prices
// router.get('/games/:igdbId/prices', async (req, res) => {
//   try {
//     const igdbId = Number(req.params.igdbId);
//     const g = await fetchGame(igdbId);
//     if (!g) return res.status(404).json({ error: 'Game not found' });

//     const rule = (await repo.getActiveRuleOrNull()) || fallbackRule;

//     const platforms = Array.isArray(g.platforms) ? g.platforms : [];
//     const editions = ['Standard', 'Deluxe'];

//     const existing = await repo.findByGame(igdbId);
//     const key = (p,e)=>`${p}|${e}`;
//     const has = new Set(existing.map(r => key(r.platform_id, r.edition)));

//     for (const p of platforms) {
//       for (const ed of editions) {
//         if (!has.has(key(p, ed))) {
//           const daily = computePriceDailyCents({
//             releaseDate: g.first_release_date,
//             totalRatingCount: g.total_rating_count,
//             platformId: p,
//             edition: ed,
//             rule
//           });
//           const periods = periodsFromDaily(daily, rule);
//           await repo.upsertPrice({
//             igdb_id: igdbId,
//             platform_id: p,
//             edition: ed,
//             currency: rule.currency,
//             daily_cents: periods.daily_cents,
//             weekly_cents: periods.weekly_cents,
//             monthly_cents: periods.monthly_cents,
//             is_override: false
//           });
//         }
//       }
//     }

//     const prices = await repo.findByGame(igdbId);
//     res.json({
//       igdb_id: igdbId,
//       name: g.name,
//       coverUrl: coverUrl(g.cover && g.cover.image_id),
//       platforms: platforms.map(id => ({ id, name: platformName(id) })),
//       editions,
//       prices
//     });
//   } catch (err) {
//     console.error('pricing route error', err.response?.data || err.message);
//     res.status(500).json({ error: 'Erro ao gerar preços', details: err.message });
//   }
// });

// module.exports = router;
