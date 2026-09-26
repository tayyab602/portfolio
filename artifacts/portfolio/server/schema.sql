-- Run once in the connected Neon database's SQL editor before enabling ranked play.
-- Private server-owned schema: never grant browser roles direct write access.
CREATE SCHEMA IF NOT EXISTS portfolio_game;
REVOKE ALL ON SCHEMA portfolio_game FROM PUBLIC;
CREATE TABLE IF NOT EXISTS portfolio_game.challenges (
  token_hash text PRIMARY KEY,
  rate_key text NOT NULL,
  state jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL DEFAULT now() + interval '2 hours'
);
CREATE INDEX IF NOT EXISTS challenges_rate_window ON portfolio_game.challenges (rate_key, created_at);
CREATE INDEX IF NOT EXISTS challenges_expiry ON portfolio_game.challenges (expires_at);
CREATE TABLE IF NOT EXISTS portfolio_game.scores (
  id uuid PRIMARY KEY,
  challenge_hash text UNIQUE NOT NULL,
  name varchar(24) NOT NULL,
  difficulty text NOT NULL CHECK (difficulty IN ('easy','medium','hard')),
  points integer NOT NULL CHECK (points BETWEEN 0 AND 15),
  wins integer NOT NULL CHECK (wins BETWEEN 0 AND 5),
  draws integer NOT NULL CHECK (draws BETWEEN 0 AND 5),
  losses integer NOT NULL CHECK (losses BETWEEN 0 AND 5),
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (wins + draws + losses = 5),
  CHECK (points = wins * 3 + draws)
);
CREATE INDEX IF NOT EXISTS scores_rank ON portfolio_game.scores (difficulty, points DESC, created_at, id);
