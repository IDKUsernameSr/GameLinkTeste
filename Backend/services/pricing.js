// ----- CHARM CONFIG (opcional via .env) -----
const CHARM_MODE = process.env.PRICE_CHARM_MODE || '9';   // '9'  ou  '99'
const CHARM_MIN  = Number(process.env.PRICE_CHARM_MIN || (CHARM_MODE === '99' ? 99 : 49));

function charmPrice(cents) {
  // Garante preço mínimo e final 9/99
  const base = Math.max(CHARM_MIN, Math.round(cents));

  if (CHARM_MODE === '99') {
    // termina em .99 (ceil pro próximo ...99)
    // 81 -> 99, 203 -> 299, 1499 -> 1499 (já está)
    return Math.ceil((base + 1) / 100) * 100 - 1;
  }

  // default: termina com ...9 (último dígito 9)
  // 81 -> 89, 203 -> 209, 405 -> 409
  return Math.floor(base / 10) * 10 + 9;
}


function pickDailyBase(daysSinceRelease, r) {
  if (daysSinceRelease <= 90) return r.daily_new_cents;
  if (daysSinceRelease <= 365) return r.daily_1y_cents;
  if (daysSinceRelease <= 365 * 3) return r.daily_3y_cents;
  if (daysSinceRelease <= 365 * 10) return r.daily_10y_cents;
  return r.daily_legacy_cents;
}

function platformMultiplier(platformId, r) {
  // PC(6), PS4(48), PS5(167), XONE(49), XSX(169), Switch(130)
  if ([6].includes(platformId)) return r.pc_multiplier;
  if ([48,167].includes(platformId)) return r.playstation_multiplier;
  if ([49,169].includes(platformId)) return r.xbox_multiplier;
  if ([130].includes(platformId)) return r.nintendo_multiplier;
  return 1.0;
}

function popularityMult(cnt, r) {
  if (cnt < 100) return r.popularity_low;
  if (cnt <= 1000) return r.popularity_med;
  return r.popularity_high;
}

function computePriceDailyCents({ releaseDate, totalRatingCount, platformId, edition, rule }) {
  const nowSec = Date.now() / 1000;
  const days = releaseDate ? Math.max(1, Math.floor((nowSec - releaseDate) / 86400)) : 365 * 5;
  let daily = pickDailyBase(days, rule);
  daily = Math.round(
    daily *
    platformMultiplier(platformId, rule) *
    popularityMult(totalRatingCount || 0, rule) *
    (edition === 'Deluxe' ? rule.deluxe_multiplier : 1)
  );
  return daily;
}

function periodsFromDaily(daily, r) {
  const weeklyRaw  = Math.round(daily * r.weekly_factor);
  const monthlyRaw = Math.round(daily * r.monthly_factor);

  // >>> força final 9 / .99
  const daily_cents   = charmPrice(daily);
  const weekly_cents  = charmPrice(weeklyRaw);
  const monthly_cents = charmPrice(monthlyRaw);

  return { daily_cents, weekly_cents, monthly_cents };
}

module.exports = { computePriceDailyCents, periodsFromDaily };
