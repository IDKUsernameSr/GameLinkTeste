CREATE TABLE IF NOT EXISTS price_rules (
  id SERIAL PRIMARY KEY,
  currency TEXT NOT NULL DEFAULT 'BRL',
  daily_new_cents     INT NOT NULL,
  daily_1y_cents      INT NOT NULL,
  daily_3y_cents      INT NOT NULL,
  daily_10y_cents     INT NOT NULL,
  daily_legacy_cents  INT NOT NULL,
  weekly_factor       REAL NOT NULL,
  monthly_factor      REAL NOT NULL,
  deluxe_multiplier   REAL NOT NULL,
  popularity_low      REAL NOT NULL,
  popularity_med      REAL NOT NULL,
  popularity_high     REAL NOT NULL,
  pc_multiplier       REAL NOT NULL,
  playstation_multiplier REAL NOT NULL,
  xbox_multiplier     REAL NOT NULL,
  nintendo_multiplier REAL NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE
);

INSERT INTO price_rules (
  currency, daily_new_cents, daily_1y_cents, daily_3y_cents, daily_10y_cents, daily_legacy_cents,
  weekly_factor, monthly_factor, deluxe_multiplier,
  popularity_low, popularity_med, popularity_high,
  pc_multiplier, playstation_multiplier, xbox_multiplier, nintendo_multiplier, active
) VALUES (
  'BRL', 699, 599, 499, 399, 299,
  5.2, 12.0, 1.2,
  0.9, 1.0, 1.1,
  1.0, 1.05, 1.0, 1.1, TRUE
) ON CONFLICT DO NOTHING;
