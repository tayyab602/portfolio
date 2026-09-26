export const DIFFICULTIES = ['easy', 'medium', 'hard'];
export const ROUNDS = 5;
export const LINES = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
export function outcome(board) {
  for (const line of LINES) if (board[line[0]] && line.every(i => board[i] === board[line[0]])) return board[line[0]];
  return board.every(Boolean) ? 'draw' : null;
}
function minimax(board, turn) {
  const result = outcome(board);
  if (result) return result === 'O' ? 1 : result === 'X' ? -1 : 0;
  const scores = board.flatMap((v,i)=>{
    if (v) return [];
    const next = [...board]; next[i] = turn;
    return [minimax(next, turn === 'O' ? 'X' : 'O')];
  });
  return turn === 'O' ? Math.max(...scores) : Math.min(...scores);
}
export function aiMove(board, difficulty, random = Math.random) {
  if (outcome(board)) return -1;
  const empty = board.flatMap((v,i)=>v ? [] : [i]);
  if (difficulty === 'easy' || (difficulty === 'medium' && random() < .35)) return empty[Math.floor(random() * empty.length)];
  let best = -Infinity; let choices = [];
  for (const i of empty) {
    const next = [...board]; next[i] = 'O';
    const value = minimax(next, 'X');
    if (value > best) { best = value; choices = [i]; }
    else if (value === best) choices.push(i);
  }
  return choices[Math.floor(random() * choices.length)];
}
export function newChallenge(difficulty) {
  if (!DIFFICULTIES.includes(difficulty)) throw new Error('Choose a valid difficulty.');
  return {difficulty, board:Array(9).fill(null), round:1, results:[], roundResult:null, complete:false, revision:0};
}
export function advance(state, action, cell, random = Math.random) {
  const next = structuredClone(state);
  if (next.complete) throw new Error('This challenge is complete.');
  if (action === 'next') {
    if (!next.roundResult) throw new Error('Finish this round first.');
    next.round++; next.board = Array(9).fill(null); next.roundResult = null;
    if (next.round % 2 === 0) next.board[aiMove(next.board, next.difficulty, random)] = 'O';
  } else if (action === 'move') {
    if (next.roundResult) throw new Error('Start the next round first.');
    if (!Number.isInteger(cell) || cell < 0 || cell > 8 || next.board[cell]) throw new Error('Choose an empty square.');
    next.board[cell] = 'X';
    if (!outcome(next.board)) next.board[aiMove(next.board, next.difficulty, random)] = 'O';
    next.roundResult = outcome(next.board);
    if (next.roundResult) {
      next.results.push(next.roundResult);
      next.complete = next.results.length === ROUNDS;
    }
  } else throw new Error('Unknown game action.');
  next.revision++;
  return next;
}
export function points(state) { return state.results.reduce((total,result)=>total + (result === 'X' ? 3 : result === 'draw' ? 1 : 0),0); }
