import { createHash, createHmac, randomBytes, randomUUID } from 'node:crypto';
import { advance, newChallenge, points, DIFFICULTIES } from '../src/game/engine.mjs';

export class GameError extends Error { constructor(status, message) { super(message); this.status = status; } }
const hash = token => createHash('sha256').update(token).digest('hex');
export function cleanName(value) {
  if (typeof value !== 'string') throw new GameError(400, 'Enter a display name.');
  const name = value.normalize('NFKC').trim().replace(/\s+/g,' ');
  if (!/^[\p{L}\p{N} _.-]{2,24}$/u.test(name)) throw new GameError(400, 'Use 2–24 letters, numbers, spaces, dots, hyphens, or underscores.');
  return name;
}
export function createGameService(pool, secret, random = Math.random) {
  return {
    async leaderboard(difficulty) {
      if (!DIFFICULTIES.includes(difficulty)) throw new GameError(400, 'Choose a valid difficulty.');
      const {rows} = await pool.query('SELECT id, name, points, wins, draws, losses, created_at FROM portfolio_game.scores WHERE difficulty = $1 ORDER BY points DESC, created_at ASC, id ASC LIMIT 20',[difficulty]);
      return {entries:rows};
    },
    async start(difficulty, ip) {
      if (!DIFFICULTIES.includes(difficulty)) throw new GameError(400, 'Choose a valid difficulty.');
      const rateKey = createHmac('sha256',secret).update(ip).digest('hex');
      const client = await pool.connect();
      try {
        await client.query('BEGIN');
        // Serialize starts from the same address, including across serverless instances.
        await client.query('SELECT pg_advisory_xact_lock(hashtext($1))',[rateKey]);
        await client.query('DELETE FROM portfolio_game.challenges WHERE expires_at < now()');
        const {rows} = await client.query("SELECT count(*)::int AS count FROM portfolio_game.challenges WHERE rate_key = $1 AND created_at > now() - interval '1 hour'",[rateKey]);
        if (rows[0].count >= 20) throw new GameError(429, 'Ranked challenge limit reached. Try practice or come back in an hour.');
        const token = randomBytes(32).toString('hex');
        const state = newChallenge(difficulty);
        await client.query('INSERT INTO portfolio_game.challenges (token_hash, rate_key, state) VALUES ($1,$2,$3)',[hash(token),rateKey,JSON.stringify(state)]);
        await client.query('COMMIT');
        return {token,state};
      } catch (e) { await client.query('ROLLBACK'); throw e; }
      finally { client.release(); }
    },
    async act(token, body) {
      if (typeof token !== 'string' || !/^[a-f0-9]{64}$/.test(token)) throw new GameError(401, 'Start a new challenge.');
      const tokenHash = hash(token);
      const client = await pool.connect();
      try {
        await client.query('BEGIN');
        const {rows} = await client.query('SELECT state FROM portfolio_game.challenges WHERE token_hash = $1 AND expires_at > now() FOR UPDATE',[tokenHash]);
        if (!rows.length) throw new GameError(410, 'This challenge expired. Start a new one.');
        const state = rows[0].state;
        if (body.action === 'resume') { await client.query('COMMIT'); return {state}; }
        if (body.action === 'submit') {
          if (!state.complete || state.results.length !== 5) throw new GameError(409, 'Finish all five rounds before submitting.');
          const name = cleanName(body.name);
          const {rows: entries} = await client.query('INSERT INTO portfolio_game.scores (id, challenge_hash, name, difficulty, points, wins, draws, losses) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) ON CONFLICT (challenge_hash) DO NOTHING RETURNING id', [randomUUID(), tokenHash, name, state.difficulty, points(state), state.results.filter(r=>r === 'X').length,state.results.filter(r=>r === 'draw').length,state.results.filter(r=>r === 'O').length]);
          await client.query('COMMIT');
          return {saved:true, alreadySaved:entries.length === 0};
        }
        if (body.revision !== state.revision) throw new GameError(409, 'Your board changed. Use Resume challenge to refresh it.');
        let next;
        try { next = advance(state, body.action, body.cell, random); }
        catch (e) { throw new GameError(400, e.message); }
        await client.query('UPDATE portfolio_game.challenges SET state = $1 WHERE token_hash = $2',[JSON.stringify(next),tokenHash]);
        await client.query('COMMIT');
        return {state:next};
      } catch (e) { await client.query('ROLLBACK'); throw e; }
      finally { client.release(); }
    },
  };
}
