import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createGameService} from '../server/game-service.mjs';
import {points} from '../src/game/engine.mjs';
// Optional override lets local QA use an isolated dependency directory.
const {PGlite}=await import(process.env.PGLITE_TEST_MODULE || '@electric-sql/pglite');

test('Postgres persistence, forged scores, replay, stale moves, expiry and rate limits',async()=>{
  const db=await PGlite.create();
  await db.exec(await readFile(new URL('../server/schema.sql',import.meta.url),'utf8'));
  // PGlite provides one real Postgres connection; production uses pg.Pool.
  const pool={query:(sql,values)=>db.query(sql,values),connect:async()=>({query:(sql,values)=>db.query(sql,values),release(){}})};
  const service=createGameService(pool,'test-only-secret-with-more-than-32-characters',()=>0);
  try {
    const game=await service.start('easy','test-ip');
    assert.match(game.token,/^[a-f0-9]{64}$/);
    await assert.rejects(service.act(game.token,{action:'submit',name:'Forged',points:999}),e=>e.status===409);
    let state=(await service.act(game.token,{action:'move',cell:0,revision:0,points:999})).state;
    await assert.rejects(service.act(game.token,{action:'move',cell:2,revision:0}),e=>e.status===409);
    await assert.rejects(service.act(game.token,{action:'move',cell:0,revision:state.revision}),e=>e.status===400);
    while(!state.complete){
      const body=state.roundResult ? {action:'next',revision:state.revision} : {action:'move',cell:state.board.findIndex(v=>!v),revision:state.revision};
      state=(await service.act(game.token,body)).state;
    }
    await service.act(game.token,{action:'submit',name:'Tester',points:999});
    const repeated=await service.act(game.token,{action:'submit',name:'Changed'});
    assert.equal(repeated.alreadySaved,true);
    const freshService=createGameService(pool,'test-only-secret-with-more-than-32-characters');
    const board=await freshService.leaderboard('easy');
    assert.equal(board.entries.length,1);assert.equal(board.entries[0].points,points(state));assert.equal(board.entries[0].name,'Tester');
    assert.equal((await service.leaderboard('hard')).entries.length,0);
    await assert.rejects(service.act('bad',{action:'resume'}),e=>e.status===401);
    await db.query("UPDATE portfolio_game.challenges SET expires_at = now() - interval '1 second'");
    await assert.rejects(service.act(game.token,{action:'resume'}),e=>e.status===410);
    for(let i=0;i<20;i++)await service.start('easy','rate-test');
    await assert.rejects(service.start('easy','rate-test'),e=>e.status===429);
    assert.equal((await service.leaderboard('easy')).entries.length,1,'Expired challenge cleanup preserves submitted scores');
  } finally {await db.close();}
});
