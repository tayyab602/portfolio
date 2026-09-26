import {cp,mkdir,access} from 'node:fs/promises';
const root=new URL('../',import.meta.url);
const source=new URL('games/tictactoe/build/web/',root);
const destination=new URL('artifacts/portfolio/public/games/tictactoe/',root);
await access(new URL('main.dart.js',source));
await mkdir(destination,{recursive:true});
await cp(source,destination,{recursive:true});
console.log('Copied the compiled original Flutter game into portfolio public assets.');
