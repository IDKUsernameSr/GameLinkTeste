const pool = require('../db');

async function findByGame(igdb_id) {
  const { rows } = await pool.query(
    'SELECT * FROM prices WHERE igdb_id = $1 ORDER BY platform_id, edition',
    [igdb_id]
  );
  return rows;
}

async function upsertPrice(p) {
  await pool.query(`
    INSERT INTO prices (igdb_id, platform_id, edition, currency, daily_cents, weekly_cents, monthly_cents, is_override)
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
    ON CONFLICT (igdb_id, platform_id, edition)
    DO UPDATE SET currency = EXCLUDED.currency,
                  daily_cents = EXCLUDED.daily_cents,
                  weekly_cents = EXCLUDED.weekly_cents,
                  monthly_cents = EXCLUDED.monthly_cents,
                  updated_at = NOW()
  `, [
    p.igdb_id, p.platform_id, p.edition, p.currency,
    p.daily_cents, p.weekly_cents, p.monthly_cents, !!p.is_override
  ]);
}

async function getActiveRuleOrNull() {
  const { rows } = await pool.query(
    'SELECT * FROM price_rules WHERE active = TRUE ORDER BY id DESC LIMIT 1'
  );
  return rows[0] || null;
}

module.exports = { findByGame, upsertPrice, getActiveRuleOrNull };
