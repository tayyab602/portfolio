import test from 'node:test';
import assert from 'node:assert/strict';
import { newChallenge, advance, outcome, aiMove, points } from '../src/game/engine.mjs';
import {cleanName} from '../server/game-service.mjs';

test('hard AI cannot lose against any human path, regardless of who starts',()=>{
  function walk(board) {
    const result=outcome(board); assert.notEqual(result,'X'); if(result)return;
    for(let i=0;i<9;i++) if(!board[i]) {
      const next=[...board];next[i]='X';assert.notEqual(outcome(next),'X');
      if(!outcome(next))next[aiMove(next,'hard',()=>0)]='O';
      walk(next);
    }
  }
  walk(Array(9).fill(null));
  const board=Array(9).fill(null);board[aiMove(board,'hard',()=>0)]='O';walk(board);
});
test('five rounds, alternating openers, valid points, and no extra moves',()=>{
  let state=newChallenge('easy');
  for(let round=1;round<=5;round++) {
    assert.equal(state.round,round);
    assert.equal(state.board.filter(Boolean).length,round%2===0 ? 1 : 0);
    while(!state.roundResult) state=advance(state,'move',state.board.findIndex(v=>!v),()=>0);
    assert.equal(state.results.length,round);
    assert.throws(()=>advance(state,'move',0));
    if(round<5)state=advance(state,'next',undefined,()=>0);
  }
  assert.equal(state.complete,true);assert.ok(points(state)>=0 && points(state)<=15);
  assert.throws(()=>advance(state,'next'));
});
test('invalid moves and early round skips do not mutate state',()=>{
  const state=newChallenge('medium');const original=structuredClone(state);
  for(const cell of [-1,9,1.5,'0',null])assert.throws(()=>advance(state,'move',cell));
  assert.throws(()=>advance(state,'next'));assert.deepEqual(state,original);
  const next=advance(state,'move',0,()=>0);assert.throws(()=>advance(next,'move',0));
});
test('public names reject markup, controls, empty names, and excessive length',()=>{
  assert.equal(cleanName('  Tayyab 602  '),'Tayyab 602');
  for(const value of ['<script>','\u0000evil','a','a'.repeat(25),null])assert.throws(()=>cleanName(value));
});
