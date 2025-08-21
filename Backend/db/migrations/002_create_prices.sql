CREATE TABLE IF NOT EXISTS prices (
  id BIGSERIAL PRIMARY KEY,
  igdb_id BIGINT NOT NULL,
  platform_id INT NOT NULL,
  edition TEXT NOT NULL DEFAULT 'Standard',
  currency TEXT NOT NULL DEFAULT 'BRL',
  daily_cents INT NOT NULL,
  weekly_cents INT NOT NULL,
  monthly_cents INT NOT NULL,
  is_override BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (igdb_id, platform_id, edition)
);
