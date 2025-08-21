// Persistência simples em ./data/*.json (sem banco)
const fs = require('fs');
const fsp = fs.promises;
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const PRICES_FILE = path.join(DATA_DIR, 'prices.json');
const RULES_FILE = path.join(DATA_DIR, 'price_rules.json');

// estado em memória
let prices = [];   // [{ igdb_id, platform_id, edition, currency, daily_cents, weekly_cents, monthly_cents, is_override, updated_at }]
let rules = [];    // [{ ...campos da regra..., active: true }]

async function ensureFiles() {
  await fsp.mkdir(DATA_DIR, { recursive: true }).catch(()=>{});
  // prices
  try {
    const txt = await fsp.readFile(PRICES_FILE, 'utf-8');
    prices = JSON.parse(txt);
  } catch { prices = []; await flushPrices(); }
  // rules
  try {
    const txt = await fsp.readFile(RULES_FILE, 'utf-8');
    rules = JSON.parse(txt);
  } catch {
    rules = [{
  "currency": "BRL",
  "daily_new_cents": 129,
  "daily_1y_cents": 119,
  "daily_3y_cents": 109,
  "daily_10y_cents": 99,
  "daily_legacy_cents": 79,

  "weekly_factor": 2.5,
  "monthly_factor": 5.0,

  "deluxe_multiplier": 1.02,
  "popularity_low": 0.95,
  "popularity_med": 1.0,
  "popularity_high": 1.03,

  "pc_multiplier": 1.0,
  "playstation_multiplier": 0.98,
  "xbox_multiplier": 0.98,
  "nintendo_multiplier": 0.98,
  "active": true
}];
    await flushRules();
  }
}

async function flushPrices() {
  await fsp.writeFile(PRICES_FILE, JSON.stringify(prices, null, 2));
}
async function flushRules() {
  await fsp.writeFile(RULES_FILE, JSON.stringify(rules, null, 2));
}

function key(p) { return `${p.igdb_id}|${p.platform_id}|${p.edition}`; }

async function findByGame(igdb_id) {
  return prices.filter(p => p.igdb_id === Number(igdb_id));
}

async function upsertPrice(p) {
  const k = key(p);
  const idx = prices.findIndex(x => key(x) === k);
  const now = new Date().toISOString();
  const row = { ...p, updated_at: now, created_at: prices[idx]?.created_at || now };
  if (idx >= 0) prices[idx] = row; else prices.push(row);
  await flushPrices();
}

async function getActiveRuleOrNull() {
  return rules.find(r => r.active) || null;
}

// (opcional) trocar a regra via admin futuramente
async function setRule(newRule) {
  rules = [{ ...newRule, active: true }];
  await flushRules();
}

module.exports = {
  ensureFiles,
  findByGame,
  upsertPrice,
  getActiveRuleOrNull,
  setRule
};
