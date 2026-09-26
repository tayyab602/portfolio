import pg from 'pg';
import { createGameService, GameError } from './game-service.mjs';
let service;
function getService() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  const secret = process.env.GAME_SECRET;
  if (!url || !secret || secret.length < 32) throw new GameError(503, 'Ranked play is not connected yet. Practice is available.');
  if (!service) {
    const pool = new pg.Pool({connectionString:url,max:2,idleTimeoutMillis:10000,connectionTimeoutMillis:8000,allowExitOnIdle:true});
    pool.on('error',()=>console.error('Game database connection error'));
    service = createGameService(pool,secret);
  }
  return service;
}
export function createHandler(provider = getService) {
return async function handler(req,res) {
  res.setHeader('Cache-Control','no-store');
  res.setHeader('Content-Type','application/json; charset=utf-8');
  res.setHeader('X-Content-Type-Options','nosniff');
  const send = (status,data)=>{res.statusCode=status;res.end(JSON.stringify(data));};
  try {
    if (req.method === 'GET') {
      const url = new URL(req.url,'http://localhost');
      return send(200,await provider().leaderboard(url.searchParams.get('difficulty') || 'easy'));
    }
    if (req.method !== 'POST') { res.setHeader('Allow','GET, POST'); return send(405,{error:'Method not allowed.'}); }
    if (!String(req.headers['content-type'] || '').startsWith('application/json')) throw new GameError(415,'Send JSON.');
    const origin = req.headers.origin;
    const expectedOrigin = process.env.APP_ORIGIN || `https://${req.headers.host}`;
    if (origin && origin !== expectedOrigin && !(process.env.NODE_ENV !== 'production' && origin === `http://${req.headers.host}`)) throw new GameError(403,'Request origin not allowed.');
    let body = req.body;
    if (body === undefined) {
      let raw = ''; for await (const chunk of req) {raw += chunk; if (Buffer.byteLength(raw) > 2048) throw new GameError(413,'Request too large.');}
      try {body=JSON.parse(raw);} catch {throw new GameError(400,'Invalid JSON.');}
    } else if (typeof body === 'string') {try {body=JSON.parse(body);} catch {throw new GameError(400,'Invalid JSON.');}}
    if (!body || typeof body !== 'object' || Array.isArray(body) || JSON.stringify(body).length > 2048) throw new GameError(400,'Invalid request.');
    if (body.action === 'start') {
      const forwarded = String(req.headers['x-forwarded-for'] || req.socket?.remoteAddress || 'unknown').split(',')[0].trim();
      return send(200,await provider().start(body.difficulty,forwarded));
    }
    const token = String(req.headers.authorization || '').replace(/^Bearer /,'');
    return send(200,await provider().act(token,body));
  } catch (e) {
    if (!(e instanceof GameError)) console.error('Game request failed',e.code || e.name);
    return send(e instanceof GameError ? e.status : 503,{error:e instanceof GameError ? e.message : 'Leaderboard temporarily unavailable. Your current game has not been reset.'});
  }
}
}
export default createHandler();
